'use client';

import { useEffect } from 'react';
import { scrollToApplyForm } from '@/lib/scroll';

function scrollToApplyFromHash() {
  if (window.location.hash.startsWith('#apply')) {
    requestAnimationFrame(() => scrollToApplyForm());
  }
}

export default function ScrollManager() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type === 'reload') {
      window.scrollTo(0, 0);
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    scrollToApplyFromHash();
    window.addEventListener('hashchange', scrollToApplyFromHash);
    return () => window.removeEventListener('hashchange', scrollToApplyFromHash);
  }, []);

  return null;
}
