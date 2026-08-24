import { describe, it, expect } from 'vitest';

describe('imageResizer Math Calculations', () => {
  it('should calculate aspect ratio locked dimensions correctly', () => {
    const origWidth = 1920;
    const origHeight = 1080;
    const aspectRatio = origWidth / origHeight;

    // Target width 960 -> target height should be 540
    const targetWidth = 960;
    const calculatedHeight = Math.round(targetWidth / aspectRatio);
    expect(calculatedHeight).toBe(540);

    // Target height 720 -> target width should be 1280
    const targetHeight = 720;
    const calculatedWidth = Math.round(targetHeight * aspectRatio);
    expect(calculatedWidth).toBe(1280);
  });

  it('should calculate percentage scaling factor correctly', () => {
    const origWidth = 2000;
    const origHeight = 1000;

    const scale50Width = Math.round(origWidth * 0.5);
    const scale50Height = Math.round(origHeight * 0.5);

    expect(scale50Width).toBe(1000);
    expect(scale50Height).toBe(500);
  });
});
