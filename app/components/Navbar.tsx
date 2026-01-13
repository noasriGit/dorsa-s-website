'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#d9d4c7]/95 backdrop-blur-sm border-b border-black/10 paper-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-light text-white tracking-tight">
            Dorsa Wellness
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className={`text-base font-light tracking-wide transition-colors duration-200 ${
                pathname === '/'
                  ? 'text-white border-b border-white/30 pb-1'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-base font-light tracking-wide transition-colors duration-200 ${
                pathname === '/about'
                  ? 'text-white border-b border-white/30 pb-1'
                  : 'text-white/80 hover:text-white'
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
