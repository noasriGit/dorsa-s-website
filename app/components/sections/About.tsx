import Image from 'next/image';
import { about, site } from '@/lib/content';
import { photos } from '@/lib/photos';
import { Mark } from '../brand/Logo';
import { Arrow } from '../ui/Button';
import { delay } from '../ui/motion';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative overflow-hidden border-t border-white/10">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Photography */}
        <div className="relative lg:col-span-6 lg:pr-10">
          <figure className="group relative overflow-hidden" data-reveal="fade">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-3">
              <Image
                src={photos.handOnHip}
                alt={about.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="photo object-cover object-[50%_50%]"
              />
            </div>
          </figure>
          <figure
            className="group absolute -bottom-10 right-0 w-[42%] overflow-hidden border-[6px] border-ink sm:-bottom-12 lg:-right-4 lg:w-[40%]"
            data-reveal
            style={delay(200)}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
              <Image
                src={photos.portrait}
                alt={about.insetAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="photo object-cover object-[50%_30%]"
              />
            </div>
          </figure>
        </div>

        {/* Story */}
        <div className="flex flex-col justify-center pt-6 lg:col-span-6 lg:pt-0">
          <p className="eyebrow" data-reveal>
            <span className="tabular-nums">04</span>
            <span aria-hidden className="opacity-40">
              /
            </span>
            <span>{about.eyebrow}</span>
          </p>
          <h2 id="about-title" className="display-lg mt-7" data-reveal style={delay(80)}>
            {about.title} <span className="accent">{about.titleAccent}</span>
          </h2>

          <blockquote
            className="mt-10 border-l border-white/25 pl-6 font-serif text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] italic leading-[1.25] text-white/90"
            data-reveal
            style={delay(140)}
          >
            &ldquo;{about.quote}&rdquo;
          </blockquote>

          <div className="mt-10 space-y-5" data-reveal style={delay(200)}>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="body-copy">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-12 border-t border-white/10" data-reveal style={delay(260)}>
            {about.credentials.map((cred) => (
              <li
                key={cred}
                className="flex items-center gap-4 border-b border-white/10 py-5 text-white/85"
              >
                <Mark className="h-2.5 w-2.5 shrink-0 text-white/60" />
                <span className="text-[0.95rem]">{cred}</span>
              </li>
            ))}
          </ul>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link label mt-10 inline-flex items-center gap-4 self-start text-white/75 transition-colors hover:text-white"
            data-reveal
            style={delay(300)}
          >
            Follow along {site.instagramHandle}
            <Arrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
