import Link from 'next/link';
import { reviews } from '@/lib/content';
import { Arrow } from '../ui/Button';
import { delay } from '../ui/motion';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="on-paper section bg-paper text-ink">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow" data-reveal>
              <span className="tabular-nums">05</span>
              <span aria-hidden className="opacity-40">
                /
              </span>
              <span>{reviews.eyebrow}</span>
            </p>
            <h2 id="reviews-title" className="display-lg mt-7" data-reveal style={delay(80)}>
              {reviews.title} <span className="accent">{reviews.titleAccent}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end" data-reveal style={delay(160)}>
            <Link
              href="/#apply"
              className="group/link label inline-flex items-center gap-4 text-ink/70 transition-colors hover:text-ink"
            >
              Start your own story
              <Arrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable row. Desktop: three columns. */}
      <div className="scroll-row mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 lg:hidden">
        {reviews.items.map((review) => (
          <ReviewCard key={review.author} review={review} className="w-[86%] shrink-0 snap-center sm:w-[60%]" />
        ))}
      </div>
      <div className="shell mt-20 hidden gap-6 lg:grid lg:grid-cols-3 xl:gap-8">
        {reviews.items.map((review, i) => (
          <div key={review.author} data-reveal style={delay(i * 120)}>
            <ReviewCard review={review} className="h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  className = '',
}: {
  review: (typeof reviews.items)[number];
  className?: string;
}) {
  return (
    <figure className={`flex flex-col border border-ink/12 bg-white p-7 sm:p-9 ${className}`}>
      <Stars count={review.rating} />
      <blockquote className="mt-7 flex flex-1 flex-col">
        <p className="font-serif text-[1.65rem] italic leading-[1.2] tracking-[-0.01em] text-ink sm:text-[1.85rem]">
          &ldquo;{review.highlight}&rdquo;
        </p>
        <p className="mt-6 text-[0.92rem] leading-[1.75] text-ink/65">{review.quote}</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
        <span aria-hidden className="h-px w-6 bg-ink" />
        <span className="label text-ink">{review.author}</span>
      </figcaption>
    </figure>
  );
}
