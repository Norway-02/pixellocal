import Metadata from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for using PixelLocal web tools.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
        Terms of Service
      </h1>

      <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-4">
        <p>
          By using PixelLocal, you agree to these standard terms:
        </p>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. Usage Rights & Acceptance
        </h2>
        <p>
          PixelLocal is provided for free personal and commercial use. You are responsible for ensuring you possess the necessary copyright permissions for any images you process.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. Disclaimer of Warranties
        </h2>
        <p>
          PixelLocal tools are provided &quot;as-is&quot; without warranty of any kind. All processing occurs locally on your browser.
        </p>
      </div>
    </div>
  );
}
