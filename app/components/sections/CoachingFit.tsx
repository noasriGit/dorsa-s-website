import { coachingFit } from '@/lib/content';
import Button from '../ui/Button';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function CoachingFit() {
  return (
    <section id="coaching-fit" className="section-padding bg-[var(--color-beige)]">
      <div className="section-container max-w-3xl">
        <SectionHeading title={coachingFit.title} />

        <Card className="p-6 sm:p-8 mb-8">
          <ul className="space-y-4">
            {coachingFit.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[var(--color-muted)] font-light">
                <span
                  className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-taupe)]/25 flex items-center justify-center text-[var(--color-charcoal)] text-sm mt-0.5"
                  aria-hidden
                >
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </Card>

        <div className="text-center">
          <Button href="/#apply">{coachingFit.cta}</Button>
        </div>
      </div>
    </section>
  );
}
