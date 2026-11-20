import Image from 'next/image';
import { hero } from '@/lib/content';
import { photos } from '@/lib/photos';
import Button from '../ui/Button';
import { introDelay } from '../ui/motion';

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))] [container-type:inline-size]"
    >
      <div className="lg:grid lg:min-h-[max(42rem,calc(100svh-var(--nav-h)))] lg:grid-cols-12">
        {/* Portrait. Below desktop the frame is sized by its shape (4:5 phones, square
            tablets) and capped by the screen height; on desktop it's never taller than
            2:3 of its width (62.5cqw). Either way the whole pose always fits. */}
        <div className="intro-photo relative mx-auto aspect-[4/5] w-[min(100%,calc((100svh-var(--nav-h))*0.8))] overflow-hidden sm:aspect-square sm:w-[min(100%,calc((100svh-var(--nav-h))*0.85))] lg:order-2 lg:col-span-5 lg:mx-0 lg:aspect-auto lg:max-h-[62.5cqw] lg:w-auto">
          <Image
            src={photos.lunge}
            alt={hero.imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[50%_85%] sm:object-[50%_70%]"
          />
          {/* Phones: short fade so only the floor (not Dorsa) blends into the black below. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink via-ink/50 to-transparent sm:hidden"
          />
        </div>

        {/* Copy */}
        <div className="relative z-10 flex flex-col lg:order-1 lg:col-span-7">
          <div className="-mt-10 flex flex-1 flex-col justify-center px-[var(--gutter)] pb-14 sm:mt-0 lg:py-20 lg:pl-[calc(max(0px,(100cqw-90rem)/2)+var(--gutter))] lg:pr-14 xl:pr-24">
            {/* Desktop only: on phones the photo stays clear of text (location is in the row below). */}
            <p className="eyebrow intro-rise hidden lg:inline-flex" style={introDelay(150)}>
              {hero.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="display-xl mt-7 max-w-[13ch] text-balance lg:mt-9"
            >
              <span className="intro-rise block" style={introDelay(260)}>
                {hero.headline}
              </span>
              <span className="intro-rise accent mt-1 block" style={introDelay(380)}>
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              className="lede intro-rise mt-7 max-w-[34rem] lg:mt-9"
              style={introDelay(520)}
            >
              {hero.subheadline}
            </p>

            <div
              className="intro-rise mt-9 flex flex-col gap-3 sm:flex-row lg:mt-11"
              style={introDelay(640)}
            >
              <Button href="/#apply" arrow>
                {hero.primaryCta}
              </Button>
              <Button href="/#services" variant="outline">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <dl
            className="intro-rise grid grid-cols-3 border-t border-white/10 lg:pl-[calc(max(0px,(100cqw-90rem)/2)+var(--gutter))]"
            style={introDelay(780)}
          >
            {hero.highlights.map((item, i) => (
              <div
                key={item.label}
                className={`px-[var(--gutter)] py-6 lg:py-8 ${i > 0 ? 'border-l border-white/10' : ''} ${
                  i === 0 ? 'lg:pl-0' : 'lg:px-8'
                } max-sm:px-4 max-sm:first:pl-[var(--gutter)]`}
              >
                <dt className="label text-white/45">{item.label}</dt>
                <dd className="mt-2.5 text-[0.85rem] leading-snug text-white/85 sm:text-[0.95rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
