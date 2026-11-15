/* =====================================================================
   KHARV · animaciones con GSAP + ScrollTrigger
   GSAP vive en js/vendor/ (versión fija, sin CDN: la CSP solo permite 'self').
   Solo corre si la persona no pidió reducir el movimiento.

   Los elementos que anima GSAP tienen la entrada [data-r] de script.js
   desactivada desde CSS (clase .gsap-on en <html>). Si GSAP no carga,
   la clase nunca se pone y queda la entrada [data-r] de siempre.
   ===================================================================== */
(() => {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  gsap.registerPlugin(ScrollTrigger);

  const BASE = { autoAlpha: 0, y: 28, duration: 0.8, ease: 'power2.out' };
  const root = document.documentElement;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    root.classList.add('gsap-on');

    /* ---------- Títulos de sección: suben con fade al entrar ---------- */
    $$('main section h2[data-r]').forEach(h2 => {
      gsap.from(h2, { ...BASE, scrollTrigger: { trigger: h2, start: 'top 88%', once: true } });
    });

    /* ---------- Tarjetas de proyectos: entran escalonadas ---------- */
    const works = $('.works');
    if (works) {
      gsap.from($$('.pcard', works), {
        ...BASE, y: 36, duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: works, start: 'top 82%', once: true }
      });
    }

    /* ---------- Caso de estudio: título al cargar, capturas al scrollear ---------- */
    const title = $('.cs-title');
    if (title) gsap.from(title, { ...BASE, y: 36, duration: 0.9, delay: 0.1 });

    const gallery = $('.gallery');
    if (gallery) {
      gsap.from($$('figure', gallery), {
        ...BASE, y: 36, duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: gallery, start: 'top 82%', once: true }
      });
    }

    /* al apagarse (p. ej. si cambia la preferencia), GSAP revierte todo y vuelve [data-r] */
    return () => root.classList.remove('gsap-on');
  });

  /* Las fuentes cambian la altura de la página: recalcular los disparadores al cargarlas */
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
