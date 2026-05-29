document.querySelectorAll('[data-count-to]').forEach(el => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const target   = parseFloat(el.dataset.countTo);
  const prefix   = el.dataset.countPrefix  || '';
  const suffix   = el.dataset.countSuffix  || '';
  const decimals = parseInt(el.dataset.countDecimals || '0');
  const duration = 3000;

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    observer.unobserve(el);

    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = prefix + (eased * target).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });

  observer.observe(el);
});
