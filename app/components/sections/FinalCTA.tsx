import { finalCta } from '@/lib/content';
import Button from '../ui/Button';

export default function FinalCTA() {
  return (
    <section className="section-padding bg-[var(--color-beige)]">
      <div className="section-container max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[var(--color-charcoal)] mb-4">
          {finalCta.title}
        </h2>
        <p className="text-base sm:text-lg text-[var(--color-muted)] font-light leading-relaxed mb-8">
          {finalCta.body}
        </p>
        <Button href="/#apply">{finalCta.cta}</Button>
      </div>
    </section>
  );
}
