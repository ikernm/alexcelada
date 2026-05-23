# CLAUDE.md — alexcelada.es

Contexto completo del proyecto para Claude Code. Lee este archivo antes de tocar cualquier cosa.

---

## Qué es este proyecto

Web de marca personal de **Alex Celada**: coach de vida, conferenciante y entrenador personal con gym propio (Kenko Salud). El sitio tiene tres facetas diferenciadas que conviven bajo una misma identidad visual: mentoría personal, conferencias para empresas y entrenamiento físico.

El objetivo de la web es **captación y conversión** — que el visitante contacte, contrate o se suscriba a la newsletter. No es un blog ni una tienda. Es una web de presentación profesional de alto nivel.

---

## Stack técnico

- **HTML5** semántico — sin frameworks, sin plantillas
- **CSS3** puro — variables CSS, Flexbox, Grid, animaciones nativas
- **JavaScript vanilla** — sin npm, sin bundler, sin dependencias
- **Google Fonts CDN** — única dependencia externa permitida
- **Web3forms** — para los formularios de contacto (sin backend)
- **Netlify** — hosting, conectado a GitHub para deploy automático

**Lo que NO usar bajo ningún concepto:**
- React, Vue, Angular o cualquier framework JS
- npm / node_modules
- Bootstrap, Tailwind o cualquier framework CSS externo
- jQuery
- Librerías de terceros salvo las explícitamente listadas aquí

---

## Estructura de carpetas

```
alexcelada/
├── index.html
├── mentoria.html
├── conferencias.html
├── gimnasio.html
├── contacto.html
├── CLAUDE.md
│
├── css/
│   ├── main.css          ← Variables globales, reset, tipografía, utilidades
│   ├── components.css    ← Nav, footer, botones, cards — elementos reutilizables
│   └── pages/
│       ├── home.css
│       ├── mentoria.css
│       ├── conferencias.css
│       ├── gimnasio.css
│       └── contacto.css
│
├── js/
│   ├── main.js           ← Navbar móvil, scroll suave, comportamientos globales
│   └── components/
│       └── carousel.js   ← Carousel de testimonios
│
└── assets/
    ├── images/
    │   ├── alex/         ← Fotos de Alex (hero, perfil, acción)
    │   ├── gym/          ← Fotos del gimnasio Kenko Salud
    │   └── og/           ← Open Graph images para redes sociales
    └── fonts/            ← Vacío por ahora (usando Google Fonts CDN)
```

**Regla clave:** los `.html` van siempre en la raíz, nunca en subcarpetas. Así todas las rutas a assets son consistentes en todas las páginas (`css/main.css`, `assets/images/...`) sin necesidad de `../`.

---

## Sistema de diseño

### Colores

```css
:root {
  /* Marca */
  --gold:         #DDA63A;   /* Acento principal — botones, highlights, CTAs */
  --gold-light:   #E8BE6A;   /* Hover states del gold */
  --gold-dark:    #B8861E;   /* Pressed states del gold */

  /* Neutros */
  --black:        #000000;
  --off-black:    #1A1A1A;   /* Texto principal */
  --white:        #FFFFFF;
  --beige:        #F7F3EC;   /* Background principal de la web */
  --beige-soft:   #EFE9DF;   /* Background de cards y secciones alternadas */
  --border:       #DDD5C5;   /* Bordes y divisores */

  /* Texto */
  --text:         #1A1A1A;
  --text-muted:   #7A7060;   /* Subtítulos, labels, texto secundario */

  /* Estado — variantes apagadas, nunca colores saturados */
  --success:      #5C7A4E;
  --warning:      #B87333;
}
```

**Reglas de uso del color:**
- El sitio es **predominantemente oscuro**: `--black` y `--off-black` son el fondo base de la mayoría de secciones.
- `--beige` y `--beige-soft` se usan solo en secciones de contenido claro puntuales (ej. "Para quién es" en mentoría, casos de éxito en gimnasio).
- El dorado `--gold` tiene **dos roles**:
  - Acento puntual: badges, iconos, links, subrayados activos, texto destacado en títulos.
  - Fondo de sección completa: newsletter, formulario de mentoría, CTA final de gimnasio, formulario de conferencias.
- Texto sobre fondos oscuros: `--white` para texto principal, `rgba(255,255,255,0.6)` para texto secundario.
- Nunca usar azul, púrpura, naranja saturado ni colores ajenos a la paleta.

