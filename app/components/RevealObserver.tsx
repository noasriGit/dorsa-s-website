'use client';

import { useEffect } from 'react';

/**
 * Adds `.is-revealed` to every `[data-reveal]` element as it scrolls into view.
 * Styles live in globals.css and only apply when the `js` class is present,
 * so content is never hidden if scripts fail.
 */
export default function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('is-revealed');

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    const observeAll = () => {
      document
        .querySelectorAll('[data-reveal]:not(.is-revealed)')
        .forEach((el) => io.observe(el));
    };

    observeAll();

    // Pick up anything rendered later (e.g. client-only sections).
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        observeAll();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
