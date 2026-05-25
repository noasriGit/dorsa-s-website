import { trustIntro } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';

export default function TrustIntro() {
  return (
    <section className="section-padding bg-[var(--color-cream)]">
      <div className="section-container">
        <SectionHeading title={trustIntro.title} subtitle={trustIntro.body} />
      </div>
    </section>
  );
}
