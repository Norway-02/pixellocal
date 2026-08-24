import { validateDimensions } from '../fileValidator';

export interface DecodedImageResult {
  width: number;
  height: number;
  source: ImageBitmap | HTMLImageElement | HTMLCanvasElement;
}

export async function decodeNativeImage(file: File | Blob): Promise<DecodedImageResult> {
  // Try createImageBitmap first
  if (typeof window !== 'undefined' && typeof window.createImageBitmap === 'function') {
    try {
      const bitmap = await window.createImageBitmap(file);
      const dimCheck = validateDimensions(bitmap.width, bitmap.height);
      if (!dimCheck.valid) {
        bitmap.close();
        throw new Error(dimCheck.error || 'Invalid image dimensions');
      }
      return {
        width: bitmap.width,
        height: bitmap.height,
        source: bitmap,
      };
    } catch {
      // Fall through to HTMLImageElement fallback
    }
  }

  // HTMLImageElement Fallback
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const dimCheck = validateDimensions(img.width, img.height);
      if (!dimCheck.valid) {
        reject(new Error(dimCheck.error || 'Invalid image dimensions'));
        return;
      }
      resolve({
        width: img.width,
        height: img.height,
        source: img,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image. The file may be corrupted or in an unsupported format.'));
    };
    img.src = url;
  });
}