### Tipografía

```css
:root {
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
}
```

**Importar en el `<head>` de cada HTML:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
```

**Reglas de uso:**
- `--font-heading` (Cormorant Garamond) para **momentos editoriales y emocionales**: h1 de heroes, citas destacadas, partes en italic dentro de un titular ("que lo *cambia todo*", "*La puerta de entrada*"). No para todos los h2/h3.
- `--font-body` (DM Sans) para estructura y UI: nav, labels en mayúsculas, títulos de sección en uppercase, cards, botones, párrafos, formularios.
- Los títulos de sección usan frecuentemente `DM Sans + text-transform: uppercase + letter-spacing` — no siempre Cormorant.
- Nunca mezclar otras fuentes. Nunca usar Comic Sans, Arial o fuentes del sistema como decisión de diseño.

### Escala tipográfica base

```css
:root {
  --text-xs:   0.75rem;    /*  12px */
  --text-sm:   0.875rem;   /*  14px */
  --text-base: 1rem;       /*  16px */
  --text-lg:   1.125rem;   /*  18px */
  --text-xl:   1.25rem;    /*  20px */
  --text-2xl:  1.5rem;     /*  24px */
  --text-3xl:  1.875rem;   /*  30px */
  --text-4xl:  2.25rem;    /*  36px */
  --text-5xl:  3rem;       /*  48px */
  --text-6xl:  3.75rem;    /*  60px */
  --text-7xl:  4.5rem;     /*  72px */
}
```

### Espaciado

```css
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

### Breakpoints

```css
/* Mobile first — estilos base para móvil, luego se expande */
/* sm  */ @media (min-width: 640px)  { }
/* md  */ @media (min-width: 768px)  { }
/* lg  */ @media (min-width: 1024px) { }
/* xl  */ @media (min-width: 1280px) { }
/* 2xl */ @media (min-width: 1536px) { }
```

---

## Páginas del proyecto

### 1. `index.html` — Home
- Hero a pantalla completa con foto de Alex + gradiente oscuro + headline grande
- Sección de tres pilares: Mentoría / Conferencias / Entrenamiento (cards con enlace a cada página)
- Sección de filosofía: texto + imagen lateral
- Testimonios (carousel)
- CTA final
- Footer

### 2. `mentoria.html` — Mentoría
- Hero con foto de Alex + copy enfocado en transformación personal
- Sección de metodología (bento grid)
- "Para quién es" — perfiles de cliente ideal
- Módulos del programa (lista numerada)
- Pricing — 3 tiers: 750€ / 750€ / 1.250€
- Formulario de contacto (Web3Forms)
- Footer

### 3. `conferencias.html` — Conferencias
- Hero con imagen de Alex en conferencia
- Logos de empresas clientes
- Vídeo embebido de YouTube (speaking reel)
- Temas de keynote (3 bloques)
- Testimonios de directivos
- Formulario de consulta para empresas (Web3Forms)
- Footer

### 4. `gimnasio.html` — Entrenamiento Personal (Kenko Salud)
- Hero con foto del gym
- Stats bar (clientes, sesiones, retención)
- Grid de servicios: nutrición personalizada, planes de entrenamiento, grupos reducidos
- Galería del gimnasio
- Casos de éxito
- CTA de contacto
- Footer

### 5. `contacto.html` — Contacto
- Hero minimalista con headline directo
- Formulario de contacto general (Web3Forms)
- Datos de contacto: email, ubicación
- Social Proof strip: 4 stats de credibilidad
- Footer

---

## Componentes reutilizables

### Navbar
- Logo "alexcelada · coach" a la izquierda
- Links de navegación a la derecha: Home / Mentoría / Conferencias / Entrenamiento / Contacto
- Botón CTA: "Trabaja conmigo" en `--gold` con texto negro
- En móvil: hamburger menu que despliega menú vertical
- Fondo: transparente sobre el hero, sólido (`--black` o `--white`) al hacer scroll
- El link de la página activa se marca con subrayado en `--gold`
- **Se copia en cada HTML — no se carga con JS**

### Footer
- Logo a la izquierda
- Links de navegación secundaria: Privacy Policy / Terms / Press Kit
- Copyright: "© 2026 Alex Celada. Todos los derechos reservados."
- Links a redes: Instagram, YouTube, LinkedIn
- **Se copia en cada HTML — no se carga con JS**

