/* ============================================================
   NAV — HAMBURGER
   ============================================================ */

const nav    = document.getElementById('nav');
const toggle = document.querySelector('.nav__toggle');
const menu   = document.getElementById('nav__menu');

// overlay semitransparente que aparece detrás del menú en móvil/tablet
const overlay = document.createElement('div');
overlay.className = 'nav__overlay';
document.body.appendChild(overlay);

function openMenu() {
  toggle.setAttribute('aria-expanded', 'true');
  menu.classList.add('nav__links--open');
  overlay.classList.add('nav__overlay--visible');
}

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('nav__links--open');
  overlay.classList.remove('nav__overlay--visible');
}

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

// cierra el menú al hacer clic en cualquier link o en el botón CTA del menú móvil
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// cierra el menú al tocar el overlay
overlay.addEventListener('click', closeMenu);


/* ============================================================
   NAV — SCROLL
   ============================================================ */

// passive: true le indica al navegador que este listener nunca llamará preventDefault()
// esto permite al navegador optimizar el scroll sin esperar a que el JS termine de ejecutarse
const scrollIndicator = document.querySelector('.hero__scroll-indicator');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  if (scrollIndicator) {
    scrollIndicator.classList.toggle('hero__scroll-indicator--hidden', window.scrollY > 60);
  }
}, { passive: true });

/* Activa :active en iOS para elementos que no son <a> ni <button> (cards, artículos, etc.)
   Sin esto, Safari no dispara :active en divs ni articles al tocarlos */
document.addEventListener('touchstart', () => {}, { passive: true });
