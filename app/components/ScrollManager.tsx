'use client';

import { useEffect } from 'react';
import { handleApplyLinkClick, scrollToApplyForm } from '@/lib/scroll';

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

    // Capture phase so we run before next/link handles the click.
    document.addEventListener('click', handleApplyLinkClick, true);

    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type === 'reload') {
      window.scrollTo(0, 0);
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      scrollToApplyFromHash();
    }

    window.addEventListener('hashchange', scrollToApplyFromHash);
    return () => {
      window.removeEventListener('hashchange', scrollToApplyFromHash);
      document.removeEventListener('click', handleApplyLinkClick, true);
    };
  }, []);

  return null;
}
