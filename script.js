/* =====================================================================
   CONFIGURACIÓN (solo valores públicos)
   WhatsApp: número con código de país y sin signos. Ej. Argentina: 5493484000000
   Si el número no tiene entre 10 y 15 dígitos (por ejemplo, si quedan letras
   o símbolos), el botón de WhatsApp queda oculto.
   ===================================================================== */
const WHATSAPP_NUMBER = '542931411319';
const WHATSAPP_MSG = 'Hola KHARV, quisiera consultar por una página web.';

/* Mail: al tocar el botón se abre un mensaje nuevo con asunto y texto listos */
const MAIL_TO = 'kharv.web@gmail.com';
const MAIL_SUBJECT = 'Consulta por una página web';
const MAIL_BODY = 'Hola KHARV,\n\nQuisiera consultar por una página web.\n\nMi nombre:\nMi idea:\n\nGracias.';

(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- WhatsApp ----------
     Todos los botones con data-wa (inicio y contacto) abren el chat directo. */
  const waOk = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  $$('[data-wa]').forEach(a => {
    if (waOk) {
      a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else a.hidden = true;
  });

  /* ---------- Mail ----------
     En computadora abre el redactor de Gmail en una pestaña nueva.
     En celular usa mailto:, que abre la app de mail que tenga el teléfono. */
  const mail = $('#mailBtn');
  if (mail) {
    const subject = encodeURIComponent(MAIL_SUBJECT);
    const body = encodeURIComponent(MAIL_BODY);
    mail.href = `mailto:${MAIL_TO}?subject=${subject}&body=${body}`;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      mail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL_TO)}&su=${subject}&body=${body}`;
      mail.target = '_blank';
      mail.rel = 'noopener noreferrer';
    }
  }

  /* ---------- Imágenes que no cargan: se ocultan y queda el fondo del marco ---------- */
  $$('.portrait img, .browser img').forEach(img => {
    const hide = () => img.classList.add('is-broken');
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  /* ---------- Header: fondo sólido al scrollear ---------- */
  const hdr = $('#hdr');
  const onScroll = () => hdr.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú móvil (hamburguesa) ----------
     Se abre y cierra con el botón; se cierra al elegir un link, con Escape,
     al tocar fuera del header o al pasar a una pantalla ancha. */
  const toggle = $('#navToggle');
  if (toggle) {
    const setMenu = open => {
      hdr.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', () => setMenu(!hdr.classList.contains('is-open')));
    $$('.nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && hdr.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', e => {
      if (hdr.classList.contains('is-open') && !hdr.contains(e.target)) setMenu(false);
    });
    window.matchMedia('(min-width: 821px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  }

  if (!('IntersectionObserver' in window)) return;

  /* ---------- Entrada suave ---------- */
  document.documentElement.classList.add('js');
  const reveal = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
  }), { threshold: .1, rootMargin: '0px 0px -6% 0px' });
  $$('[data-r]').forEach(el => reveal.observe(el));

  /* ---------- Menú: marca la sección donde estás ---------- */
  const links = new Map($$('.nav a').map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach((a, id) => {
      const on = id === e.target.id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));
})();