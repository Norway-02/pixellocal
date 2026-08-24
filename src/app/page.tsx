import Link from 'next/link';
import { TOOLS } from '../lib/toolsConfig';
import QuickConverterBridge from '../components/QuickConverterBridge';
import AdSlot from '../components/AdSlot';

export default function HomePage() {
  const featuredSlugs = ['heic-to-jpg', 'jpg-to-webp', 'compress-image', 'resize-image', 'batch-image-converter'];
  const popularTools = featuredSlugs.map((slug) => TOOLS[slug]).filter(Boolean);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Homepage Hero */}
      <section className="max-w-[820px] mx-auto text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200">
          FAST &bull; PRIVATE &bull; FREE
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Fast, free image tools. <br className="hidden sm:inline" />
          <span className="text-blue-600">Processed locally.</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Convert, compress, and resize images directly in your browser. <br className="hidden sm:inline" />
          No signup. Your files stay on your device.
        </p>

        {/* Primary CTA / Immediate Upload Action in Initial Viewport */}
        <div className="pt-2">
          <QuickConverterBridge />
        </div>

        {/* Secondary Text */}
        <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase pt-1">
          JPG &bull; PNG &bull; WebP &bull; AVIF &bull; HEIC
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap justify-center items-center gap-6 pt-2 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Local processing</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>No signup</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>No unnecessary uploads</span>
          </div>
        </div>
      </section>

      {/* Popular Image Tools Grid */}
      <section className="max-w-[820px] mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900">
            Popular image tools
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/${tool.slug}`}
              className="group bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-5 transition-all shadow-xs hover:shadow-sm flex items-start justify-between"
            >
              <div className="space-y-1.5 pr-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                    {tool.outputFormat.toUpperCase()}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="text-slate-400 group-hover:text-blue-600 transition-colors pt-1">
                &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Use PixelLocal Section */}
      <section className="max-w-[820px] mx-auto card-base space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Why use PixelLocal?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Fast</h3>
            <p>Hardware-accelerated browser processing. No network upload delays or queue wait times.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Privacy-first</h3>
            <p>Your files aren&apos;t uploaded to PixelLocal servers for normal processing. Everything stays local.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">No signup</h3>
            <p>Free to use without creating accounts, subscriptions, or entering credit card details.</p>
          </div>
        </div>
      </section>

      <AdSlot position="result" />
    </div>
  );
}
