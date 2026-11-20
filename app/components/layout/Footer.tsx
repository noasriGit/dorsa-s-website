import Link from 'next/link';
import { navLinks, services, site } from '@/lib/content';
import { Logo } from '../brand/Logo';
import { Arrow } from '../ui/Button';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div className="shell pb-10 pt-20 sm:pt-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo className="h-auto w-[min(100%,22rem)] text-white" />
            <p className="body-copy mt-8 max-w-sm">{site.tagline}, in person in {site.location} and live virtual 1:1.</p>
            <Link
              href="/#apply"
              className="group/link label mt-8 inline-flex items-center gap-4 text-white transition-opacity hover:opacity-80"
            >
              Apply for coaching
              <Arrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="label text-white/40">Explore</p>
              <ul className="mt-6 space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.95rem] text-white/75 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/#apply" className="text-[0.95rem] text-white/75 transition-colors hover:text-white">
                    Apply
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="label text-white/40">Train</p>
              <ul className="mt-6 space-y-5">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={s.applyHref} className="group block">
                      <span className="block text-[0.95rem] text-white/75 transition-colors group-hover:text-white">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-sm text-white/40">{s.location}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-white/40">Connect</p>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-[0.95rem] text-white/75 transition-colors hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                    Instagram
                  </a>
                </li>
                <li className="text-sm text-white/40">{site.instagramHandle}</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {site.name}. All rights reserved.
          </p>
          <a
            href={site.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/70"
          >
            Created by {site.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
