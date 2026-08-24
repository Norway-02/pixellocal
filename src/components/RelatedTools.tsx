import Link from 'next/link';
import { TOOLS } from '../lib/toolsConfig';

export default function RelatedTools({ relatedSlugs }: { relatedSlugs: string[] }) {
  // Show max 4 relevant tools
  const tools = relatedSlugs.slice(0, 4).map((slug) => TOOLS[slug]).filter(Boolean);

  if (tools.length === 0) return null;

  return (
    <section className="my-8 space-y-4">
      <h2 className="text-base font-bold text-slate-900">
        You might also need
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${tool.slug}`}
            className="group bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-4 transition-all shadow-xs hover:shadow-xs flex items-center justify-between"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">
                {tool.shortDescription}
              </p>
            </div>
            <div className="text-xs font-bold text-blue-600 pl-2 shrink-0 group-hover:translate-x-0.5 transition-transform">
              &rarr;
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
