'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function TrainerOval() {
  const [isVisible, setIsVisible] = useState(true);
  const [borderRadius, setBorderRadius] = useState('400px 200px');
  const ovalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBorderRadius = () => {
      if (window.innerWidth >= 1024) {
        setBorderRadius('600px 300px');
      } else {
        setBorderRadius('400px 200px');
      }
    };

    updateBorderRadius();
    window.addEventListener('resize', updateBorderRadius, { passive: true });

    return () => {
      window.removeEventListener('resize', updateBorderRadius);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (!heroSection) return;
      
      const rect = heroSection.getBoundingClientRect();
      // Show when hero section is in viewport, hide when it's scrolled past
      setIsVisible(rect.bottom > 0 && rect.top < window.innerHeight);
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className={`hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 w-80 h-[600px] z-40 transition-transform duration-700 ease-in-out pointer-events-none ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div 
        ref={ovalRef}
        className="relative w-full h-full bg-white border-l border-black/20 overflow-hidden pointer-events-auto"
        style={{
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius
        }}
      >
        {/* Photo Section - Top 2/3 */}
        <div className="h-2/3 relative bg-[#d2b48c]/10 overflow-hidden">
          <Image
            src="/images/ovalimage.JPG"
            alt="Trainer"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 192px, 320px"
          />
        </div>

        {/* Info Section - Bottom 1/3 */}
        <div className="h-1/3 pl-8 pr-4 py-3 lg:pl-20 lg:pr-10 lg:py-4 flex flex-col justify-center border-t border-black/10 overflow-hidden">
          <div className="max-w-[120px] lg:max-w-[180px]">
            <h3 className="text-black text-xs lg:text-sm font-light mb-0.5 lg:mb-1 tracking-tight">Your Trainer</h3>
            <p className="text-black/60 text-[9px] lg:text-[11px] font-light leading-snug">
              Certified fitness professional with years of experience helping clients achieve their goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}