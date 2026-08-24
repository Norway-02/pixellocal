import { z } from 'zod';

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
export const MAX_PIXELS = 50_000_000; // 50 Megapixels max safety limit

export type SupportedFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif' | 'heic' | 'heif';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedFormat?: SupportedFormat;
  sanitizedName?: string;
}

const MAGIC_BYTES: Record<string, SupportedFormat> = {
  'ffd8ff': 'jpg',
  '89504e47': 'png',
  '52494646': 'webp', // RIFF (check WEBP at offset 8)
  '00000018': 'heic', // ftypheic/ftypheif/ftypmif1
  '0000001c': 'heic',
  '00000020': 'avif', // ftypavif
};

export function sanitizeFilename(filename: string): string {
  // Strip path traversal sequences & illegal filename characters
  const cleanName = filename
    .replace(/^.*[\\/]/, '') // Remove directories
    .replace(/[^\w\s.-]/g, '_') // Remove unsafe chars
    .trim();
  
  return cleanName || 'unnamed_file';
}

export function getExtension(filename: string): string {
  const parts = filename.split('.');
  if (parts.length <= 1) return '';
  return parts.pop()?.toLowerCase() || '';
}

export async function readMagicBytes(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result || !(reader.result instanceof ArrayBuffer)) {
        resolve('');
        return;
      }
      const arr = new Uint8Array(reader.result).subarray(0, 12);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).padStart(2, '0');
      }
      resolve(header);
    };
    reader.onerror = () => resolve('');
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
}

export async function validateFile(
  file: File,
  allowedFormats: SupportedFormat[] = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'heic', 'heif']
): Promise<ValidationResult> {
  const sanitizedName = sanitizeFilename(file.name);

  // 1. File Size Check
  if (file.size <= 0) {
    return { valid: false, error: 'The selected file is empty (0 bytes).', sanitizedName };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds the maximum allowed limit of 25 MB.`,
      sanitizedName,
    };
  }

  // 2. Extension Hint
  const ext = getExtension(file.name) as SupportedFormat;

  // 3. Magic Bytes Detection
  const magic = await readMagicBytes(file);
  let detectedFormat: SupportedFormat | undefined;

  if (magic.startsWith('ffd8ff')) {
    detectedFormat = 'jpg';
  } else if (magic.startsWith('89504e47')) {
    detectedFormat = 'png';
  } else if (magic.startsWith('52494646')) { // RIFF
    detectedFormat = 'webp';
  } else if (magic.includes('6674797061766966') || magic.includes('61766966')) { // ftypavif
    detectedFormat = 'avif';
  } else if (magic.includes('6674797068656963') || magic.includes('6674797068656966') || magic.includes('667479706d696631')) {
    detectedFormat = 'heic';
  } else if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'heic', 'heif'].includes(ext)) {
    // Fallback to extension if magic bytes are not strictly matched (e.g. non-standard container)
    detectedFormat = ext === 'jpeg' ? 'jpg' : (ext === 'heif' ? 'heic' : ext);
  }

  if (!detectedFormat) {
    return {
      valid: false,
      error: 'Unsupported or unrecognized file format. Please upload a JPG, PNG, WebP, AVIF, or HEIC image.',
      sanitizedName,
    };
  }

  // Normalize format comparison
  const normalizedDetected = detectedFormat === 'jpeg' ? 'jpg' : detectedFormat;
  const isAllowed = allowedFormats.some((fmt) => {
    const norm = fmt === 'jpeg' ? 'jpg' : (fmt === 'heif' ? 'heic' : fmt);
    return norm === normalizedDetected;
  });

  if (!isAllowed) {
    return {
      valid: false,
      error: `Format .${detectedFormat.toUpperCase()} is not accepted for this specific tool. Expected: ${allowedFormats.join(', ').toUpperCase()}`,
      sanitizedName,
      detectedFormat,
    };
  }

  return {
    valid: true,
    detectedFormat,
    sanitizedName,
  };
}

export function validateDimensions(width: number, height: number): { valid: boolean; error?: string } {
  if (width <= 0 || height <= 0) {
    return { valid: false, error: 'Image dimensions must be greater than zero.' };
  }
  const totalPixels = width * height;
  if (totalPixels > MAX_PIXELS) {
    const mp = (totalPixels / 1_000_000).toFixed(1);
    return {
      valid: false,
      error: `Image dimensions (${width}x${height} = ${mp} Megapixels) exceed maximum safety boundary of 50 Megapixels.`,
    };
  }
  return { valid: true };
}
