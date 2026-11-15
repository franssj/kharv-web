# KHARV — Instrucciones para Claude Code

Sitio web de KHARV, la marca de diseño y desarrollo web a medida de Francisco: una home de una sola página más tres casos de estudio en `proyectos/`.
Lema: "Todo lo que imaginás, se puede crear." Pilares: **Diseño · Desarrollo · Seguridad**.
El objetivo del sitio es presentar los servicios y los proyectos, y llevar al visitante a contactar por WhatsApp o mail.

## Stack real

- HTML, CSS y JavaScript sin frameworks y sin build. La web publicada no tiene dependencias.
- Animaciones con **GSAP 3.14.2 + ScrollTrigger**, servidos en local desde `js/vendor/gsap-3.14.2/` (sin CDN, para no ampliar la CSP).
- `package.json` existe solo para herramientas de desarrollo: **Playwright 1.64.1** (devDependency, usa el Chrome instalado con `channel: 'chrome'`, no descarga navegadores). No forma parte de la web publicada.
- Hosting en Vercel. `vercel.json` solo define headers de seguridad. `.vercelignore` deja fuera del deploy `package.json`, `package-lock.json`, `node_modules/`, `scripts/` y `CLAUDE.md`.
- Fuentes de Google Fonts: **Lora** (títulos) e **Inter** (texto).
- Imágenes en `img/`: fotos en `.webp`, logos e íconos en `.png`/`.ico`.

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Todo el contenido, en español. Secciones en orden: `#inicio`, `#servicios`, `#seguridad`, `#proceso`, `#quien-soy`, `#preguntas` (FAQ, sin link en el menú), `#proyectos`, `#contacto` y footer. `#proyectos` es una grilla `.works` con 3 tarjetas `.pcard` (KHARV, Evermore, Transportes Julio), todas con estado "Terminado", chips de tecnologías y "Ver caso →" hacia su página en `proyectos/`. El botón "Ver proyecto" del hero apunta a `#proyectos`. En el `<head>`: canonical, Open Graph (`img/og-kharv-3.jpg`, 2400×1260 sin grano para que resista la recompresión, composición centrada para que sobreviva al recorte cuadrado de WhatsApp; si se rehace, usar un nombre nuevo para evitar el caché) y JSON-LD `ProfessionalService`. URL pública: `https://kharv-web.vercel.app/`. |
| `styles.css` | Tokens en `:root`, componentes y responsive. Corta en 1240, 1100, 1000, 900, 820, 800, 700, 600 y 480 px. Respeta `prefers-reduced-motion`. |
| `script.js` | Configuración pública de contacto (`WHATSAPP_NUMBER`, `MAIL_TO` y `MESSAGES` con los mensajes en `es`/`en`). Arma los links `[data-wa]` y `#mailBtn` (Gmail en escritorio, `mailto:` en móvil) y los actualiza con el evento `kharv:lang`. Además oculta imágenes rotas de `main`, pone el header sólido al scrollear, marca con `has-more-start`/`has-more-end` si la fila del menú móvil tiene secciones ocultas, la animación de entrada `[data-r]` y el resaltado de la sección activa en el menú. |
| `i18n.js` | Selector ES/EN. Diccionario `EN` por clave. El HTML marca cada texto con `data-i18n="clave"`, `data-i18n-html="clave"` (si lleva `<em>`, `<br>` o `<b>`) o `data-i18n-attr="alt:clave; content:otra"`. Guarda el español original, aplica el inglés, lo recuerda en `localStorage` (`kharv-lang`) y emite `kharv:lang`. Se carga después de `script.js`. Si falta una clave, avisa en la consola. |
| `proyectos/` | Casos de estudio: `kharv.html`, `evermore.html` y `transportes-julio.html`, con la misma estructura: `.cs-hero` (volver, título, `dl.facts` con cliente, rol, tecnologías y link al sitio en vivo, captura principal), desafío/solución (`.cs-cols`), "Lo que incluye", galería (`.gallery`: celular + 2 secciones de PC), CTA "Visitar el sitio" y bloque `.next` "Siguiente proyecto" en cadena Evermore → Transportes Julio → KHARV → Evermore. Usan rutas relativas `../` y el mismo header/footer que la home (links `../index.html#...`). Cada una tiene title, description, canonical y Open Graph propios (og:image = `img/proyectos/<slug>/portada-pc.jpg`). Las claves i18n comunes son `cs.*` y las de cada caso `kh.*`, `ev.*`, `tj.*`. |
| `js/animaciones.js` | Animaciones GSAP dentro de `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`: títulos `h2[data-r]`, tarjetas `.pcard`, `.cs-title` y figuras de `.gallery`. Mientras corre agrega `gsap-on` a `<html>`, y el CSS anula `data-r` en esos elementos para que no se animen dos veces. Orden de carga (todos `defer`): `script.js`, `i18n.js`, `gsap.min.js`, `ScrollTrigger.min.js`, `animaciones.js`. El CSS suma `@view-transition` entre páginas, desactivado con movimiento reducido. |
| `js/vendor/gsap-3.14.2/` | `gsap.min.js` y `ScrollTrigger.min.js` locales, versión exacta. No editar. |
| `scripts/capturas.mjs` | `npm run capturas`: con Playwright captura los sitios en vivo (PC 1440×900, celular 390×844 a 2x y 2 secciones de PC por proyecto), espera fuentes, imágenes y animaciones, y exporta WebP (más una versión a la mitad de ancho) y el `portada-pc.jpg` para Open Graph en `img/proyectos/`. Volver a correrlo después de publicar cambios visibles en cualquiera de los 3 sitios. |
| `404.html` | Página de error con la estética de Contacto. Rutas absolutas (`/styles.css`, `/img/...`) y `noindex`. Vercel la sirve sola. |
| `robots.txt`, `sitemap.xml` | SEO técnico. El sitemap incluye la home y los 3 casos; actualizar `lastmod` al publicar cambios de contenido. |
| `img/proyectos/<slug>/` | Capturas generadas por `npm run capturas` (`kharv`, `evermore`, `transportes-julio`): `portada-pc.webp`/`-720`, `portada-pc.jpg` (OG), `celular.webp`/`-390` y dos secciones por proyecto, cada una con su versión `-720`. Se eligen con `srcset`/`sizes`. La portada va en la tarjeta y en la captura principal del caso; celular y secciones, en la galería. |
| `vercel.json` | CSP estricta (`script-src 'self'`, sin inline), `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`. |

