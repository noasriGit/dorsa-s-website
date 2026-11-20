import { pricing, services } from '@/lib/content';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';
import { delay } from '../ui/motion';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section border-t border-white/10 bg-ink-2">
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow={pricing.eyebrow}
          title={
            <span id="services-title">
              {pricing.title} <span className="accent">{pricing.titleAccent}</span>
            </span>
          }
          intro={pricing.intro}
          split
        />

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8">
          {services.map((service, i) => (
            <article
              key={service.id}
              aria-labelledby={`${service.id}-title`}
              className="flex flex-col border border-white/12 bg-ink p-6 sm:p-10 xl:p-12"
              data-reveal
              style={delay(i * 120)}
            >
              <header className="flex items-start justify-between gap-6">
                <div>
                  <p className="label text-white/45">{service.location}</p>
                  <h3
                    id={`${service.id}-title`}
                    className="display-md mt-4 text-white"
                  >
                    {service.title}
                  </h3>
                </div>
                <span className="label tabular-nums text-white/35">0{i + 1}</span>
              </header>

              <ul className="mt-10 border-t border-white/12">
                {service.tiers.map((tier) => (
                  <li
                    key={tier.name}
                    className="flex items-end justify-between gap-6 border-b border-white/12 py-5 sm:py-6"
                  >
                    <div className="min-w-0">
                      <p className="text-[1.05rem] text-white sm:text-lg">{tier.name}</p>
                      <p className="mt-1 text-sm text-white/45">{tier.detail}</p>
                    </div>
                    <p className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
                      <span className="text-[2rem] font-light leading-none tracking-[-0.04em] text-white sm:text-[2.6rem]">
                        {tier.price}
                      </span>
                      <span className="text-[0.8rem] text-white/45">{tier.unit}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <p className="label mt-7 inline-flex items-center gap-3 text-white/80">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-white" />
                {service.minimum}
              </p>

              <p className="body-copy mt-7">{service.description}</p>
              <p className="mt-5 text-sm leading-relaxed text-white/40">{service.note}</p>

              <div className="mt-auto pt-9">
                <Button href={service.applyHref} arrow className="w-full sm:w-auto">
                  {service.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
