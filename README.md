# PixelLocal - Privacy-First Image/File Utility Website

> Fast, free, privacy-first image tools. No signup.

Files are processed locally in your browser. PixelLocal does not upload user files to its servers for normal image processing.

---

## Features

- **14 Dedicated Image Utility Tools**:
  - **Conversion**: HEIC &rarr; JPG, HEIC &rarr; PNG, JPG &rarr; WebP, PNG &rarr; WebP, WebP &rarr; JPG, AVIF &rarr; JPG, AVIF &rarr; PNG
  - **Compression**: Custom Image Compressor, Compress to 100 KB, Compress to 200 KB, Compress to 500 KB, Compress to 1 MB (Bounded binary-search target size engine)
  - **Utility**: Proportional Aspect-Locked Image Resizer, Batch Image Converter (concurrency 1 state machine)
- **100% Client-Side Engine**: Browser `Canvas`, `OffscreenCanvas`, `createImageBitmap`, Web Workers, and dynamically loaded HEIC decoder (`heic2any`).
- **Memory & Security Boundary Guards**:
  - 25 MB file size limit
  - 50 Megapixel (`MAX_PIXELS = 50_000_000`) safety boundary guard
  - Object URL lifecycle revocation (`URL.revokeObjectURL`)
  - Magic byte & MIME type verification
  - Filename sanitization to prevent path traversal / XSS injection
- **Production SEO & Structured Data**: Dynamic metadata, OpenGraph, JSON-LD (`WebApplication`, `FAQPage`, `BreadcrumbList`), dynamic `/sitemap.xml`, `/robots.txt`.
- **Non-Blocking Analytics**: Coarse metrics tracking without transmitting raw file contents or image pixels.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run unit & integration test suite
npm test

# Run ESLint check
npm run lint

# Build production bundle
npm run build
```

---

## Architecture & Code Structure

```text
src/
├── app/                  # Next.js App Router static pages & dynamic [tool]/page.tsx
├── components/           # Reusable UI components (FileDropzone, Settings, ResultCard, PrivacyNotice, etc.)
├── lib/
│   ├── analytics.ts      # Non-blocking telemetry tracking
│   ├── toolsConfig.ts    # Single source of truth for tool routes, metadata, & FAQs
│   └── engine/           # Browser image processing engine (converters, resizers, compressors, validators)
└── workers/              # Offloaded Web Worker processing & workerClient fallback
```
