/* ============================================================
   NAV — HAMBURGER
   ============================================================ */

const nav    = document.getElementById('nav');
const toggle = document.querySelector('.nav__toggle');
const menu   = document.getElementById('nav__menu');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';

  // aria-expanded es un atributo de accesibilidad — informa a los lectores de pantalla
  // si el menú está abierto o cerrado. Siempre debe estar sincronizado con el estado visual
  toggle.setAttribute('aria-expanded', String(!isOpen));

  menu.classList.toggle('nav__links--open');
});

// cierra el menú al hacer clic en cualquier link — mejora UX en móvil
// sin esto el usuario tiene que cerrar el menú manualmente tras navegar
menu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('nav__links--open');
  });
});

// cierra el menú si el usuario hace clic fuera de la nav
// closest() sube por el árbol DOM buscando el selector — devuelve null si no lo encuentra
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav') && menu.classList.contains('nav__links--open')) {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('nav__links--open');
  }
});


/* ============================================================
   NAV — SCROLL
   ============================================================ */

// passive: true le indica al navegador que este listener nunca llamará preventDefault()
// esto permite al navegador optimizar el scroll sin esperar a que el JS termine de ejecutarse
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
}, { passive: true });
