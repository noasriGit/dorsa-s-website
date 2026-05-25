'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { transformations } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';

export default function Transformations() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxSrc, closeLightbox]);

  return (
    <section id="transformations" className="section-padding bg-[var(--color-cream)]">
      <div className="section-container">
        <SectionHeading
          title={transformations.title}
          subtitle={`${transformations.subtitle} ${transformations.body}`}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {transformations.images.map((img) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightboxSrc(img.src)}
              className="relative aspect-[3/4] rounded-xl overflow-hidden border border-black/8 shadow-sm hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-taupe)]"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Transformation image"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/90 hover:text-white p-2 rounded-full bg-black/40"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-3xl aspect-[3/4] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Client transformation"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
