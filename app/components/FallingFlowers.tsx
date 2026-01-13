'use client';

import { useEffect, useState, useMemo } from 'react';

interface Flower {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotationStart: number;
  rotationEnd: number;
}

interface FallingFlowersProps {
  isActive: boolean;
}

export default function FallingFlowers({ isActive }: FallingFlowersProps) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate 3-4 flowers with random properties
      const flowerCount = 4 + Math.floor(Math.random() * 2); // 3 or 4 flowers
      const newFlowers: Flower[] = Array.from({ length: flowerCount }, (_, i) => {
        const rotationStart = Math.random() * 45 - 22.5; // Start between -22.5 and 22.5 degrees
        // Spawn only on the sides: left side (0-5%) or right side (95-100%)
        const isLeftSide = Math.random() < 0.5;
        const left = isLeftSide ? Math.random() * 3 : 95 + Math.random() * 3;
        // Limit total rotation to 90 degrees (so flowers don't look like lines)
        const rotationAmount = 30 + Math.random() * 60; // Between 30-90 degrees total
        return {
          id: i,
          left: left,
          delay: 0, // No delay - start immediately
          duration: 4 + Math.random() * 3,
          size: 30 + Math.random() * 20, // Size in pixels
          rotationStart: rotationStart,
          rotationEnd: rotationStart + rotationAmount,
        };
      });
      setFlowers(newFlowers);
    } else {
      setFlowers([]);
    }
  }, [isActive]);

  const keyframes = useMemo(() => {
    return flowers.map((flower) => {
      return `@keyframes flower-fall-${flower.id} {
        0% {
          transform: translateY(-50px) rotate(${flower.rotationStart}deg);
          opacity: 0.8;
        }
        95% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(calc(100vh + 100px)) rotate(${flower.rotationEnd}deg);
          opacity: 0;
        }
      }`;
    }).join('\n');
  }, [flowers]);

  if (!isActive || flowers.length === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute top-0"
            style={{
              left: `${flower.left}%`,
              animation: `flower-fall-${flower.id} ${flower.duration}s ease-in ${flower.delay}s forwards`,
            }}
          >
            <img
              src="/images/flower.png"
              alt=""
              width={flower.size}
              height={flower.size}
              className="drop-shadow-lg"
              style={{
                width: `${flower.size}px`,
                height: `${flower.size}px`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
