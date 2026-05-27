/* ============================================================
   SCROLL REVEAL

   IntersectionObserver detecta cuándo cada .reveal entra en
   el viewport y añade .reveal--visible para disparar la
   transición CSS. Se observa una sola vez — sin reversión.
   ============================================================ */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('reveal--visible');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
