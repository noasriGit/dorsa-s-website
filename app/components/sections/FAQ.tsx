'use client';

import { useId, useState } from 'react';
import { faq, site } from '@/lib/content';
import { Arrow } from '../ui/Button';
import { delay } from '../ui/motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <p className="eyebrow" data-reveal>
              <span className="tabular-nums">08</span>
              <span aria-hidden className="opacity-40">
                /
              </span>
              <span>{faq.eyebrow}</span>
            </p>
            <h2 id="faq-title" className="display-lg mt-7" data-reveal style={delay(80)}>
              {faq.title} <span className="accent">{faq.titleAccent}</span>
            </h2>
            <p className="body-copy mt-8 max-w-xs" data-reveal style={delay(140)}>
              Still have a question? Send Dorsa a message on Instagram.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link label mt-6 inline-flex items-center gap-4 text-white/75 transition-colors hover:text-white"
              data-reveal
              style={delay(180)}
            >
              {site.instagramHandle}
              <Arrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-white/12">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              const btnId = `${baseId}-q${index}`;
              const panelId = `${baseId}-a${index}`;
              return (
                <li key={item.question} className="border-b border-white/12" data-reveal style={delay(index * 70)}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-start justify-between gap-8 py-7 text-left sm:py-8"
                    >
                      <span className="flex gap-5 sm:gap-8">
                        <span className="label tabular-nums pt-2 text-white/35">0{index + 1}</span>
                        <span
                          className={`text-[1.15rem] leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[1.4rem] ${
                            isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
                          }`}
                        >
                          {item.question}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="relative mt-2 h-4 w-4 shrink-0 text-white/70 transition-colors group-hover:text-white"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                        <span
                          className={`absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                            isOpen ? 'scale-y-0' : 'scale-y-100'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                      <div className="space-y-4 pb-8 pl-[calc(0.6875rem*2+1.25rem)] pr-8 sm:pl-[calc(0.6875rem*2+2rem)]">
                        {item.paragraphs.map((p) => (
                          <p key={p.slice(0, 24)} className="body-copy">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
