import Link from 'next/link';
import { navLinks, site } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-black/8 bg-[var(--color-beige)]">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-light text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#apply"
              className="text-sm font-light text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              Apply
            </Link>
          </div>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 bg-white/50 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a
            href="https://nvdigitalconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-light text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
          >
            Created by NV Digital Consulting
          </a>
        </div>

        <p
          className="text-center text-xs text-[var(--color-muted)] mt-8 font-light"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
