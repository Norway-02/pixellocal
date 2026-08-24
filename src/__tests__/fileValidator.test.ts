import { describe, it, expect } from 'vitest';
import {
  sanitizeFilename,
  getExtension,
  validateDimensions,
  validateFile,
} from '../lib/engine/fileValidator';

describe('fileValidator', () => {
  it('should sanitize dangerous filenames', () => {
    expect(sanitizeFilename('../../../etc/passwd')).toBe('passwd');
    const sanitizedXss = sanitizeFilename('<script>alert("xss")</script>.png');
    expect(sanitizedXss).not.toContain('<');
    expect(sanitizedXss).not.toContain('>');
    expect(sanitizedXss).not.toContain('"');
    expect(sanitizeFilename('normal_image.jpg')).toBe('normal_image.jpg');
    expect(sanitizeFilename('   ')).toBe('unnamed_file');
  });

  it('should extract correct file extensions', () => {
    expect(getExtension('photo.JPG')).toBe('jpg');
    expect(getExtension('image.png')).toBe('png');
    expect(getExtension('noextension')).toBe('');
  });

  it('should validate image dimension safety limits', () => {
    expect(validateDimensions(1920, 1080).valid).toBe(true);
    expect(validateDimensions(0, 1080).valid).toBe(false);
    expect(validateDimensions(10000, 6000).valid).toBe(false); // 60 MP > 50 MP limit
  });

  it('should reject files exceeding 25 MB size limit', async () => {
    const hugeBlob = new Blob([new Uint8Array(26 * 1024 * 1024)], { type: 'image/jpeg' });
    const hugeFile = new File([hugeBlob], 'huge.jpg', { type: 'image/jpeg' });
    const res = await validateFile(hugeFile);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('exceeds the maximum allowed limit of 25 MB');
  });
});
