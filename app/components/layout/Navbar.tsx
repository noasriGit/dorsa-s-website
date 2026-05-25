'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/content';
import Button from '../ui/Button';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isScrolled = hasMounted && scrolled;

  const linkClass = isScrolled
    ? 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)]'
    : 'text-white/85 hover:text-white';

  const brandClass = isScrolled ? 'text-[var(--color-charcoal)]' : 'text-white';

  const menuIconClass = isScrolled ? 'text-[var(--color-charcoal)]' : 'text-white';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <nav
        className={`border-b backdrop-blur-md transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-sm border-black/8'
            : 'bg-transparent border-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            <Link
              href="/"
              className={`text-lg sm:text-xl font-light tracking-tight shrink-0 ${brandClass}`}
            >
              {site.name}
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-light tracking-wide transition-colors ${linkClass}`}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/#apply" className="!py-2.5 !px-5 !text-sm">
                Apply for Coaching
              </Button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/#apply"
                className="inline-flex items-center justify-center min-h-[2.5rem] px-4 py-2 rounded-full text-xs font-medium bg-[var(--color-taupe)] text-[var(--color-charcoal)] border border-black/5"
              >
                Apply
              </Link>
              <button
                type="button"
                className={`p-2 -mr-2 min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center ${menuIconClass}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[var(--color-cream)] z-40 p-6 flex flex-col gap-4 overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-light text-[var(--color-charcoal)] py-2 border-b border-black/8"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#apply"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-[var(--color-taupe)] text-[var(--color-charcoal)] w-full text-center"
          >
            Apply for Coaching
          </Link>
        </div>
      )}
    </header>
  );
}
