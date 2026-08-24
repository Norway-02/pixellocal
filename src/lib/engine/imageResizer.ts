import { decodeNativeImage } from './decoders/nativeDecoder';
import { validateDimensions } from './fileValidator';

export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  scalePercentage?: number; // 1 to 200
  targetFormat?: 'jpg' | 'png' | 'webp';
  quality?: number;
}

export interface ResizeResult {
  blob: Blob;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  originalSize: number;
  newSize: number;
}

export async function resizeImage(
  file: File | Blob,
  options: ResizeOptions
): Promise<ResizeResult> {
  const originalSize = file.size;
  const decoded = await decodeNativeImage(file);
  const { width: origWidth, height: origHeight, source } = decoded;

  const aspectRatio = origWidth / origHeight;
  let targetWidth = origWidth;
  let targetHeight = origHeight;

  if (options.scalePercentage && options.scalePercentage > 0) {
    const factor = options.scalePercentage / 100;
    targetWidth = Math.round(origWidth * factor);
    targetHeight = Math.round(origHeight * factor);
  } else if (options.width && options.height) {
    if (options.maintainAspectRatio) {
      targetWidth = options.width;
      targetHeight = Math.round(options.width / aspectRatio);
    } else {
      targetWidth = options.width;
      targetHeight = options.height;
    }
  } else if (options.width) {
    targetWidth = options.width;
    targetHeight = options.maintainAspectRatio !== false
      ? Math.round(options.width / aspectRatio)
      : origHeight;
  } else if (options.height) {
    targetHeight = options.height;
    targetWidth = options.maintainAspectRatio !== false
      ? Math.round(options.height * aspectRatio)
      : origWidth;
  }

  // Prevent 0 or negative dimensions
  targetWidth = Math.max(1, targetWidth);
  targetHeight = Math.max(1, targetHeight);

  // Validate bounds
  const dimCheck = validateDimensions(targetWidth, targetHeight);
  if (!dimCheck.valid) {
    if ('close' in source && typeof source.close === 'function') source.close();
    throw new Error(dimCheck.error || 'Target dimensions exceed safe boundaries.');
  }

  // Render to canvas
  let canvas: HTMLCanvasElement | OffscreenCanvas;
  let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(targetWidth, targetHeight);
    ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D | null;
  } else {
    canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx = canvas.getContext('2d');
  }

  if (!ctx) {
    if ('close' in source && typeof source.close === 'function') source.close();
    throw new Error('Canvas context could not be created.');
  }

  const format = options.targetFormat || 'jpg';
  const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;

  if (mimeType === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // High quality image scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

  if ('close' in source && typeof source.close === 'function') {
    source.close();
  }

  const quality = options.quality ?? 0.92;
  let blob: Blob | null = null;

  if (canvas instanceof OffscreenCanvas) {
    blob = await canvas.convertToBlob({ type: mimeType, quality });
  } else {
    blob = await new Promise<Blob | null>((res) => {
      canvas.toBlob((b) => res(b), mimeType, quality);
    });
  }

  if (!blob) {
    throw new Error(`Failed to encode resized image as ${format.toUpperCase()}.`);
  }

  return {
    blob,
    originalWidth: origWidth,
    originalHeight: origHeight,
    newWidth: targetWidth,
    newHeight: targetHeight,
    originalSize,
    newSize: blob.size,
  };
}
