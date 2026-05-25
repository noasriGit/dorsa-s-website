'use client';

import { useState } from 'react';
import { faq } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-[var(--color-cream)]">
      <div className="section-container max-w-3xl">
        <SectionHeading title={faq.title} />

        <div className="space-y-3">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl bg-white border border-black/8 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-black/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-light text-[var(--color-charcoal)] leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 text-[var(--color-taupe)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 pt-0 border-t border-black/5">
                      <div className="pt-4 space-y-3">
                        {item.paragraphs.map((p, pi) => (
                          <p
                            key={pi}
                            className="text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