### Botones

```css
/* Primario — acción principal */
.btn-primary {
  background: var(--gold);
  color: var(--black);
  font-family: var(--font-body);
  font-weight: 700;
  border: none;
  border-radius: 2px; /* casi cuadrado, no pill */
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-primary:hover { background: var(--gold-light); }

/* Secundario — acción secundaria */
.btn-secondary {
  background: transparent;
  color: var(--white);
  border: 1px solid var(--white);
  font-family: var(--font-body);
  font-weight: 500;
  border-radius: 2px;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: var(--white);
  color: var(--black);
}
```

---

## Convenciones de código

### CSS — metodología BEM

```css
/* Bloque */
.card { }

/* Elemento */
.card__title { }
.card__image { }
.card__body { }

/* Modificador */
.card--featured { }
.card--dark { }
```

### HTML — estructura base de cada página

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[descripción específica de la página]">

  <!-- Open Graph -->
  <meta property="og:title" content="Alex Celada — [título página]">
  <meta property="og:description" content="[descripción]">
  <meta property="og:image" content="assets/og/[imagen].jpg">
  <meta property="og:type" content="website">

  <title>Alex Celada — [Título de la página]</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/pages/[pagina].css">
</head>
<body>

  <!-- NAV — copiar bloque completo de index.html -->
  <nav class="nav" id="nav">
    ...
  </nav>

  <main>
    ...
  </main>

  <!-- FOOTER — copiar bloque completo de index.html -->
  <footer class="footer">
    ...
  </footer>

  <!-- JS -->
  <script src="js/main.js"></script>
</body>
</html>
```

### JavaScript — sin jQuery, sin frameworks

```js
// Bien — vanilla JS moderno
document.querySelector('.nav__toggle').addEventListener('click', () => {
  document.querySelector('.nav__menu').classList.toggle('nav__menu--open');
});

// Mal — no usar esto
$('.nav__toggle').click(function() { ... });
```

---

## Formularios

Todos los formularios usan **Web3Forms**. No hay backend propio.

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="[ACCESS_KEY_DE_WEB3FORMS]">
  <input type="text" name="name" placeholder="Tu nombre" required>
  <input type="email" name="email" placeholder="Tu email" required>
  <textarea name="message" placeholder="Tu mensaje" required></textarea>
  <button type="submit" class="btn-primary">Enviar</button>
</form>
```

Obtener el `access_key` en web3forms.com — una clave por formulario (mentoría, conferencias, contacto general).

---

## SEO y rendimiento

- Cada página tiene su propio `<title>` y `<meta name="description">` únicos
- Imágenes en formato `.webp` siempre que sea posible, con `<img loading="lazy">` en las que están below the fold
- El hero image **no** lleva `loading="lazy"` — tiene que cargar inmediatamente
- Texto alternativo en todas las imágenes: `alt="Alex Celada dando una conferencia en Madrid"`
- Headings en orden lógico: un solo `<h1>` por página, luego `<h2>`, `<h3>`...
- No usar headings para estilo — si necesitas texto grande que no es un heading, usa un `<p>` con clase

---

## Proceso de trabajo

1. Cambios siempre en rama separada, nunca directamente en `main`
2. `main` = lo que está en producción en Netlify
3. Commit messages en español, descriptivos: `"Añade sección de precios a mentoria.html"`
4. Cuando se modifica el nav o el footer, actualizar los 5 HTML en el mismo commit
5. Antes de hacer push, revisar en móvil (360px) y desktop (1440px)

---

## Lo que Alex quiere transmitir

- **Premium, no caro.** La web tiene que sentirse exclusiva sin ser fría.
- **Humano, no corporativo.** Alex no es una agencia ni una marca sin cara — es una persona real con historia.
- **Tres facetas, un personaje.** Mentoría, conferencias y gym tienen páginas separadas pero la identidad visual es una sola.
- **Español.** Todo el copy en castellano. Ningún placeholder, botón ni label en inglés.

---

## Contacto del proyecto

- **Cliente:** Alex Celada — alexcelada.es
- **Desarrollador:** Iker Niebla — Inmeo Studio
- **Reunión de presentación:** 20 de junio de 2026
