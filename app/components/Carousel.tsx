'use client';

import { useState, useEffect, useRef } from 'react';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onItemClick?: (index: number) => void;
  dotsClassName?: string;
}

export default function Carousel({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  onItemClick,
  dotsClassName = 'mt-6',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [spacing, setSpacing] = useState(120);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth || 0;
      if (width >= 1536) {
        setSpacing(170);
      } else if (width >= 1280) {
        setSpacing(160);
      } else if (width >= 1024) {
        setSpacing(140);
      } else if (width >= 640) {
        setSpacing(120);
      } else {
        setSpacing(105);
      }
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);

    return () => {
      window.removeEventListener('resize', updateSpacing);
    };
  }, []);

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
    // Calculate offset with wrapping for infinite loop feel
    let offset = index - currentIndex;
    const totalItems = items.length;
    
    // Wrap offset to shortest distance (handles infinite loop)
    if (offset > totalItems / 2) {
      offset = offset - totalItems;
    } else if (offset < -totalItems / 2) {
      offset = offset + totalItems;
    }
    
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
      const translateX = offset * spacing; // Spacing
      const scale = 0.85;
      const rotateY = offset * 25; // Angle
      const opacity = 0.7;
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 5 - absOffset,
      };
    } else if (absOffset === 2) {
      // Second adjacent items
      const translateX = offset * spacing;
      const scale = 0.75;
      const rotateY = offset * 30;
      const opacity = 0.5;
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 5 - absOffset,
      };
    } else {
      // Far items - hide them
      const translateX = offset * spacing;
      const scale = 0.6;
      const rotateY = offset * 35;
      const opacity = 0;
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <div className="relative w-full reviews-no-scroll">
      {/* Carousel Container with 3D perspective */}
      <div 
        ref={carouselRef}
        className="relative reviews-no-scroll h-[220px] sm:h-[260px] lg:h-[320px] xl:h-[360px] flex items-center justify-center perspective-1000 pb-0 mb-0"
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
                  if (isActive && onItemClick) {
                    onItemClick(index);
                  } else if (!isActive) {
                    goToSlide(index);
                  }
                }}
              >
                <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] xl:w-[300px] xl:h-[300px]">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className={`flex justify-center gap-2 transform ${dotsClassName}`}>
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
    </div>
  );
}
