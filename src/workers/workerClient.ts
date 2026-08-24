import { convertImage } from '../lib/engine/imageConverter';

export interface ProcessTaskOptions {
  targetFormat: 'jpg' | 'png' | 'webp' | 'avif';
  quality?: number;
  signal?: AbortSignal;
}

export interface ProcessTaskResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  convertedSize: number;
  targetFormat: string;
}

export async function processImageWithWorker(
  file: File | Blob,
  options: ProcessTaskOptions
): Promise<ProcessTaskResult> {
  const { signal } = options;

  if (signal?.aborted) {
    throw new DOMException('Processing was cancelled by the user.', 'AbortError');
  }

  // Check if Web Worker and OffscreenCanvas are supported
  const supportsWorker =
    typeof window !== 'undefined' &&
    typeof window.Worker !== 'undefined' &&
    typeof window.OffscreenCanvas !== 'undefined';

  if (!supportsWorker) {
    // Fallback to main thread processing
    return await convertImage(file, {
      targetFormat: options.targetFormat,
      quality: options.quality,
    });
  }

  return new Promise((resolve, reject) => {
    let worker: Worker | null = null;

    const cleanup = () => {
      if (worker) {
        worker.terminate();
        worker = null;
      }
    };

    if (signal) {
      signal.addEventListener('abort', () => {
        cleanup();
        reject(new DOMException('Processing was cancelled by the user.', 'AbortError'));
      });
    }

    try {
      worker = new Worker(new URL('./image.worker.ts', import.meta.url));
      const taskId = Math.random().toString(36).substring(7);

      worker.onmessage = (e: MessageEvent) => {
        const { id, success, result, error } = e.data;
        if (id !== taskId) return;

        cleanup();

        if (success) {
          resolve({
            blob: result.blob,
            width: result.width,
            height: result.height,
            originalSize: file.size,
            convertedSize: result.size,
            targetFormat: options.targetFormat,
          });
        } else {
          // Fallback to main thread on worker internal error
          convertImage(file, {
            targetFormat: options.targetFormat,
            quality: options.quality,
          }).then(resolve, reject);
        }
      };

      worker.onerror = () => {
        cleanup();
        // Fallback to main thread execution
        convertImage(file, {
          targetFormat: options.targetFormat,
          quality: options.quality,
        }).then(resolve, reject);
      };

      worker.postMessage({
        id: taskId,
        type: 'CONVERT',
        payload: {
          imageBlob: file,
          targetFormat: options.targetFormat,
          quality: options.quality,
        },
      });
    } catch {
      cleanup();
      // Main thread fallback
      convertImage(file, {
        targetFormat: options.targetFormat,
        quality: options.quality,
      }).then(resolve, reject);
    }
  });
}
