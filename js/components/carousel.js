/* ============================================================
   CAROUSEL DE TESTIMONIOS

   Lógica: muestra un "grupo" de cards según el viewport.
   En desktop muestra 2 a la vez, en móvil 1.
   Los botones prev/next avanzan de grupo en grupo.

   Si hay 2 cards o menos, el CSS grid lo gestiona solo
   y este script no hace nada — no rompe nada si no hay JS.
   ============================================================ */

document.querySelectorAll('.testimonials').forEach(section => {

  const cards   = [...section.querySelectorAll('.testimonial-card')];
  const prevBtn = section.querySelector('.testimonials__prev');
  const nextBtn = section.querySelector('.testimonials__next');

  // con 2 cards o menos el CSS ya las muestra todas — no se necesita carousel
  if (!prevBtn || !nextBtn || cards.length <= 2) return;

  let index = 0; // índice de la primera card visible en cada momento

  // devuelve cuántas cards se muestran a la vez según el ancho de pantalla
  // matchMedia es más fiable que window.innerWidth porque usa los mismos breakpoints que el CSS
  function visibleCount() {
    return window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
  }

  function update() {
    const n = visibleCount();

    // muestra solo las cards del grupo actual, oculta el resto
    cards.forEach((card, i) => {
      card.style.display = (i >= index && i < index + n) ? '' : 'none';
    });

    // deshabilita prev si estamos al principio, next si estamos al final
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index + n >= cards.length;

    // feedback visual: opacity baja cuando el botón está deshabilitado
    prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '1';
  }

  // Math.max y Math.min evitan que el índice salga de los límites del array
  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - visibleCount());
    update();
    prevBtn.blur();
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(cards.length - visibleCount(), index + visibleCount());
    update();
    nextBtn.blur();
  });

  // Solo reinicia si el índice actual quedaría fuera de rango con el nuevo visibleCount.
  // Evita que iOS Safari resetee el carrusel al colapsar/expandir la barra de URL
  // (ese gesto dispara un evento resize aunque el ancho de pantalla no haya cambiado).
  window.addEventListener('resize', () => {
    const n = visibleCount();
    if (index + n > cards.length) index = Math.max(0, cards.length - n);
    update();
  }, { passive: true });

  // soporte de swipe táctil — registra dónde empieza el toque
  // y compara con dónde termina para detectar la dirección
  let touchStartX = 0;

  section.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  // Ignora el evento si el toque fue sobre un botón de navegación —
  // evita que el swipe handler compita con el click del botón
  section.addEventListener('touchend', e => {
    if (e.target === prevBtn || e.target === nextBtn) return;
    const diff = touchStartX - e.changedTouches[0].clientX;

    // solo actúa si el desplazamiento supera 50px — evita swipes accidentales
    if (Math.abs(diff) < 50) return;

    if (diff > 0) nextBtn.click(); // swipe izquierda → siguiente
    else          prevBtn.click(); // swipe derecha  → anterior
  }, { passive: true });

  update(); // estado inicial
});


/* ============================================================
   CAROUSEL DE CASOS DE ÉXITO

   Igual que el de testimonios pero con breakpoints distintos:
   desktop (≥1024px) muestra los 3, tablet muestra 2, móvil 2 apilados.
   ============================================================ */

document.querySelectorAll('.cases').forEach(section => {

  const cards   = [...section.querySelectorAll('.case-card')];
  const prevBtn = section.querySelector('.cases__prev');
  const nextBtn = section.querySelector('.cases__next');

  if (!prevBtn || !nextBtn || cards.length <= 1) return;

  let index = 0;

  function visibleCount() {
    if (window.matchMedia('(min-width: 1024px)').matches) return 3;
    return 2; // tablet y móvil
  }

  function update() {
    const n = visibleCount();
    cards.forEach((card, i) => {
      card.style.display = (i >= index && i < index + n) ? '' : 'none';
    });
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index + n >= cards.length;
    prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '1';
  }

  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - visibleCount());
    update();
    prevBtn.blur();
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(cards.length - visibleCount(), index + visibleCount());
    update();
    nextBtn.blur();
  });

  // Solo reinicia si el índice actual quedaría fuera de rango con el nuevo visibleCount
  window.addEventListener('resize', () => {
    const n = visibleCount();
    if (index + n > cards.length) index = Math.max(0, cards.length - n);
    update();
  }, { passive: true });

  let touchStartX = 0;

  section.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  section.addEventListener('touchend', e => {
    if (e.target === prevBtn || e.target === nextBtn) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) nextBtn.click();
    else          prevBtn.click();
  }, { passive: true });

  update();
});
