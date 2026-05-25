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
