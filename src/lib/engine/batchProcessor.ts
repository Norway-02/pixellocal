import { validateFile } from './fileValidator';
import { processImageWithWorker } from '../../workers/workerClient';

export type BatchItemStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface BatchItem {
  id: string;
  file: File;
  sanitizedName: string;
  status: BatchItemStatus;
  progress: number; // 0 to 100
  resultBlob?: Blob;
  downloadUrl?: string;
  error?: string;
  originalSize: number;
  convertedSize?: number;
}

export interface BatchProgressCallback {
  (items: BatchItem[], currentProcessingIndex: number): void;
}

export class BatchProcessor {
  private items: BatchItem[] = [];
  private concurrency = 1; // Default concurrency 1 for mobile RAM stability
  private isCancelled = false;
  private abortController: AbortController | null = null;

  constructor(files: File[]) {
    this.abortController = new AbortController();
    this.items = files.map((file, idx) => ({
      id: `${Date.now()}_${idx}_${Math.random().toString(36).substring(7)}`,
      file,
      sanitizedName: file.name,
      status: 'queued',
      progress: 0,
      originalSize: file.size,
    }));
  }

  public getItems(): BatchItem[] {
    return [...this.items];
  }

  public cancel(): void {
    this.isCancelled = true;
    if (this.abortController) {
      this.abortController.abort();
    }
    this.items.forEach((item) => {
      if (item.status === 'queued' || item.status === 'processing') {
        item.status = 'cancelled';
        item.error = 'Batch processing cancelled by user.';
      }
    });
  }

  public async processBatch(
    targetFormat: 'jpg' | 'png' | 'webp',
    onProgress?: BatchProgressCallback
  ): Promise<BatchItem[]> {
    this.isCancelled = false;
    this.abortController = new AbortController();

    for (let i = 0; i < this.items.length; i++) {
      if (this.isCancelled) {
        break;
      }

      const item = this.items[i];
      item.status = 'processing';
      item.progress = 25;
      if (onProgress) onProgress([...this.items], i);

      try {
        // Validate individual file
        const val = await validateFile(item.file);
        if (!val.valid) {
          item.status = 'failed';
          item.error = val.error || 'Validation failed';
          item.progress = 100;
          if (onProgress) onProgress([...this.items], i);
          continue;
        }

        item.progress = 50;
        if (onProgress) onProgress([...this.items], i);

        // Process file with worker / main thread fallback
        const res = await processImageWithWorker(item.file, {
          targetFormat,
          signal: this.abortController.signal,
        });

        if (this.isCancelled) {
          item.status = 'cancelled';
          item.error = 'Cancelled';
          break;
        }

        item.resultBlob = res.blob;
        item.convertedSize = res.convertedSize;
        item.downloadUrl = URL.createObjectURL(res.blob);
        item.status = 'completed';
        item.progress = 100;
      } catch (err) {
        if (this.isCancelled || (err instanceof DOMException && err.name === 'AbortError')) {
          item.status = 'cancelled';
          item.error = 'Cancelled by user';
        } else {
          item.status = 'failed';
          item.error = err instanceof Error ? err.message : 'Conversion failed for this image.';
          item.progress = 100;
        }
      }

      if (onProgress) onProgress([...this.items], i);
    }

    return [...this.items];
  }

  public cleanup(): void {
    this.items.forEach((item) => {
      if (item.downloadUrl) {
        URL.revokeObjectURL(item.downloadUrl);
        item.downloadUrl = undefined;
      }
    });
  }
}
