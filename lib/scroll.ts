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

export function handleApplyLinkClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest('a[href*="#apply"]');
  if (!link) return;

  const pathname = window.location.pathname;
  if (pathname !== '/' && pathname !== '') return;

  const href = link.getAttribute('href');
  if (!href) return;

  const targetHash = getHashFromHref(href);
  if (!targetHash.startsWith('#apply')) return;

  if (window.location.hash === targetHash) {
    event.preventDefault();
    requestAnimationFrame(() => scrollToApplyForm());
  }
}
