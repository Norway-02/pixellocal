export type ToolType = 'conversion' | 'compression' | 'resize' | 'batch';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolConfig {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  seoDescription: string;
  type: ToolType;
  inputFormats: string[];
  outputFormat: string;
  targetSizeBytes?: number; // for fixed target compression tools
  targetSizeLabel?: string;
  howItWorks: string[];
  limitations: string[];
  faq: FAQItem[];
  relatedToolSlugs: string[];
}

export const SITE_NAME = 'PixelLocal';
export const DEFAULT_SITE_URL = 'https://pixellocal.com';

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export const TOOLS: Record<string, ToolConfig> = {
  'heic-to-jpg': {
    id: 'heic-to-jpg',
    slug: 'heic-to-jpg',
    title: 'HEIC to JPG Converter',
    shortDescription: 'Convert iPhone HEIC photos to standard JPG images locally in your browser.',
    seoDescription: 'Fast, free, privacy-first HEIC to JPG converter. Convert Apple iPhone photos to JPG format entirely inside your browser with zero file uploads.',
    type: 'conversion',
    inputFormats: ['heic', 'heif'],
    outputFormat: 'jpg',
    howItWorks: [
      'Select or drop your iPhone HEIC / HEIF file.',
      'PixelLocal decodes the HEIC container in browser memory.',
      'The file is encoded into standard high-quality JPEG and ready for immediate download.',
    ],
    limitations: [
      'JPEG format does not support transparency; transparent areas are flattened onto a white background.',
      'Maximum file size is 25 MB per image.',
    ],
    faq: [
      {
        question: 'Are my HEIC photos uploaded to a server?',
        answer: 'No. PixelLocal processes your HEIC images locally in your browser memory. Files are never uploaded or saved to any external server.',
      },
      {
        question: 'Why convert HEIC to JPG?',
        answer: 'JPG is universally supported across Windows, Android, websites, and photo editors, whereas HEIC is an Apple-specific container.',
      },
    ],
    relatedToolSlugs: ['heic-to-png', 'jpg-to-webp', 'compress-image', 'batch-image-converter'],
  },
  'heic-to-png': {
    id: 'heic-to-png',
    slug: 'heic-to-png',
    title: 'HEIC to PNG Converter',
    shortDescription: 'Convert HEIC files to high-quality lossless PNG images on your device.',
    seoDescription: 'Convert HEIC photos to PNG format locally. Fast, free, zero upload privacy guarantee.',
    type: 'conversion',
    inputFormats: ['heic', 'heif'],
    outputFormat: 'png',
    howItWorks: [
      'Upload your HEIC photo.',
      'The browser decodes the image data into full pixel buffers.',
      'Exports to lossless PNG format.',
    ],
    limitations: ['Maximum file size limit of 25 MB per file.'],
    faq: [
      {
        question: 'Does PNG preserve full quality from HEIC?',
        answer: 'Yes. PNG uses lossless compression, ensuring no additional visual artifacts are introduced.',
      },
    ],
    relatedToolSlugs: ['heic-to-jpg', 'png-to-webp', 'resize-image', 'batch-image-converter'],
  },
  'jpg-to-webp': {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    title: 'JPG to WebP Converter',
    shortDescription: 'Convert JPG images to modern WebP format for smaller file sizes and faster web loading.',
    seoDescription: 'Convert JPG to WebP locally in your browser. Reduce web image load times by up to 30-50% with privacy-first client-side processing.',
    type: 'conversion',
    inputFormats: ['jpg', 'jpeg'],
    outputFormat: 'webp',
    howItWorks: [
      'Drag and drop your JPEG file.',
      'Select quality parameters.',
      'Generate optimized WebP output locally.',
    ],
    limitations: ['Target browser must support WebP encoding (all modern browsers support WebP).'],
    faq: [
      {
        question: 'Why convert JPG to WebP?',
        answer: 'WebP offers significantly better compression algorithms, delivering smaller file sizes at identical visual quality.',
      },
    ],
    relatedToolSlugs: ['png-to-webp', 'webp-to-jpg', 'compress-image', 'batch-image-converter'],
  },
  'png-to-webp': {
    id: 'png-to-webp',
    slug: 'png-to-webp',
    title: 'PNG to WebP Converter',
    shortDescription: 'Convert PNG images to lightweight WebP while preserving full alpha channel transparency.',
    seoDescription: 'Convert transparent PNG to WebP format directly in your browser. Fast, free, client-side image processing.',
    type: 'conversion',
    inputFormats: ['png'],
    outputFormat: 'webp',
    howItWorks: [
      'Select PNG files containing logos, icons, or graphics.',
      'The engine preserves the alpha channel.',
      'Outputs compressed WebP with transparency.',
    ],
    limitations: ['25 MB file size limit.'],
    faq: [
      {
        question: 'Will my transparent PNG background remain transparent in WebP?',
        answer: 'Yes, WebP fully supports alpha transparency just like PNG.',
      },
    ],
    relatedToolSlugs: ['jpg-to-webp', 'webp-to-jpg', 'resize-image', 'batch-image-converter'],
  },
  'webp-to-jpg': {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    title: 'WebP to JPG Converter',
    shortDescription: 'Convert WebP files to standard JPEG images for maximum software compatibility.',
    seoDescription: 'Convert WebP to JPG format locally on your device. No signups, zero server uploads.',
    type: 'conversion',
    inputFormats: ['webp'],
    outputFormat: 'jpg',
    howItWorks: [
      'Upload WebP files.',
      'Render pixels onto canvas with a solid white background.',
      'Download as standard JPG.',
    ],
    limitations: ['Transparent WebP areas will be flattened onto a clean white background.'],
    faq: [
      {
        question: 'Why convert WebP to JPG?',
        answer: 'Some desktop applications or legacy tools cannot read WebP files. JPG ensures universal compatibility.',
      },
    ],
    relatedToolSlugs: ['jpg-to-webp', 'png-to-webp', 'compress-image'],
  },
  'avif-to-jpg': {
    id: 'avif-to-jpg',
    slug: 'avif-to-jpg',
    title: 'AVIF to JPG Converter',
    shortDescription: 'Convert modern AVIF images to universally compatible JPEG format in your browser.',
    seoDescription: 'Convert AVIF to JPG images locally. Fast, free, privacy-first client-side image tool.',
    type: 'conversion',
    inputFormats: ['avif'],
    outputFormat: 'jpg',
    howItWorks: [
      'Upload AVIF image.',
      'Browser decodes AVIF frame buffer.',
      'Encodes into JPEG binary Blob.',
    ],
    limitations: ['Requires a browser with AVIF decoding support (Chrome, Firefox, Safari 16.4+).'],
    faq: [
      {
        question: 'What if my browser cannot decode AVIF?',
        answer: 'PixelLocal will detect capability and notify you to use Chrome or Firefox if your environment lacks native AVIF decoding.',
      },
    ],
    relatedToolSlugs: ['avif-to-png', 'jpg-to-webp', 'compress-image'],
  },
  'avif-to-png': {
    id: 'avif-to-png',
    slug: 'avif-to-png',
    title: 'AVIF to PNG Converter',
    shortDescription: 'Convert AVIF images to lossless PNG with full transparency support.',
    seoDescription: 'Convert AVIF to PNG locally. High quality lossless conversion with privacy guarantee.',
    type: 'conversion',
    inputFormats: ['avif'],
    outputFormat: 'png',
    howItWorks: [
      'Select AVIF image file.',
      'Decode pixel buffers.',
      'Export to PNG Blob.',
    ],
    limitations: ['25 MB file limit.'],
    faq: [
      {
        question: 'Does AVIF to PNG maintain alpha transparency?',
        answer: 'Yes, alpha channels are completely preserved when exporting to PNG.',
      },
    ],
    relatedToolSlugs: ['avif-to-jpg', 'png-to-webp', 'resize-image'],
  },
  'compress-image': {
    id: 'compress-image',
    slug: 'compress-image',
    title: 'Custom Image Compressor',
    shortDescription: 'Compress JPG, PNG, and WebP images with custom quality controls directly on your device.',
    seoDescription: 'Free privacy-first image compressor. Reduce image file size without losing quality locally in your browser.',
    type: 'compression',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'original',
    howItWorks: [
      'Select an image to compress.',
      'Adjust the quality slider (10% to 100%).',
      'Compare original vs compressed file size in real time.',
    ],
    limitations: ['PNG compression is lossless; converting to WebP/JPG provides higher reduction.'],
    faq: [
      {
        question: 'How does local compression work?',
        answer: 'The browser re-encodes the image canvas data at optimized compression levels directly in client RAM.',
      },
    ],
    relatedToolSlugs: ['compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb'],
  },
  'compress-image-to-100kb': {
    id: 'compress-image-to-100kb',
    slug: 'compress-image-to-100kb',
    title: 'Compress Image to 100 KB',
    shortDescription: 'Automatically shrink image file size to under 100 KB using iterative binary-search compression.',
    seoDescription: 'Compress image to under 100KB online for free. Ideal for web forms, passports, application portals, and email attachments.',
    type: 'compression',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'jpg',
    targetSizeBytes: 100 * 1024,
    targetSizeLabel: '100 KB',
    howItWorks: [
      'Drop your photo.',
      'PixelLocal runs a bounded binary-search algorithm adjusting quality & dimensions.',
      'Stops once file size is <= 100 KB while retaining maximum visual sharpness.',
    ],
    limitations: ['Exact 100 KB target is not mathematically guaranteed for extremely large complex images, but best-effort output is delivered.'],
    faq: [
      {
        question: 'What if an image cannot fit under 100 KB without severe distortion?',
        answer: 'The system performs proportional dimension scaling down to safe boundaries to achieve the target size.',
      },
    ],
    relatedToolSlugs: ['compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb', 'resize-image'],
  },
  'compress-image-to-200kb': {
    id: 'compress-image-to-200kb',
    slug: 'compress-image-to-200kb',
    title: 'Compress Image to 200 KB',
    shortDescription: 'Compress photo file size to 200 KB or less locally on your computer.',
    seoDescription: 'Compress image to 200KB online. Perfect for web uploads and documents with zero file uploads.',
    type: 'compression',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'jpg',
    targetSizeBytes: 200 * 1024,
    targetSizeLabel: '200 KB',
    howItWorks: [
      'Upload image file.',
      'Iterative binary compression scales quality to achieve <= 200 KB.',
      'Download immediately.',
    ],
    limitations: ['Best-effort output returned if input content exceeds compression entropy limits.'],
    faq: [
      {
        question: 'Is my data safe?',
        answer: 'Yes. Files are processed locally in your browser. PixelLocal does not upload user files to its servers.',
      },
    ],
    relatedToolSlugs: ['compress-image-to-100kb', 'compress-image-to-500kb', 'compress-image-to-1mb'],
  },
  'compress-image-to-500kb': {
    id: 'compress-image-to-500kb',
    slug: 'compress-image-to-500kb',
    title: 'Compress Image to 500 KB',
    shortDescription: 'Reduce heavy images down to 500 KB while preserving crisp details.',
    seoDescription: 'Compress photos to under 500KB online. Privacy-first local browser compression.',
    type: 'compression',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'jpg',
    targetSizeBytes: 500 * 1024,
    targetSizeLabel: '500 KB',
    howItWorks: [
      'Select image.',
      'Runs bounded binary-search quality tuning.',
      'Download compressed result.',
    ],
    limitations: ['Maximum file input limit is 25 MB.'],
    faq: [
      {
        question: 'Can I compress batch images to 500KB?',
        answer: 'Use the Batch Image Converter tool for multi-file processing.',
      },
    ],
    relatedToolSlugs: ['compress-image-to-200kb', 'compress-image-to-1mb', 'resize-image'],
  },
  'compress-image-to-1mb': {
    id: 'compress-image-to-1mb',
    slug: 'compress-image-to-1mb',
    title: 'Compress Image to 1 MB',
    shortDescription: 'Compress large high-resolution photos to under 1 MB effortlessly.',
    seoDescription: 'Shrink large camera photos to under 1MB locally. No signup, instant browser processing.',
    type: 'compression',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'jpg',
    targetSizeBytes: 1024 * 1024,
    targetSizeLabel: '1 MB',
    howItWorks: [
      'Drop your high-res DSLR or smartphone photo.',
      'PixelLocal optimizes compression layers to reach <= 1 MB.',
      'Download your image.',
    ],
    limitations: ['Inputs capped at 25 MB max file size and 50 Megapixels.'],
    faq: [
      {
        question: 'Does this work on mobile phones?',
        answer: 'Yes, fully compatible with mobile Safari, Chrome, and Firefox browsers.',
      },
    ],
    relatedToolSlugs: ['compress-image-to-500kb', 'resize-image', 'batch-image-converter'],
  },
  'resize-image': {
    id: 'resize-image',
    slug: 'resize-image',
    title: 'Image Resizer',
    shortDescription: 'Resize image dimensions by exact pixels or percentage with aspect-ratio lock.',
    seoDescription: 'Free online image resizer. Change image dimensions in pixels or percentage locally in your browser with zero file uploads.',
    type: 'resize',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    outputFormat: 'original',
    howItWorks: [
      'Upload image.',
      'Set target width, height, or scale percentage.',
      'Aspect ratio auto-calculates (newHeight = newWidth / aspectRatio).',
      'Download resized file.',
    ],
    limitations: ['Maximum pixel dimensions boundary is 50 Megapixels.'],
    faq: [
      {
        question: 'How does aspect ratio locking work?',
        answer: 'When enabled, modifying either width or height automatically calculates the other dimension to prevent stretching or distortion.',
      },
    ],
    relatedToolSlugs: ['compress-image', 'batch-image-converter', 'jpg-to-webp'],
  },
  'batch-image-converter': {
    id: 'batch-image-converter',
    slug: 'batch-image-converter',
    title: 'Batch Image Converter',
    shortDescription: 'Convert multiple images simultaneously with single-file concurrency and progress tracking.',
    seoDescription: 'Batch convert multiple images online for free. Process JPG, PNG, and WebP images in bulk locally on your device.',
    type: 'batch',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp', 'heic'],
    outputFormat: 'webp',
    howItWorks: [
      'Select or drop multiple image files.',
      'Choose desired output format (JPG, PNG, or WebP).',
      'The queue processes images sequentially (concurrency 1) to prevent memory lock.',
      'Download converted files individually.',
    ],
    limitations: ['To ensure browser stability on mobile devices, processing concurrency is capped at 1 file at a time.'],
    faq: [
      {
        question: 'What happens if one file fails in a batch?',
        answer: 'Each file is processed independently. A failure in one image will not break or stop the rest of your batch.',
      },
    ],
    relatedToolSlugs: ['heic-to-jpg', 'jpg-to-webp', 'png-to-webp', 'compress-image'],
  },
};

export const INFORMATIONAL_PAGES = ['about', 'privacy', 'terms', 'contact'];
