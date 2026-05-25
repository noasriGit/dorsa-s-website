import { services } from '@/lib/content';
import Button from '../ui/Button';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function Services() {
  return (
    <section id="services" className="section-padding bg-[var(--color-beige)]">
      <div className="section-container">
        <SectionHeading
          title="Services"
          subtitle="Two paths, one goal, personalized coaching that fits your life."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <Card className="p-6 sm:p-8 flex flex-col">
            <div className="mb-4">
              <span className="inline-block text-xs font-medium tracking-wider uppercase text-[var(--color-muted)] mb-2">
                {services.inPerson.location}
              </span>
              <h3 className="text-2xl font-light text-[var(--color-charcoal)] mb-2">
                {services.inPerson.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)]">
                {services.inPerson.price}
              </p>
            </div>
            <p className="text-[var(--color-muted)] font-light leading-relaxed flex-1 mb-4">
              {services.inPerson.description}
            </p>
            <p className="text-sm text-[var(--color-muted)] font-light mb-6">
              {services.inPerson.note}
            </p>
            <Button href={services.inPerson.applyHref} className="w-full sm:w-auto">
              {services.inPerson.cta}
            </Button>
          </Card>

          <Card className="p-6 sm:p-8 flex flex-col">
            <div className="mb-4">
              <span className="inline-block text-xs font-medium tracking-wider uppercase text-[var(--color-muted)] mb-2">
                Remote · Flexible
              </span>
              <h3 className="text-2xl font-light text-[var(--color-charcoal)] mb-2">
                {services.online.title}
              </h3>
            </div>
            <p className="text-[var(--color-muted)] font-light leading-relaxed flex-1 mb-4">
              {services.online.description}
            </p>
            <p className="text-sm text-[var(--color-charcoal)] font-light mb-1">
              {services.online.pricingNote}
            </p>
            <p className="text-sm text-[var(--color-muted)] font-light mb-6">
              {services.online.pricingSubnote}
            </p>
            <Button href={services.online.applyHref} className="w-full sm:w-auto">
              {services.online.cta}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
