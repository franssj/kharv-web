/* =====================================================================
   KHARV · selector de idioma (ES / EN)
   El HTML queda en español. Este archivo guarda el original, lo reemplaza
   por el inglés al elegir EN y lo restaura al volver a ES.
   La elección se recuerda en el navegador (localStorage).

   Cada texto traducible lleva una clave en el HTML:
     data-i18n="clave"          → reemplaza el texto
     data-i18n-html="clave"     → reemplaza el HTML (si lleva <em>, <br> o <b>)
     data-i18n-attr="alt:clave" → reemplaza atributos (varios: "alt:a; title:b")
   Si una clave del HTML no existe acá, el texto queda en español y se avisa en la consola.
   ===================================================================== */
(() => {
  'use strict';

  const KEY = 'kharv-lang';

  const EN = {
    /* ---------- <head> ---------- */
    'meta.title': 'KHARV · Custom web design and development | Everything you imagine can be created.',
    'meta.desc': 'Custom web design and development: websites with their own identity, adapted to any device and built with security best practices.',
    'og.title': 'KHARV | Everything you imagine can be created.',
    'og.desc': 'Design, development and security to turn ideas into digital experiences.',

    /* ---------- Header ---------- */
    'skip': 'Skip to content',
    'logo.alt': 'KHARV, home',
    'nav.label': 'Main',
    'nav.svc': 'Services',
    'nav.sec': 'Security',
    'nav.proc': 'Process',
    'nav.proj': 'Project',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'hdr.wa': 'Message me',
    'lang.label': 'Language',

    /* ---------- Inicio ---------- */
    'hero.eyebrow': 'Design · Development · Security',
    'hero.title': 'Everything you imagine, <em>can be created.</em>',
    'hero.lead': 'I design and develop custom websites, combining visual identity, functionality and technology to turn ideas into digital experiences.',
    'hero.note': 'Every idea has a shape. Every detail, a purpose.',
    'hero.wa': 'Message me on WhatsApp',
    'hero.proj': 'See project',

    /* ---------- Servicios ---------- */
    'svc.tag': 'Services',
    'svc.title': 'Every idea needs <em>its own shape.</em>',
    'svc.lead': 'I design and develop custom websites for professionals, small businesses and brands that want to present themselves online with their own identity. Each project is shaped around what you need to communicate.',
    'svc.make.t': 'What I can create',
    'svc.make.1': 'Presentation websites for professionals and small businesses',
    'svc.make.2': 'Pages to showcase a service, a product or an offering',
    'svc.make.3': 'Multi-section websites with all the information about your project',
    'svc.make.4': 'Websites with contact, inquiry or enrollment forms',
    'svc.inc.t': 'What every website includes',
    'svc.inc.1': 'Web design with its own identity',
    'svc.inc.2': 'Custom website development',
    'svc.inc.3': 'Experiences adapted to phones, tablets and computers',
    'svc.inc.4': 'Clean, maintainable code',
    'svc.inc.5': 'Security best practices',
    'svc.add.t': 'What can be added',
    'svc.add.1': 'Interactions and dynamic elements',
    'svc.add.2': 'Multi-step forms that send the information by email',
    'svc.add.3': 'Direct contact channels via WhatsApp and email',
    'svc.add.4': 'Versions of the website in more than one language',

    /* ---------- Seguridad ---------- */
    'sec.tag': 'Security',
    'sec.title': 'Trust is also built <em>from the inside.</em>',
    'sec.lead': 'A good digital experience doesn’t end at what you see. How each site is built matters too. That’s why security and best practices are part of development from day one.',
    'sec.1': 'Secure development best practices',
    'sec.2': 'Data validation and form protection',
    'sec.3': 'Measures to reduce unwanted automated submissions',
    'sec.4': 'Secure connections over HTTPS',

    /* ---------- Proceso ---------- */
    'proc.tag': 'Process',
    'proc.title': 'From an idea <br> to <em>making it real.</em>',
    'proc.lead': 'Every project has its own path. I work on each stage to turn an initial idea into a functional digital experience with its own identity.',
    'proc.1.t': 'Conversation',
    'proc.1.d': 'Getting to know your idea and understanding what you need.',
    'proc.2.t': 'Design',
    'proc.2.d': 'Defining the visual identity and the structure.',
    'proc.3.t': 'Development',
    'proc.3.d': 'Turning the design into a working site.',
    'proc.4.t': 'Launch',
    'proc.4.d': 'Checking the details and putting the project online.',
    'proc.5.t': 'Ongoing support',
    'proc.5.d': 'Assistance and maintenance after launch, arranged according to each project.',

    /* ---------- Proyecto ---------- */
    'proj.tag': 'Featured project',
    'proj.title': 'Ideas also become <em>experiences.</em>',
    'proj.lead': 'Evermore English Academy is a real project: the website I built for an English teacher who gives private online classes.',
    'proj.need.t': 'The need',
    'proj.need.d': 'To present her teaching offering with its own visual identity and to receive enrollments for her classes.',
    'proj.sol.t': 'The solution',
    'proj.sol.d': 'A custom website that introduces the teacher, her classes and the way she works, with a four-step enrollment form that sends the information straight to email.',
    'proj.feat.t': 'Features',
    'proj.feat.d': 'Details of a responsible adult when the student is under 18, consents, a confirmation with a WhatsApp summary, and a reviews section where each review is checked before it is published.',
    'proj.val.t': 'The value',
    'proj.val.d': 'Visitors get to know the offering and can enroll in a single place, and the teacher receives each enrollment with the information she needs to organize the classes.',
    'proj.chip.1': 'Design',
    'proj.chip.2': 'Development',
    'proj.chip.3': 'Forms',
    'proj.chip.4': 'Security',
    'proj.btn': 'Explore project',
    'proj.alt.pc': 'Evermore English Academy on a computer',
    'proj.alt.tablet': 'Evermore English Academy on a tablet',
    'proj.alt.phone': 'Evermore English Academy on a phone',

    /* ---------- Quién soy ---------- */
    'about.alt': 'Portrait of the person behind KHARV',
    'about.tag': 'About me',
    'about.title': 'Behind every project, <em>a person.</em>',
    'about.lead': 'My name is Francisco and I’m the person behind KHARV. I work in web design and development, creating digital experiences that combine aesthetics, functionality and technology.',
    'about.p1': 'I’m currently studying the University Technical Degree in Programming at UTN and complementing my training with courses at EducaciónIT.',
    'about.p2': 'I work personally on every project, taking care of each stage of the process to turn ideas into websites designed around each need.',
    'about.chip.1': 'Continuous learning',
    'about.chip.2': 'Custom development',
    'about.chip.3': 'Personal attention',

    /* ---------- Preguntas frecuentes ---------- */
    'faq.tag': 'FAQ',
    'faq.title': 'Before we start, <em>a few answers.</em>',
    'faq.1.q': 'How does a project start?',
    'faq.1.a': 'With a conversation over WhatsApp or email. You tell me your idea, what you need and what the website is for, and from there we figure out how to shape it.',
    'faq.2.q': 'What do I need to request a website?',
    'faq.2.a': 'An idea of what you want to communicate is enough. If you already have a logo, texts or photos, they help; if not, we talk about it in our first conversation.',
    'faq.3.q': 'Does the website work on phones?',
    'faq.3.a': 'Yes. Every website is designed and adapted to look and work well on phones, tablets and computers.',
    'faq.4.q': 'Can I have my own domain?',
    'faq.4.a': 'Yes. The website can be published with your own domain, for example yourbrand.com. We arrange it during the launch stage.',
    'faq.5.q': 'Can I request changes after delivery?',
    'faq.5.a': 'Yes. You can message me to ask for changes or adjustments. The scope of each change is discussed case by case.',

    /* ---------- Contacto ---------- */
    'contact.eyebrow': 'Design · Development · Security',
    'contact.title': 'What do you imagine <em>creating?</em>',
    'contact.lead': 'Every great idea starts with a conversation. Tell me what you have in mind and let’s start giving it shape.',
    'contact.wa': 'Message me on WhatsApp',

    /* ---------- Footer ---------- */
    'footer.by': 'Designed and developed by <b>KHARV</b>',

    /* ---------- Página 404 ---------- */
    'nf.meta': 'Page not found | KHARV',
    'nf.tag': 'Error 404',
    'nf.title': 'This page <em>doesn’t exist.</em>',
    'nf.lead': 'The link may be misspelled, or the page may no longer be available.',
    'nf.btn': 'Back to home'
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
  const add = (el, mode, key) => {
    if (!(key in EN)) { console.warn(`i18n: falta la traducción de "${key}"`); return; }
    nodes.push({ el, mode, es: read(el, mode), en: EN[key] });
  };
  document.querySelectorAll('[data-i18n]').forEach(el => add(el, 'text', el.dataset.i18n));
  document.querySelectorAll('[data-i18n-html]').forEach(el => add(el, 'html', el.dataset.i18nHtml));
  document.querySelectorAll('[data-i18n-attr]').forEach(el =>
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) add(el, attr, key);
    }));

  /* ---------- Cambiar de idioma ---------- */
  const buttons = [...document.querySelectorAll('.lang__btn')];

  const apply = (lang, persist) => {
    nodes.forEach(n => write(n.el, n.mode, lang === 'en' ? n.en : n.es));
    document.documentElement.lang = lang;
    buttons.forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    /* script.js escucha este aviso para actualizar los mensajes de WhatsApp y mail */
    document.dispatchEvent(new CustomEvent('kharv:lang', { detail: lang }));
    if (persist) { try { localStorage.setItem(KEY, lang); } catch (e) { /* sin storage: no pasa nada */ } }
  };

  buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.lang, true)));

  /* Al cargar: si había elegido inglés, se aplica. Si no, queda en español. */
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* ignorar */ }
  if (saved === 'en') apply('en', false);
})();
