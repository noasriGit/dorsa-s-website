'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOverHero, setIsOverHero] = useState(true);

  useEffect(() => {
    const updateNavbarState = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) {
        setIsOverHero(false);
        return;
      }
      const heroRect = hero.getBoundingClientRect();
      const navHeight = 64;
      setIsOverHero(heroRect.bottom > navHeight);
    };

    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState, { passive: true });
    window.addEventListener('resize', updateNavbarState);

    return () => {
      window.removeEventListener('scroll', updateNavbarState);
      window.removeEventListener('resize', updateNavbarState);
    };
  }, []);

  const navClasses = isOverHero
    ? 'bg-[#d9d4c7]/95 border-black/10 text-white'
    : 'bg-white border-black/10 text-[#d2b48c]';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b ${navClasses}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-light tracking-tight">
            Dorsa Wellness
          </Link>

          {/* Instagram Button (center) */}
          <a
            href="https://www.instagram.com/dorsawellness/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-200 ${
              isOverHero
                ? 'border-white/20 bg-white/10 text-white/80 hover:text-white hover:bg-white/20'
                : 'border-[#d2b48c]/40 bg-[#d2b48c]/10 text-[#d2b48c] hover:text-[#c2a376] hover:bg-[#d2b48c]/20'
            }`}
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

          {/* Navigation Links */}
          <div className="flex items-center gap-6 sm:gap-8 md:gap-8 lg:gap-10">
            <Link
              href="/"
              className={`text-sm sm:text-base md:text-lg lg:text-lg font-light tracking-wide transition-colors duration-200 ${
                pathname === '/'
                  ? isOverHero
                    ? 'text-white border-b border-white/30 pb-1'
                    : 'text-[#d2b48c] border-b border-[#d2b48c]/40 pb-1'
                  : isOverHero
                  ? 'text-white/80 hover:text-white'
                  : 'text-[#d2b48c]/80 hover:text-[#d2b48c]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm sm:text-base md:text-lg lg:text-lg font-light tracking-wide transition-colors duration-200 ${
                pathname === '/about'
                  ? isOverHero
                    ? 'text-white border-b border-white/30 pb-1'
                    : 'text-[#d2b48c] border-b border-[#d2b48c]/40 pb-1'
                  : isOverHero
                  ? 'text-white/80 hover:text-white'
                  : 'text-[#d2b48c]/80 hover:text-[#d2b48c]'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
