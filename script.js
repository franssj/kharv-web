/* =====================================================================
   CONFIGURACIÓN (solo valores públicos)
   WhatsApp: número con código de país y sin signos. Ej. Argentina: 5493484000000
   Si el número no tiene entre 10 y 15 dígitos (por ejemplo, si quedan letras
   o símbolos), los botones de WhatsApp quedan ocultos.
   ===================================================================== */
const WHATSAPP_NUMBER = '542931411319';

/* Mail: al tocar el botón se abre un mensaje nuevo con asunto y texto listos */
const MAIL_TO = 'kharv.web@gmail.com';

/* Mensajes precargados de WhatsApp y mail, en cada idioma del sitio */
const MESSAGES = {
  es: {
    wa: 'Hola KHARV, quisiera consultar por una página web.',
    subject: 'Consulta por una página web',
    body: 'Hola KHARV,\n\nQuisiera consultar por una página web.\n\nMi nombre:\nMi idea:\n\nGracias.'
  },
  en: {
    wa: 'Hello KHARV, I would like to inquire about a website.',
    subject: 'Website inquiry',
    body: 'Hello KHARV,\n\nI would like to inquire about a website.\n\nMy name:\nMy idea:\n\nThank you.'
  }
};

(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- WhatsApp y mail ----------
     Todos los botones con data-wa (header, inicio y contacto) abren el chat directo.
     Mail: en computadora abre el redactor de Gmail en una pestaña nueva;
     en celular usa mailto:, que abre la app de mail que tenga el teléfono.
     i18n.js avisa cada cambio de idioma con el evento 'kharv:lang'. */
  const waOk = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mail = $('#mailBtn');

  const setContact = lang => {
    const m = MESSAGES[lang] || MESSAGES.es;
    $$('[data-wa]').forEach(a => {
      if (!waOk) { a.hidden = true; return; }
      a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m.wa)}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
    if (mail) {
      const subject = encodeURIComponent(m.subject);
      const body = encodeURIComponent(m.body);
      if (desktop) {
        mail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL_TO)}&su=${subject}&body=${body}`;
        mail.target = '_blank';
        mail.rel = 'noopener noreferrer';
      } else mail.href = `mailto:${MAIL_TO}?subject=${subject}&body=${body}`;
    }
  };
  setContact('es');
  document.addEventListener('kharv:lang', e => setContact(e.detail));

  /* ---------- Imágenes que no cargan: se ocultan y queda el fondo del marco ---------- */
  $$('main img').forEach(img => {
    const hide = () => img.classList.add('is-broken');
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  /* ---------- Header: fondo sólido al scrollear ---------- */
  const hdr = $('#hdr');
  const onScroll = () => hdr.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú en celular y tablet: fila deslizable ----------
     Marca si quedan links ocultos a cada lado (para el desvanecido del borde). */
  const nav = $('#nav');
  const edges = () => {
    const max = nav.scrollWidth - nav.clientWidth;
    nav.classList.toggle('has-more-start', nav.scrollLeft > 4);
    nav.classList.toggle('has-more-end', nav.scrollLeft < max - 4);
  };
  edges();
  nav.addEventListener('scroll', edges, { passive: true });
  window.addEventListener('resize', edges, { passive: true });
  if (document.fonts) document.fonts.ready.then(edges);

  /* Si el link de la sección activa quedó fuera de la fila, la desliza hasta mostrarlo */
  const keepInView = a => {
    if (nav.scrollWidth <= nav.clientWidth) return;
    const n = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
    if (r.left < n.left) nav.scrollBy({ left: r.left - n.left - 24 });
    else if (r.right > n.right) nav.scrollBy({ left: r.right - n.right + 24 });
  };

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
      if (on) { a.setAttribute('aria-current', 'true'); keepInView(a); } else a.removeAttribute('aria-current');
    });
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));
})();
