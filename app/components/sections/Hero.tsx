import Image from 'next/image';
import { hero } from '@/lib/content';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-svh flex items-center bg-[var(--color-charcoal)] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/heroimage.JPG"
          alt="Dorsa Wellness personal training"
          fill
          className="object-cover object-[center_20%] opacity-60 lg:opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/90 via-[var(--color-charcoal)]/70 to-[var(--color-charcoal)]/40" />
      </div>

      <div className="section-container relative z-10 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <p className="text-[var(--color-taupe)] text-sm sm:text-base font-medium tracking-widest uppercase mb-4">
              Dorsa Wellness
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight mb-5 sm:mb-6">
              {hero.headline}
            </h1>
            <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed mb-7 sm:mb-8">
              {hero.subheadline}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/#apply" className="w-full sm:w-auto justify-center">
                {hero.primaryCta}
              </Button>
              <Button href="/#transformations" variant="secondary" className="w-full sm:w-auto justify-center">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative aspect-[4/5] max-w-md ml-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/images/desktopHero.jpg"
              alt="Dorsa, personal trainer"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 0vw, 400px"
              priority
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 pb-[env(safe-area-inset-bottom,0px)]">
        <a
          href="#trust-intro"
          className="scroll-hint flex flex-col items-center gap-2 text-white hover:text-white transition-colors"
          aria-label="Scroll to continue"
        >
          <span className="text-xs sm:text-sm font-light tracking-wide opacity-50">
            Scroll to Continue
          </span>
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
