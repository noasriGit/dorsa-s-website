'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#d9d4c7]/95 paper-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm md:text-base lg:text-base font-light tracking-wide text-black/70 hover:text-black transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm md:text-base lg:text-base font-light tracking-wide text-black/70 hover:text-black transition-colors duration-200"
            >
              About
            </Link>
          </div>

          <a
            href="https://www.instagram.com/dorsawellness/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 bg-white/20 text-black/70 hover:text-black hover:bg-white/30 transition-colors duration-200"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>

          <a
            href="https://nvdigitalconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm md:text-base font-light tracking-wide text-black/60 hover:text-black transition-colors duration-200"
          >
            Created by NV Digital Consulting
          </a>
        </div>
      </div>
    </footer>
  );
}
