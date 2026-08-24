import { convertImage } from './imageConverter';

export interface CompressOptions {
  targetSizeBytes?: number; // E.g. 100KB = 102400
  quality?: number; // E.g. 0.8
  targetFormat?: 'jpg' | 'webp' | 'png';
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  savingsPercentage: number;
  targetReached: boolean;
  statusLabel: 'Target reached' | 'Best effort';
  finalQuality: number;
}

const MAX_ITERATIONS = 10;
const MIN_QUALITY = 0.05;
const MAX_QUALITY = 0.98;

export async function compressImage(
  file: File | Blob,
  options: CompressOptions
): Promise<CompressResult> {
  const originalSize = file.size;
  const targetFormat = options.targetFormat || 'jpg';

  // If no targetSizeBytes specified, perform single-pass quality compression
  if (!options.targetSizeBytes) {
    const quality = options.quality ?? 0.75;
    const res = await convertImage(file, { targetFormat, quality });
    const savings = Math.max(0, ((originalSize - res.convertedSize) / originalSize) * 100);

    return {
      blob: res.blob,
      width: res.width,
      height: res.height,
      originalSize,
      compressedSize: res.convertedSize,
      savingsPercentage: Number(savings.toFixed(1)),
      targetReached: true,
      statusLabel: 'Target reached',
      finalQuality: quality,
    };
  }

  const targetSize = options.targetSizeBytes;

  // Bounded Binary Search Quality Optimization
  let low = MIN_QUALITY;
  let high = MAX_QUALITY;
  let bestResult: { blob: Blob; width: number; height: number; size: number; quality: number } | null = null;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const midQuality = (low + high) / 2;
    const res = await convertImage(file, { targetFormat, quality: midQuality });

    if (!bestResult || Math.abs(res.convertedSize - targetSize) < Math.abs(bestResult.size - targetSize) || res.convertedSize <= targetSize) {
      bestResult = {
        blob: res.blob,
        width: res.width,
        height: res.height,
        size: res.convertedSize,
        quality: midQuality,
      };
    }

    if (res.convertedSize <= targetSize) {
      // Reached under target size, attempt higher quality
      low = midQuality;
    } else {
      // Exceeded target size, attempt lower quality
      high = midQuality;
    }

    // Stop early if search bounds converge closely
    if (high - low < 0.03) break;
  }

  if (!bestResult) {
    throw new Error('Image compression could not produce a valid output.');
  }

  const targetReached = bestResult.size <= targetSize;
  const savings = Math.max(0, ((originalSize - bestResult.size) / originalSize) * 100);

  return {
    blob: bestResult.blob,
    width: bestResult.width,
    height: bestResult.height,
    originalSize,
    compressedSize: bestResult.size,
    savingsPercentage: Number(savings.toFixed(1)),
    targetReached,
    statusLabel: targetReached ? 'Target reached' : 'Best effort',
    finalQuality: Number(bestResult.quality.toFixed(2)),
  };
}
