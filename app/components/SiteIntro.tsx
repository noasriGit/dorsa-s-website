'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'dorsa-intro-seen';
const AUTO_DISMISS_MS = 1500;
const EXIT_MS = 400;

/** In dev, play intro on every reload; production uses sessionStorage once per session. */
const INTRO_EVERY_RELOAD = process.env.NODE_ENV === 'development';

type Phase = 'idle' | 'show' | 'exit' | 'gone';

export default function SiteIntro() {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      if (!INTRO_EVERY_RELOAD) {
        try {
          if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
            setPhase('gone');
            return;
          }
        } catch {
          /* sessionStorage unavailable */
        }
      }
      setPhase('show');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const dismiss = useCallback(() => {
    setPhase((p) => (p === 'show' ? 'exit' : p));
  }, []);

  useEffect(() => {
    if (phase !== 'show') return;
    const t = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [phase, dismiss]);

  useEffect(() => {
    if (phase !== 'show' && phase !== 'exit') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exit') return;
    const t = setTimeout(() => {
      if (!INTRO_EVERY_RELOAD) {
        try {
          sessionStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          /* ignore */
        }
      }
      setPhase('gone');
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 'idle' || phase === 'gone') return null;

  return (
    <div
      className={`paper-card-surface fixed inset-0 z-[120] flex cursor-pointer items-center justify-center transition-opacity duration-[400ms] ease-out ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="presentation"
      aria-hidden={phase === 'exit'}
      onClick={dismiss}
    >
      <div className="relative w-full max-w-[min(40vw,200px)] px-6">
        <Image
          src="/images/dumbell.png"
          alt=""
          width={400}
          height={400}
          priority
          sizes="(max-width: 640px) 40vw, 200px"
          className="site-intro-dumbbell h-auto w-full drop-shadow-md"
        />
      </div>
    </div>
  );
}
