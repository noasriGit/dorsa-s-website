export function scrollToApplySection(behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById('apply');
  if (el) {
    el.scrollIntoView({ behavior, block: 'start' });
  }
}

export function scrollToApplyForm(behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById('apply-form');
  if (!el) return;

  const scrollMarginTop =
    parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const topVisible = rect.top >= scrollMarginTop - 1;
  const bottomVisible = rect.bottom <= viewportHeight + 1;

  if (topVisible && bottomVisible) return;

  if (rect.top < scrollMarginTop || rect.height + scrollMarginTop > viewportHeight) {
    window.scrollTo({
      top: window.scrollY + rect.top - scrollMarginTop,
      behavior,
    });
    return;
  }

  window.scrollTo({
    top: window.scrollY + rect.bottom - viewportHeight,
    behavior,
  });
}

export function scrollToApplySuccess(behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById('apply-success');
  if (!el) return;

  const scrollMarginTop =
    parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const rect = el.getBoundingClientRect();
  const visibleHeight = window.innerHeight - scrollMarginTop;
  const target =
    window.scrollY + rect.top - scrollMarginTop - (visibleHeight - rect.height) / 2;

  window.scrollTo({
    top: Math.max(0, target),
    behavior,
  });
}

function getHashFromHref(href: string): string {
  const hashIndex = href.indexOf('#');
  return hashIndex >= 0 ? href.slice(hashIndex) : '';
}

/** Fired on window with the program (`detail`) when an "Apply for …" link is clicked. */
export const APPLY_INTEREST_EVENT = 'apply:interest';

/** Reads `interest` from `#apply?interest=…` (or a regular query string). */
export function getInterestFromHash(hash: string): string | null {
  const query = hash.split('?')[1];
  return query ? new URLSearchParams(query).get('interest') : null;
}

/**
 * Handles every same-page link to `#apply` (registered in the capture phase,
 * before next/link). Next cannot resolve `#apply?interest=…` to an element and
 * would scroll to the top of the page, so we update the URL, tell the form which
 * program was chosen, and scroll ourselves.
 */
export function handleApplyLinkClick(event: MouseEvent): void {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest('a[href*="#apply"]');
  if (!link) return;

  const pathname = window.location.pathname;
  if (pathname !== '/' && pathname !== '') return;

  const href = link.getAttribute('href');
  if (!href) return;

  const path = href.split('#')[0];
  if (path !== '' && path !== '/') return;

  const targetHash = getHashFromHref(href);
  if (!targetHash.startsWith('#apply')) return;

  event.preventDefault();

  if (window.location.hash !== targetHash) {
    window.history.pushState(null, '', targetHash);
  }

  const interest = getInterestFromHash(targetHash);
  if (interest) {
    window.dispatchEvent(new CustomEvent(APPLY_INTEREST_EVENT, { detail: interest }));
  }

  requestAnimationFrame(() => (interest ? scrollToApplyForm() : scrollToApplySection()));
}
