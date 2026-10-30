/* =====================================================================
   KHARV · selector de idioma (ES / EN)
   El HTML queda en español. Este archivo guarda el original, lo reemplaza
   por el inglés al elegir EN y lo restaura al volver a ES.
   La elección se recuerda en el navegador (localStorage).
   ===================================================================== */
(() => {
  'use strict';

  const KEY = 'kharv-lang';

  /* [selector, texto en inglés, modo]
     modo: 'text' (por defecto), 'html' (si el texto lleva <em>, <br> o <b>) o el nombre de un atributo.
     Si el selector encuentra varios elementos, el texto es una lista en el mismo orden de la página. */
  const T = [
    /* ---------- <head> ---------- */
    ['title', 'KHARV | Everything you imagine can be created.'],
    ['meta[name="description"]', 'Custom web design and development. I turn ideas into digital experiences that combine identity, functionality and security.', 'content'],
    ['meta[property="og:title"]', 'KHARV | Everything you imagine can be created.', 'content'],
    ['meta[property="og:description"]', 'Design, development and security to turn ideas into digital experiences.', 'content'],

    /* ---------- Header ---------- */
    ['#nav', 'Main', 'aria-label'],
    ['.hdr__logo img', 'KHARV, home', 'alt'],
    ['.nav a', ['Services', 'Security', 'Process', 'Project', 'About me', 'Contact']],
    ['.hdr__in .btn--sm', 'Message me'],
    ['.lang', 'Language', 'aria-label'],

    /* ---------- Inicio ---------- */
    ['#inicio .eyebrow', 'Design · Development · Security'],
    ['#inicio h1', 'Everything you imagine, <em>can be created.</em>', 'html'],
    ['#inicio .lead', 'I design and develop custom websites, combining visual identity, functionality and technology to turn ideas into digital experiences.'],
    ['#inicio .note', 'Every idea has a shape. Every detail, a purpose.'],

    /* ---------- Servicios ---------- */
    ['#servicios .tag', 'Services'],
    ['#servicios h2', 'Every idea needs <em>its own shape.</em>', 'html'],
    ['#servicios .lead', 'I build custom digital solutions, taking care of every aspect of the project: from its visual identity to how it works.'],
    ['#servicios .list li', [
      'Web design with its own identity',
      'Custom website development',
      'Experiences adapted to phones, tablets and computers',
      'Interactions and dynamic elements',
      'Forms and contact channels',
      'Clean, maintainable code',
      'Security best practices'
    ]],

    /* ---------- Seguridad ---------- */
    ['#seguridad .tag', 'Security'],
    ['#seguridad h2', 'Trust is also built <em>from the inside.</em>', 'html'],
    ['#seguridad .lead', 'A good digital experience doesn’t end at what you see. How each site is built matters too. That’s why security and best practices are part of development from day one.'],
    ['#seguridad .list li', [
      'Secure development best practices',
      'Data validation and form protection',
      'Measures to reduce unwanted automated submissions',
      'Secure connections over HTTPS'
    ]],

    /* ---------- Proceso ---------- */
    ['#proceso .tag', 'Process'],
    ['#proceso h2', 'From an idea <br> to <em>making it real.</em>', 'html'],
    ['#proceso .lead', 'Every project has its own path. I work on each stage to turn an initial idea into a functional digital experience with its own identity.'],
    ['#proceso .steps b', ['Conversation', 'Design', 'Development', 'Launch']],
    ['#proceso .steps span', [
      'Getting to know your idea and understanding what you need.',
      'Defining the visual identity and the structure.',
      'Turning the design into a working site.',
      'Checking the details and putting the project online.'
    ]],

    /* ---------- Proyecto ---------- */
    ['#proyecto .tag', 'Featured project'],
    ['#proyecto h2', 'Ideas also become <em>experiences.</em>', 'html'],
    ['#proyecto .lead', [
      'Evermore English Academy is a website built for an English teacher, with its own visual identity and an experience designed to present her educational offering.',
      'It includes a four-step enrollment form that sends the information straight to email.'
    ]],
    ['#proyecto .chips li', ['Design', 'Development', 'Forms', 'Security']],
    ['#proyecto a.btn', 'Explore project'],
    ['#proyecto .browser img', 'Evermore English Academy on a computer', 'alt'],
    ['#proyecto .tablet img', 'Evermore English Academy on a tablet', 'alt'],
    ['#proyecto .phone img', 'Evermore English Academy on a phone', 'alt'],

    /* ---------- Quién soy ---------- */
    ['#quien-soy .portrait img', 'Portrait of the person behind KHARV', 'alt'],
    ['#quien-soy .tag', 'About me'],
    ['#quien-soy h2', 'Behind every project, <em>a person.</em>', 'html'],
    ['#quien-soy .lead', 'I’m the person behind KHARV. I work in web design and development, creating digital experiences that combine aesthetics, functionality and technology.'],
    ['#quien-soy .about__p', [
      'I’m currently studying the University Technical Degree in Programming at UTN and complementing my training with courses at EducaciónIT.',
      'I work personally on every project, taking care of each stage of the process to turn ideas into websites designed around each need.'
    ]],
    ['#quien-soy .chips li', ['Continuous learning', 'Custom development', 'Personal attention']],

    /* ---------- Contacto ---------- */
    ['#contacto .eyebrow', 'Design · Development · Security'],
    ['#contacto h2', 'What do you imagine <em>creating?</em>', 'html'],
    ['#contacto .lead', 'Every great idea starts with a conversation. Tell me what you have in mind and let’s start giving it shape.'],
    ['#contacto [data-wa]', 'Message me on WhatsApp'],

    /* ---------- Footer ---------- */
    ['.ftr span', 'Designed and developed by <b>KHARV</b>', 'html']
  ];

  /* Mensajes de WhatsApp y mail en inglés */
  const EN_MSG = {
    wa: 'Hello KHARV, I would like to inquire about a website.',
    subject: 'Website inquiry',
    body: 'Hello KHARV,\n\nI would like to inquire about a website.\n\nMy name:\nMy idea:\n\nThank you.'
  };

  /* ---------- Guardar el original (español) de cada elemento ---------- */
  const read = (el, mode) =>
    mode === 'html' ? el.innerHTML :
    mode === 'text' ? el.textContent :
    el.getAttribute(mode);

  const write = (el, mode, value) => {
    if (value == null) return;
    if (mode === 'html') el.innerHTML = value;
    else if (mode === 'text') el.textContent = value;
    else el.setAttribute(mode, value);
  };

  const nodes = [];
  T.forEach(([sel, en, mode = 'text']) => {
    const list = Array.isArray(en) ? en : [en];
    document.querySelectorAll(sel).forEach((el, i) => {
      if (list[i] === undefined) return;
      nodes.push({ el, mode, es: read(el, mode), en: list[i] });
    });
  });

  /* ---------- Links de WhatsApp y mail según el idioma ---------- */
  const setLinks = lang => {
    const en = lang === 'en';
    const msg = en ? EN_MSG.wa : (typeof WHATSAPP_MSG !== 'undefined' ? WHATSAPP_MSG : '');
    const subject = en ? EN_MSG.subject : (typeof MAIL_SUBJECT !== 'undefined' ? MAIL_SUBJECT : '');
    const body = en ? EN_MSG.body : (typeof MAIL_BODY !== 'undefined' ? MAIL_BODY : '');

    if (typeof WHATSAPP_NUMBER !== 'undefined' && /^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      document.querySelectorAll('[data-wa]').forEach(a => {
        a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      });
    }

    const mail = document.getElementById('mailBtn');
    if (mail && typeof MAIL_TO !== 'undefined') {
      const s = encodeURIComponent(subject);
      const b = encodeURIComponent(body);
      mail.href = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL_TO)}&su=${s}&body=${b}`
        : `mailto:${MAIL_TO}?subject=${s}&body=${b}`;
    }
  };

  /* ---------- Cambiar de idioma ---------- */
  const buttons = [...document.querySelectorAll('.lang__btn')];

  const apply = (lang, persist) => {
    nodes.forEach(n => write(n.el, n.mode, lang === 'en' ? n.en : n.es));
    document.documentElement.lang = lang;
    setLinks(lang);
    buttons.forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    if (persist) { try { localStorage.setItem(KEY, lang); } catch (e) { /* sin storage: no pasa nada */ } }
  };

  buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.lang, true)));

  /* Al cargar: si había elegido inglés, se aplica. Si no, queda en español. */
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* ignorar */ }
  if (saved === 'en') apply('en', false);
})();