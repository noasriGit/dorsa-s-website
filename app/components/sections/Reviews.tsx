import { reviews } from '@/lib/content';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-[var(--color-taupe)] fill-current"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section-padding bg-[var(--color-cream)]">
      <div className="section-container">
        <SectionHeading title={reviews.title} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.items.map((review) => (
            <Card key={review.author} className="p-6 flex flex-col">
              <Stars count={review.rating} />
              <blockquote className="flex-1 text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed italic mb-4">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <p className="text-sm text-[var(--color-charcoal)] font-medium">
                {review.author}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
