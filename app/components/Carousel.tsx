'use client';

import { useState, useEffect, useRef } from 'react';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
  imageSrc?: string;
  onClick?: () => void;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel({ items, autoPlay = false, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (items.length === 0) return null;

  const getTransform = (index: number) => {
    const offset = index - currentIndex;
    const absOffset = Math.abs(offset);
    
    if (absOffset === 0) {
      // Center item - fully visible
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (absOffset === 1) {
      // Adjacent items
      const translateX = offset * 120; // Spacing
      const scale = 0.85;
      const rotateY = offset * 25; // Angle
      const opacity = 0.7;
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 5 - absOffset,
      };
    } else {
      // Far items
      const translateX = offset * 120;
      const scale = 0.7;
      const rotateY = offset * 30;
      const opacity = 0.4;
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 5 - absOffset,
      };
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Carousel Container with 3D perspective */}
      <div 
        ref={carouselRef}
        className="relative overflow-x-hidden h-[300px] flex items-center justify-center perspective-1000"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
          maxWidth: '100%',
          width: '100%'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {items.map((item, index) => {
            const styles = getTransform(index);
            const isActive = index === currentIndex;
            
            return (
              <div
                key={item.id}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  ...styles,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  pointerEvents: 'auto',
                }}
                onClick={() => {
                  if (isActive) {
                    // Extract image src from content if available
                    const item = items[index];
                    if (item.imageSrc) {
                      setExpandedImage(item.imageSrc);
                    }
                  } else {
                    goToSlide(index);
                  }
                }}
              >
                <div className="w-[240px] h-[280px]">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-[#d2b48c] w-8'
                  : 'bg-black/20 hover:bg-black/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors z-10"
            onClick={() => setExpandedImage(null)}
            aria-label="Close"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