## Convenciones

- Comentarios en español, con bloques separados por `/* ===== */` y `/* ---------- */`.
- CSS compacto (reglas en una línea), clases cortas tipo BEM (`hdr__in`, `btn--ghost`) y estados con `is-*` (`is-scrolled`, `is-on`, `is-active`, `is-broken`).
- JS en una IIFE con `'use strict'` y los helpers `$`/`$$`.
- Hooks por atributos `data-*`: `data-r` (animación de entrada), `data-wa` (WhatsApp), `data-lang`.
- Proyecto nuevo: tarjeta `.pcard` en `#proyectos`, página en `proyectos/` copiando la estructura de las existentes, entrada en `PROJECTS` de `scripts/capturas.mjs`, claves i18n, URL en `sitemap.xml` y ajustar la cadena de "Siguiente proyecto".
- El texto en español vive en el HTML. **Todo texto visible nuevo o modificado lleva su clave `data-i18n*` y su traducción en el diccionario `EN` de `i18n.js`.**
- Nada de scripts ni estilos inline: la CSP los bloquea. Cualquier recurso externo nuevo exige actualizar la CSP de `vercel.json`, y solo con mi autorización.
- Imágenes con `width`/`height`, `alt` descriptivo y `loading="lazy"` cuando están debajo del primer pantallazo. Los links externos llevan `rel="noopener noreferrer"`.

## Identidad visual (respetar estrictamente)

- Paleta: negro profundo `--bg #0A0A0C`/`--bg2 #111015`, crema `--ink #F1EBE0`, gris de apoyo `--muted #B8B4BE`, violeta gótico `--violet #8B6FD6` y lavanda `--lav #C9B8F5` (itálicas y foco).
- Títulos en Lora con un fragmento en `<em>` itálico lavanda. Eyebrows y tags en mayúsculas espaciadas, con una línea violeta.
- Botones con forma de píldora, marco doble (borde + outline), rombos laterales y Lora en mayúsculas. Hay variantes `--ghost` y `--sm`.
- Fondo `fondo-hero.webp` fijo detrás de toda la página, con degradado oscuro y grano sutil.
- Tono cercano, en primera persona y en voseo rioplatense ("imaginás", "Escribime").
- No cambiar la paleta, las tipografías, el tono ni estos componentes sin justificarlo y consultarme antes.

## Rol y forma de trabajo

1. Actuás como coordinador principal del desarrollo.
2. Usás los subagentes personalizados solo cuando aportan valor real:
   - `frontend`: implementar o corregir interfaces y funcionalidades frontend.
   - `security`: auditorías de seguridad (solo lectura).
   - `performance`: auditorías de rendimiento (solo lectura).
   - `architecture`: evaluación de la arquitectura (solo lectura).
3. No invocás agentes para tareas triviales ni convocás a todos automáticamente.
4. Delegás en paralelo las tareas independientes cuando conviene.
5. Seguís siendo responsable de integrar, revisar y validar lo que devuelven los subagentes.
6. Antes de modificar archivos, entendés el código existente y delimitás el alcance.
7. No reescribís código que funciona sin necesidad.
8. No eliminás funcionalidades ni cambiás decisiones de diseño sin justificarlo.
9. No instalás dependencias, no desplegás, no hacés commits ni ejecutás comandos destructivos sin mi autorización.
10. Priorizás seguridad, rendimiento, accesibilidad, mantenibilidad y calidad visual.
11. Me explicás los cambios importantes y las decisiones técnicas con claridad, sin extenderte de más.
12. Respetás estrictamente la identidad visual y los objetivos de KHARV.
13. Todo cambio de JavaScript debe respetar la CSP definida en `vercel.json`. No introduzcas scripts ni estilos inline. Cualquier modificación que requiera ampliar la CSP debe consultarme antes.

14. Antes de modificar textos, selectores o estructuras HTML, comprobá su correspondencia con la tabla de traducciones de `i18n.js`. No elimines ni desincronices traducciones existentes.

15. Después de cada modificación relevante, verificá que no se hayan roto las funcionalidades existentes. Priorizá comprobaciones específicas y evitá pruebas redundantes. No afirmes que algo funciona si no lo verificaste.