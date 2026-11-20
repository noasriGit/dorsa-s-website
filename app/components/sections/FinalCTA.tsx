import Image from 'next/image';
import { finalCta } from '@/lib/content';
import { photos } from '@/lib/photos';
import Button from '../ui/Button';
import { delay } from '../ui/motion';

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-white/10 bg-ink [container-type:inline-size]">
      <div className="grid md:grid-cols-12">
        <div className="relative flex flex-col justify-center px-[var(--gutter)] py-24 sm:py-32 md:col-span-7 lg:py-40 lg:pl-[calc(max(0px,(100cqw-90rem)/2)+var(--gutter))]">
          <p className="eyebrow" data-reveal>
            {finalCta.eyebrow}
          </p>
          <h2 id="cta-title" className="display-xl mt-8 max-w-[12ch] text-balance" data-reveal style={delay(80)}>
            {finalCta.title} <span className="accent">{finalCta.titleAccent}</span>
          </h2>
          <p className="lede mt-8 max-w-lg" data-reveal style={delay(160)}>
            {finalCta.body}
          </p>
          <div className="mt-11" data-reveal style={delay(240)}>
            <Button href="/#apply" arrow>
              {finalCta.cta}
            </Button>
          </div>
        </div>

        {/* 3:4 on phones; beside the text from tablet up, at least 4:5 tall (52cqw) so wide
            screens don't crop her head and feet. */}
        <figure className="group relative aspect-[3/4] overflow-hidden md:col-span-5 md:aspect-auto md:min-h-[52cqw]" data-reveal="fade">
          <Image
            src={photos.step}
            alt={finalCta.imageAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="photo object-cover object-[50%_50%]"
          />
        </figure>
      </div>
    </section>
  );
}
