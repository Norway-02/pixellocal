import Link from 'next/link';
import { TOOLS } from '../lib/toolsConfig';
import ScrollReveal from './ScrollReveal';

export default function RelatedTools({ relatedSlugs }: { relatedSlugs: string[] }) {
  // Show max 4 relevant tools
  const tools = relatedSlugs.slice(0, 4).map((slug) => TOOLS[slug]).filter(Boolean);

  if (tools.length === 0) return null;

  return (
    <ScrollReveal delay={120} className="my-8 space-y-4">
      <h2 className="text-base font-bold text-slate-900">
        You might also need
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${tool.slug}`}
            className="group card-base card-interactive !p-4 flex items-center justify-between"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors duration-200">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">
                {tool.shortDescription}
              </p>
            </div>
            <div className="text-xs font-bold text-blue-600 pl-2 shrink-0 group-hover:translate-x-1 transition-transform duration-200">
              &rarr;
            </div>
          </Link>
        ))}
      </div>
    </ScrollReveal>
  );
}
