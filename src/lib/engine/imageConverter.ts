import { validateFile, getExtension } from './fileValidator';
import { decodeNativeImage, DecodedImageResult } from './decoders/nativeDecoder';
import { decodeHeicImage } from './decoders/heicDecoder';

export interface ConvertOptions {
  targetFormat: 'jpg' | 'png' | 'webp' | 'avif';
  quality?: number; // 0.1 to 1.0
  backgroundColor?: string; // Default 'white' for JPG output
}

export interface ConvertResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  convertedSize: number;
  targetFormat: string;
}

export async function convertImage(
  file: File | Blob,
  options: ConvertOptions
): Promise<ConvertResult> {
  const originalSize = file.size;

  // Format routing
  let isHeic = false;
  if (file instanceof File) {
    const ext = getExtension(file.name);
    if (ext === 'heic' || ext === 'heif') {
      isHeic = true;
    }
  }

  let decoded: DecodedImageResult;
  if (isHeic) {
    decoded = await decodeHeicImage(file);
  } else {
    decoded = await decodeNativeImage(file);
  }

  const { width, height, source } = decoded;

  // Canvas Rendering & Encoding
  let canvas: HTMLCanvasElement | OffscreenCanvas;
  let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D | null;
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
  }

  if (!ctx) {
    if ('close' in source && typeof source.close === 'function') source.close();
    throw new Error('Could not create canvas rendering context.');
  }

  const mimeType = options.targetFormat === 'jpg' ? 'image/jpeg' : `image/${options.targetFormat}`;

  // Handle transparent background for JPEGs
  if (mimeType === 'image/jpeg') {
    ctx.fillStyle = options.backgroundColor || '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }

  // Draw source image
  ctx.drawImage(source, 0, 0, width, height);

  // Close bitmap if applicable to release GPU/RAM memory
  if ('close' in source && typeof source.close === 'function') {
    source.close();
  }

  const quality = options.quality ?? 0.92;
  let blob: Blob | null = null;

  if (canvas instanceof OffscreenCanvas) {
    blob = await canvas.convertToBlob({ type: mimeType, quality });
  } else {
    blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), mimeType, quality);
    });
  }

  if (!blob) {
    throw new Error(`Failed to encode image to ${options.targetFormat.toUpperCase()} format.`);
  }

  return {
    blob,
    width,
    height,
    originalSize,
    convertedSize: blob.size,
    targetFormat: options.targetFormat,
  };
}
