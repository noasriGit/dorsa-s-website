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
      const flowersPerSide = 4;
      const totalFlowers = flowersPerSide * 2; // 4 on left, 4 on right
      const newFlowers: Flower[] = [];
      
      // Spawn 4 flowers on the left side (0-4% width)
      const leftPositions: number[] = [];
      for (let i = 0; i < flowersPerSide; i++) {
        let position: number;
        let attempts = 0;
        do {
          position = Math.random() * 4; // 0-4% width
          attempts++;
        } while (
          attempts < 20 && 
          leftPositions.some(pos => Math.abs(pos - position) < 0.8) // Prevent stacking (0.8% minimum gap)
        );
        leftPositions.push(position);
        newFlowers.push({
          id: i,
          left: position,
          delay: 0,
          duration: 4 + Math.random() * 2, // 4-6 seconds
          size: 35 + Math.random() * 15, // 35-50px
          rotationStart: 0, // No rotation
          rotationEnd: 0, // No rotation
        });
      }
      
      // Spawn 4 flowers on the right side (96-100% width)
      const rightPositions: number[] = [];
      for (let i = 0; i < flowersPerSide; i++) {
        let position: number;
        let attempts = 0;
        do {
          position = 96 + Math.random() * 4; // 96-100% width
          attempts++;
        } while (
          attempts < 20 && 
          rightPositions.some(pos => Math.abs(pos - position) < 0.8) // Prevent stacking
        );
        rightPositions.push(position);
        newFlowers.push({
          id: flowersPerSide + i,
          left: position,
          delay: 0,
          duration: 4 + Math.random() * 2, // 4-6 seconds
          size: 35 + Math.random() * 15, // 35-50px
          rotationStart: 0, // No rotation
          rotationEnd: 0, // No rotation
        });
      }
      
      setFlowers(newFlowers);
    } else {
      setFlowers([]);
    }
  }, [isActive]);

  const keyframes = useMemo(() => {
    return flowers.map((flower) => {
      return `@keyframes flower-fall-${flower.id} {
        0% {
          transform: translateY(-50px) rotate(0deg);
          opacity: 0.8;
        }
        95% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(calc(100vh + 100px)) rotate(0deg);
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
