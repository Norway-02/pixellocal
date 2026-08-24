'use client';

import React from 'react';
import { ToolConfig, getSiteUrl } from '../lib/toolsConfig';
import Breadcrumbs from './Breadcrumbs';
import PrivacyNotice from './PrivacyNotice';
import AdSlot from './AdSlot';
import FAQSection from './FAQSection';
import RelatedTools from './RelatedTools';
import ScrollReveal from './ScrollReveal';

export interface ToolLayoutProps {
  tool: ToolConfig;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${tool.slug}`;

  // Structured Data (JSON-LD)
  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': tool.title,
    'description': tool.seoDescription,
    'url': canonicalUrl,
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript. Requires HTML5 Canvas.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />

      <div className="max-w-[780px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="animate-hero-badge">
          <Breadcrumbs items={[{ label: tool.title }]} />
        </div>

        <div className="space-y-2 animate-hero-headline">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {tool.title}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            {tool.shortDescription}
          </p>

          <PrivacyNotice />
        </div>

        {/* Interactive Tool Dropzone & Action Area - Immediately Interactive */}
        <div className="my-4 animate-hero-cta">
          {children}
        </div>

        <AdSlot position="result" />

        {/* How To Use Section */}
        {tool.howItWorks && tool.howItWorks.length > 0 && (
          <ScrollReveal delay={80}>
            <section className="card-base my-8 space-y-3">
              <h2 className="text-base font-bold text-slate-900">
                How to use {tool.title}
              </h2>
              <ol className="space-y-2.5">
                {tool.howItWorks.map((step, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center mr-3 shrink-0 mt-0.5 border border-slate-200">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </ScrollReveal>
        )}

        <RelatedTools relatedSlugs={tool.relatedToolSlugs} />

        <FAQSection items={tool.faq} />
      </div>
    </>
  );
}
