'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { reviews } from '@/lib/content';
import Stars from '../ui/Stars';

type Review = (typeof reviews.items)[number];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Phones and tablets: a swipeable row of compact review cards. Each card shows the
 * highlight and a short preview, with "Read more" opening the full review in place.
 * The bars underneath show which card is in view and jump between cards.
 */
export default function ReviewCarousel({ items }: { items: readonly Review[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The card closest to the middle of the row counts as the one in view.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = row.scrollLeft + row.clientWidth / 2;
        let closest = 0;
        let closestDistance = Infinity;
        Array.from(row.children).forEach((child, i) => {
          const card = child as HTMLElement;
          const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    row.addEventListener('scroll', update, { passive: true });
    return () => {
      row.removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const row = rowRef.current;
    const card = row?.children[index] as HTMLElement | undefined;
    if (!row || !card) return;
    row.scrollTo({
      left: card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="mt-14 lg:hidden">
      {/* items-start: each card keeps its own height, so opening one doesn't stretch the others. */}
      <div
        ref={rowRef}
        className="scroll-row relative flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-[var(--gutter)] pb-2"
      >
        {items.map((review) => (
          <CompactReviewCard key={review.author} review={review} />
        ))}
      </div>

      <div className="mt-5 flex items-center px-[var(--gutter)]">
        {items.map((review, i) => (
          <button
            key={review.author}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show review ${i + 1} of ${items.length}`}
            aria-current={i === active ? 'true' : undefined}
            className="group flex py-3 pr-2"
          >
            <span
              aria-hidden
              className={`block h-[2px] transition-[width,background-color] duration-300 ${
                i === active ? 'w-8 bg-ink' : 'w-4 bg-ink/25 group-hover:bg-ink/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function CompactReviewCard({ review }: { review: Review }) {
  const textId = useId();
  const cardRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(true);

  // Only offer "Read more" when the preview actually cuts the review short.
  useEffect(() => {
    const text = textRef.current;
    if (!text || open) return;
    const check = () => setOverflows(text.scrollHeight > text.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(text);
    return () => observer.disconnect();
  }, [open]);

  const toggle = () => {
    const closing = open;
    setOpen(!open);
    // After "Show less", bring the card back into view rather than leaving the reader below it.
    if (closing) {
      requestAnimationFrame(() =>
        cardRef.current?.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
      );
    }
  };

  return (
    <figure
      ref={cardRef}
      className="flex w-[86%] shrink-0 snap-center scroll-mt-[calc(var(--nav-h)+1rem)] flex-col border border-ink/12 bg-white p-6 sm:w-[60%] sm:p-8"
    >
      <Stars count={review.rating} />
      <blockquote className="mt-5">
        {/* At least three lines tall, so short highlights don't leave cards uneven. */}
        <p className="min-h-[3.66em] font-serif text-[1.4rem] italic leading-[1.22] tracking-[-0.01em] text-ink sm:text-[1.65rem]">
          &ldquo;{review.highlight}&rdquo;
        </p>
        <p
          id={textId}
          ref={textRef}
          className={`mt-4 text-[0.92rem] leading-[1.7] text-ink/65 ${open ? '' : 'review-clamp'}`}
        >
          {review.quote}
        </p>
      </blockquote>

      {(overflows || open) && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={textId}
          onClick={toggle}
          className="label mt-2 inline-flex items-center gap-2.5 self-start py-2 text-ink"
        >
          {open ? 'Show less' : 'Read more'}
          <svg
            viewBox="0 0 12 12"
            className={`h-2.5 w-2.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden
          >
            <path d="M2 4.5l4 4 4-4" />
          </svg>
        </button>
      )}

      <figcaption className="mt-4 flex items-center gap-4 border-t border-ink/10 pt-5">
        <span aria-hidden className="h-px w-6 bg-ink" />
        <span className="label text-ink">{review.author}</span>
      </figcaption>
    </figure>
  );
}
