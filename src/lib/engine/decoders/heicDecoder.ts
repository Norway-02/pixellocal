import { decodeNativeImage, DecodedImageResult } from './nativeDecoder';

export async function decodeHeicImage(file: File | Blob): Promise<DecodedImageResult> {
  try {
    // Dynamic import to prevent bundling heic2any on non-HEIC pages
    const heic2anyModule = await import('heic2any');
    const heic2any = heic2anyModule.default || heic2anyModule;

    const convertedBlobOrBlobs = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.95,
    });

    const convertedBlob = Array.isArray(convertedBlobOrBlobs)
      ? convertedBlobOrBlobs[0]
      : convertedBlobOrBlobs;

    if (!convertedBlob) {
      throw new Error('HEIC conversion returned empty result.');
    }

    return await decodeNativeImage(convertedBlob);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown HEIC decoding error';
    throw new Error(`Failed to decode HEIC file: ${errorMsg}. Please ensure the file is a valid Apple HEIC/HEIF image.`);
  }
}
