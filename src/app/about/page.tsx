import Metadata from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = {
  title: 'About PixelLocal',
  description: 'Learn about PixelLocal, the privacy-first local browser image utility suite.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
        About PixelLocal
      </h1>

      <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-4">
        <p>
          PixelLocal was created with a clear mission: to provide ultra-fast, free, and privacy-respecting file tools directly inside modern web browsers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
          Our Architecture Principle
        </h2>
        <p>
          Files are processed locally in your browser. PixelLocal does not upload user files to its servers for normal image processing.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
          Supported Technologies
        </h2>
        <p>
          PixelLocal leverages cutting-edge web technology including WebAssembly, HTML5 OffscreenCanvas, createImageBitmap APIs, and Web Workers to deliver desktop-grade file conversion without requiring server infrastructure.
        </p>
      </div>
    </div>
  );
}
