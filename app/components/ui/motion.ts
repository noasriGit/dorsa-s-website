import type { CSSProperties } from 'react';

/** Stagger helper for `[data-reveal]` elements. */
export const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/** Stagger helper for the hero's CSS entrance animation. */
export const introDelay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;
