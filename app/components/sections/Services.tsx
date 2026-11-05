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
          {services.map((service) => (
            <Card key={service.title} className="p-6 sm:p-8 flex flex-col">
              <div className="mb-4">
                <span className="inline-block text-xs font-medium tracking-wider uppercase text-[var(--color-muted)] mb-2">
                  {service.location}
                </span>
                <h3 className="text-2xl font-light text-[var(--color-charcoal)] mb-2">
                  {service.title}
                </h3>
                <ul className="mt-3 divide-y divide-black/8">
                  {service.tiers.map((tier) => (
                    <li key={tier.name} className="flex items-baseline justify-between gap-4 py-1.5">
                      <span className="font-light text-[var(--color-charcoal)]">{tier.name}</span>
                      <span className="text-lg font-medium text-[var(--color-charcoal)] whitespace-nowrap">
                        {tier.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-medium tracking-wide uppercase text-[var(--color-taupe)]">
                  {service.minimum}
                </p>
              </div>
              <p className="text-[var(--color-muted)] font-light leading-relaxed flex-1 mb-4">
                {service.description}
              </p>
              <p className="text-sm text-[var(--color-muted)] font-light mb-6">
                {service.note}
              </p>
              <Button href={service.applyHref} className="w-full sm:w-auto">
                {service.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
