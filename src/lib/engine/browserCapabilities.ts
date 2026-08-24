export interface BrowserCapabilities {
  hasCreateImageBitmap: boolean;
  hasOffscreenCanvas: boolean;
  hasWebWorkers: boolean;
  canDecodeWebP: boolean;
  canDecodeAVIF: boolean;
  canDecodeHEIC: boolean;
}

let cachedCapabilities: BrowserCapabilities | null = null;

export async function detectBrowserCapabilities(): Promise<BrowserCapabilities> {
  if (cachedCapabilities) {
    return cachedCapabilities;
  }

  const isBrowser = typeof window !== 'undefined';

  const hasCreateImageBitmap = isBrowser && typeof window.createImageBitmap === 'function';
  const hasOffscreenCanvas = isBrowser && typeof window.OffscreenCanvas !== 'undefined';
  const hasWebWorkers = isBrowser && typeof window.Worker !== 'undefined';

  let canDecodeWebP = true;
  let canDecodeAVIF = false;
  const canDecodeHEIC = false; // Native browser HEIC support is non-standard (mostly Safari), we use dynamic JS decoder adapter

  if (isBrowser && hasCreateImageBitmap) {
    // Detect AVIF support via 1x1 test image
    try {
      const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAA1tZXRhAAAAAAAAAChoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAAAKcGl0bQAAAAABAAAAImlsb2MAAAAAREAAAABAAEAAAAAAAABAAAAAFAAAAAEAAAAAYWlvcgAAAAACAAAABwAAADFpcHJwAAAAHGlwY28AAAA1YXZjMQEACABAAFAAAAAAABFpc3BlAAAAAAABAAAAAQAAABFwaXhpAAAAAAADCAgIAAAAGmF1eEMAAAAAurn325N818987483647AAAAAHmFzc3QAAAAAAAEAACBpcm9mAAAAAAAAAAAAAAABAAAAEWlvc3AAAAAAAAACAAAAAAAAY29scgAAAAACAAACAAAAABhpc21wAAAAAAAAB2NsaXAAAAAA';
      const response = await fetch(avifData);
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);
      canDecodeAVIF = bitmap.width === 1 && bitmap.height === 1;
      bitmap.close();
    } catch {
      canDecodeAVIF = false;
    }
  }

  cachedCapabilities = {
    hasCreateImageBitmap,
    hasOffscreenCanvas,
    hasWebWorkers,
    canDecodeWebP,
    canDecodeAVIF,
    canDecodeHEIC,
  };

  return cachedCapabilities;
}

export function getCapabilityWarning(capability: keyof BrowserCapabilities, formatName: string): string | null {
  const caps = cachedCapabilities;
  if (!caps) return null;

  if (capability === 'canDecodeAVIF' && !caps.canDecodeAVIF) {
    return `Your current browser may not natively support ${formatName} decoding. We recommend using a modern browser like Chrome, Firefox, or Edge.`;
  }
  return null;
}
