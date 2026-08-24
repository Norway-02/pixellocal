import Metadata from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy',
  description: 'PixelLocal Privacy Policy detailing our 100% browser-local file processing guarantee.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
        Privacy Policy
      </h1>

      <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 font-semibold text-emerald-900 dark:text-emerald-200">
          Core Commitment: Files are processed locally in your browser. PixelLocal does not upload user files to its servers for normal image processing.
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. File Data & Content
        </h2>
        <p>
          Your images, photos, graphics, and document files are processed entirely in your computer or mobile device memory (RAM). PixelLocal does not transmit, upload, inspect, or store your files on remote servers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. Analytics
        </h2>
        <p>
          We collect coarse, non-identifying usage metrics (e.g. tool name, success/failure status, duration buckets) solely to monitor system stability and performance. Analytics never contain raw file pixels, image content, filenames, or personal details.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          3. Cookies & Advertising
        </h2>
        <p>
          PixelLocal may display contextual advertisements. Ad providers may place standard non-tracking cookies to deliver non-intrusive ad inventory.
        </p>
      </div>
    </div>
  );
}
