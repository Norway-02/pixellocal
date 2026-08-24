// Image processing worker boundary

self.onmessage = async (e: MessageEvent) => {
  const { id, type, payload } = e.data;

  try {
    if (type === 'CONVERT') {
      const { imageBlob, targetFormat, quality } = payload;
      
      // Native createImageBitmap decoding in worker context
      const bitmap = await createImageBitmap(imageBlob);
      const width = bitmap.width;
      const height = bitmap.height;

      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Worker Canvas context unavailable');

      const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : `image/${targetFormat}`;
      if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();

      const blob = await canvas.convertToBlob({ type: mimeType, quality: quality || 0.9 });
      
      self.postMessage({ id, success: true, result: { blob, width, height, size: blob.size } });
    } else {
      throw new Error(`Unknown worker command: ${type}`);
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Worker execution failed';
    self.postMessage({ id, success: false, error: errorMsg });
  }
};
