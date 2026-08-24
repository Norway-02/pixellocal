import { describe, it, expect } from 'vitest';
import { TOOLS } from '../lib/toolsConfig';

describe('toolsConfig Single Source of Truth', () => {
  it('should define all 14 required tool routes', () => {
    const requiredSlugs = [
      'heic-to-jpg',
      'heic-to-png',
      'jpg-to-webp',
      'png-to-webp',
      'webp-to-jpg',
      'avif-to-jpg',
      'avif-to-png',
      'compress-image',
      'compress-image-to-100kb',
      'compress-image-to-200kb',
      'compress-image-to-500kb',
      'compress-image-to-1mb',
      'resize-image',
      'batch-image-converter',
    ];

    requiredSlugs.forEach((slug) => {
      expect(TOOLS[slug]).toBeDefined();
      expect(TOOLS[slug].title).toBeTruthy();
      expect(TOOLS[slug].seoDescription).toBeTruthy();
      expect(TOOLS[slug].faq.length).toBeGreaterThan(0);
    });
  });

  it('should set exact target sizes for fixed target compression tools', () => {
    expect(TOOLS['compress-image-to-100kb'].targetSizeBytes).toBe(100 * 1024);
    expect(TOOLS['compress-image-to-200kb'].targetSizeBytes).toBe(200 * 1024);
    expect(TOOLS['compress-image-to-500kb'].targetSizeBytes).toBe(500 * 1024);
    expect(TOOLS['compress-image-to-1mb'].targetSizeBytes).toBe(1024 * 1024);
  });
});
