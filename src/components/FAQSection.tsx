import React from 'react';
import { FAQItem } from '../lib/toolsConfig';

export default function FAQSection({ items }: { items: FAQItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="my-10 space-y-4">
      <h2 className="text-lg font-bold text-slate-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group bg-white border border-slate-200 rounded-xl p-4 transition-colors [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-slate-900 text-sm">
              <span>{item.question}</span>
              <span className="ml-4 transition-transform group-open:rotate-180 text-slate-400 group-open:text-blue-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
