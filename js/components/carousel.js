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
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(cards.length - visibleCount(), index + visibleCount());
    update();
  });

  // al redimensionar la ventana se reinicia al primer grupo para evitar
  // estados inconsistentes (ej: estar en el grupo 3 y pasar a mobile con 1 visible)
  window.addEventListener('resize', () => {
    index = 0;
    update();
  }, { passive: true });

  // soporte de swipe táctil — registra dónde empieza el toque
  // y compara con dónde termina para detectar la dirección
  let touchStartX = 0;

  section.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  section.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;

    // solo actúa si el desplazamiento supera 50px — evita swipes accidentales
    if (Math.abs(diff) < 50) return;

    if (diff > 0) nextBtn.click(); // swipe izquierda → siguiente
    else          prevBtn.click(); // swipe derecha  → anterior
  }, { passive: true });

  update(); // estado inicial
});
