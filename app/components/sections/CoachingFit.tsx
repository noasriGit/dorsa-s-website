import Image from 'next/image';
import { coachingFit } from '@/lib/content';
import { photos } from '@/lib/photos';
import Button from '../ui/Button';
import { delay } from '../ui/motion';

export default function CoachingFit() {
  return (
    <section id="coaching-fit" aria-labelledby="fit-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:pr-8">
          <p className="eyebrow" data-reveal>
            <span className="tabular-nums">06</span>
            <span aria-hidden className="opacity-40">
              /
            </span>
            <span>{coachingFit.eyebrow}</span>
          </p>
          <h2 id="fit-title" className="display-lg mt-7 text-balance" data-reveal style={delay(80)}>
            {coachingFit.title}
          </h2>

          <ol className="mt-12 border-t border-white/10 lg:mt-16">
            {coachingFit.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-2 border-b border-white/10 py-6 sm:grid-cols-[4.5rem_1fr] sm:py-7"
                data-reveal
                style={delay(i * 70)}
              >
                <span className="label tabular-nums text-white/35 transition-colors duration-300 group-hover:text-white">
                  0{i + 1}
                </span>
                <span className="display-sm text-white/90">{bullet}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12" data-reveal>
            <Button href="/#apply" arrow>
              {coachingFit.cta}
            </Button>
          </div>
        </div>

        <figure className="group relative lg:col-span-5" data-reveal="fade">
          {/* Desktop: sticky and screen-height based; width capped at 3:4 so short windows don't crop her feet. */}
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-3 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:ml-auto lg:aspect-auto lg:h-[min(46rem,calc(100svh-var(--nav-h)-4rem))] lg:w-[min(100%,calc(min(46rem,calc(100svh-var(--nav-h)-4rem))*0.75))]">
            <Image
              src={photos.energy}
              alt={coachingFit.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="photo object-cover object-[50%_30%]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
