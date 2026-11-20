import Image from 'next/image';
import { approach } from '@/lib/content';
import { photos } from '@/lib/photos';
import { delay } from '../ui/motion';

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="section">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          <span className="tabular-nums">01</span>
          <span aria-hidden className="opacity-40">
            /
          </span>
          <span>{approach.eyebrow}</span>
        </p>

        <h2
          id="approach-title"
          className="display-lg mt-8 max-w-[22ch] text-balance"
          data-reveal
          style={delay(80)}
        >
          {approach.statement} <span className="accent">{approach.statementAccent}</span>
        </h2>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <figure className="group relative overflow-hidden lg:col-span-5" data-reveal="fade">
            <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
              <Image
                src={photos.standing}
                alt={approach.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="photo object-cover object-[50%_55%]"
              />
            </div>
          </figure>

          <div className="flex flex-col justify-between lg:col-span-6 lg:col-start-7">
            <p className="lede max-w-xl" data-reveal>
              {approach.body}
            </p>

            <ol className="mt-12 grid border-t border-white/10 sm:grid-cols-2 lg:mt-16">
              {approach.pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className={`border-b border-white/10 py-8 sm:py-10 ${
                    i % 2 === 0 ? 'sm:pr-8 sm:border-r' : 'sm:pl-8'
                  }`}
                  data-reveal
                  style={delay(i * 90)}
                >
                  <span className="label tabular-nums text-white/40">0{i + 1}</span>
                  <h3 className="mt-5 text-xl font-normal tracking-[-0.01em] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">{pillar.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
