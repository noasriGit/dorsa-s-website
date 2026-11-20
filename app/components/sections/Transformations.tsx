'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { transformations } from '@/lib/content';
import SectionHeader from '../ui/SectionHeader';
import { delay } from '../ui/motion';

const images = transformations.images;

export default function Transformations() {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, step]);

  // Basic swipe support inside the lightbox.
  const touchX = useRef<number | null>(null);

  return (
    <section id="transformations" aria-labelledby="results-title" className="section">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow={transformations.eyebrow}
          title={
            <span id="results-title">
              {transformations.title}{' '}
              <span className="accent">{transformations.titleAccent}</span>
            </span>
          }
          intro={transformations.body}
          split
        />

        <ul className="mt-16 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-24 lg:grid-cols-3 lg:gap-4">
          {images.map((img, i) => (
            <li key={img.src} data-reveal style={delay((i % 3) * 90)}>
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                className="group relative block aspect-square w-full overflow-hidden bg-ink-3"
                aria-label={`View ${img.alt.toLowerCase()} in full screen`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="photo object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10"
                />
                <span className="label absolute bottom-3 left-3 flex items-center gap-2 bg-ink/85 px-3 py-2 text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-4 sm:left-4">
                  View <span className="tabular-nums text-white/45">0{i + 1}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${images[index].alt}, ${index + 1} of ${images.length}`}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="shell flex h-[calc(var(--nav-h)+env(safe-area-inset-top,0px))] shrink-0 items-center justify-between pt-[env(safe-area-inset-top,0px)]">
            <p className="label tabular-nums text-white/60">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="label -mr-3 flex h-11 items-center gap-3 px-3 text-white/80 hover:text-white"
            >
              Close
              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-4 pb-6 sm:px-20">
            <div className="relative mx-auto h-full max-w-4xl">
              <Image
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="step-in object-contain"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white sm:flex lg:left-8"
              aria-label="Previous transformation"
            >
              <svg viewBox="0 0 20 10" className="h-2.5 w-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M0 5h18.5M14.5 1l4 4-4 4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white sm:flex lg:right-8"
              aria-label="Next transformation"
            >
              <svg viewBox="0 0 20 10" className="h-2.5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M0 5h18.5M14.5 1l4 4-4 4" />
              </svg>
            </button>
          </div>
          <p className="label pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] text-center text-white/40 sm:hidden">
            Swipe to browse
          </p>
        </div>
      )}
    </section>
  );
}
