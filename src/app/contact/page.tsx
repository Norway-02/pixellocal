import Metadata from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the PixelLocal team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
        Contact & Feedback
      </h1>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Have questions, bug reports, or feature requests? We value your input.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="font-bold text-slate-900 dark:text-white block mb-1">
            Email Support
          </span>
          <a href="mailto:support@pixellocal.com" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            support@pixellocal.com
          </a>
        </div>
      </div>
    </div>
  );
}
