# PixelLocal - Engineering & Security Audit Document

## 1. Working Features
- **Client-Side Image Engine**: Canvas, OffscreenCanvas, createImageBitmap, Web Workers offloading, and dynamic lazy-loaded HEIC decoder (`heic2any`).
- **All 14 Required Tool Routes**: Fully working interactive tools (`/heic-to-jpg`, `/heic-to-png`, `/jpg-to-webp`, `/png-to-webp`, `/webp-to-jpg`, `/avif-to-jpg`, `/avif-to-png`, `/compress-image`, `/compress-image-to-100kb`, `/compress-image-to-200kb`, `/compress-image-to-500kb`, `/compress-image-to-1mb`, `/resize-image`, `/batch-image-converter`).
- **Target Size Compression**: Bounded binary search algorithm (max 10 iterations, quality range 0.05-0.98, status label "Target reached" vs "Best effort").
- **Batch Processor**: Concurrency 1 state machine (`queued`, `processing`, `completed`, `failed`, `cancelled`) with isolated error handling and cancellation support.
- **Memory & Security Safety**: 25 MB file size limit, 50 Megapixel (`MAX_PIXELS`) safety guard, explicit `URL.revokeObjectURL` cleanup on card unmount and batch disposal, magic byte verification, filename sanitization.
- **SEO & Compliance**: Single source of truth `toolsConfig.ts`, JSON-LD structured data, dynamic `/sitemap.xml`, `/robots.txt`, non-blocking analytics, non-deceptive ad slots.

## 2. Fixed Issues
- **React Hook Order**: Refactored `ToolInteractiveArea.tsx` so hooks execute unconditionally at component top level.
- **Filename Sanitization**: Enhanced regex sanitization to strip path traversal sequences and raw script tags.
- **JPEG Background Flattening**: Added automatic white background fill when exporting transparent PNG/WebP inputs to JPEG format.

## 3. Remaining Limitations
- **Browser AVIF Decoding**: AVIF decoding requires native browser engine support (Chrome, Firefox, Safari 16.4+). Fallback messaging is displayed in unsupported environments.

## 4. Production Blockers
- **None**: All automated tests, typecheck, lint, and production static build pass cleanly.
