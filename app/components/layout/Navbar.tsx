'use client';

import Link from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';
import { navLinks, site } from '@/lib/content';
import { Logo } from '../brand/Logo';
import Button from '../ui/Button';

const sectionIds = navLinks.map((l) => l.href.split('#')[1]);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Solid → glass once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((prev) => (prev === id ? null : prev));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll + close on Escape / desktop resize while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const glass = scrolled || open;

  // The logo links to "/". On the home page that's the page you're already on, so
  // Next doesn't scroll, and the logo only worked after a menu link had added a
  // #section to the address. Scroll to the top ourselves (smooth unless reduced
  // motion is on) and clear any #section. Cmd/Ctrl/Shift-clicks still open normally.
  const goToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (
      window.location.pathname !== '/' ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
    // Next frame: closing the mobile menu has restored page scrolling by then.
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <div
        className={`absolute inset-0 -z-10 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          glass
            ? 'bg-ink/80 backdrop-blur-xl border-white/10'
            : 'bg-ink border-transparent'
        }`}
        aria-hidden
      />
      <nav aria-label="Main" className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="-m-2 p-2 text-white"
          onClick={goToTop}
        >
          <Logo title="" className="h-[30px] w-auto lg:h-[36px]" />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.split('#')[1];
            const isActive = active === id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Button href="/#apply" size="sm" className="max-[359px]:hidden" onClick={() => setOpen(false)}>
            Apply Now
          </Button>
          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              aria-hidden
              className={`absolute h-px w-6 bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                open ? 'rotate-45' : '-translate-y-[4px]'
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-px w-6 bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                open ? '-rotate-45' : 'translate-y-[4px]'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[calc(var(--nav-h)+env(safe-area-inset-top,0px))] bg-ink transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="shell flex h-full flex-col justify-between overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-8">
          <ul className="border-t border-white/10">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={`border-b border-white/10 transition-all duration-700 ease-[var(--ease-out-expo)] ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 text-white"
                >
                  <span className="text-[2rem] font-light leading-none tracking-[-0.03em]">
                    {link.label}
                  </span>
                  <span className="label tabular-nums text-white/40">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`mt-10 space-y-6 transition-all duration-700 ease-[var(--ease-out-expo)] ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '360ms' : '0ms' }}
          >
            <Button href="/#apply" arrow className="w-full" onClick={() => setOpen(false)}>
              Apply for Coaching
            </Button>
            <div className="flex items-center justify-between text-sm text-white/55">
              <span>{site.location} · Virtual</span>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-4 hover:underline"
              >
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
