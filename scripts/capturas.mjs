/* =====================================================================
   KHARV · capturas de los proyectos (herramienta de desarrollo)
   Uso: npm run capturas
   Saca de cada web en vivo: portada en PC (1440×900), portada en celular
   (390×844 a 2x) y dos secciones en PC. Exporta en .webp (con el codificador
   de Chrome, sin dependencias extra) a img/proyectos/<proyecto>/,
   más una versión liviana de cada una y un .jpg de la portada para Open Graph.
   Usa el Chrome instalado (channel: 'chrome'): no descarga navegadores.
   ===================================================================== */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../img/proyectos/', import.meta.url));
const QUALITY = 0.88;

/* Secciones: se buscan por id o por el texto de su título */
const PROJECTS = [
  {
    slug: 'evermore', url: 'https://evermoreacademy.com.ar/',
    sections: [{ name: 'inscripcion', id: 'inscripcion' }, { name: 'servicios', id: 'servicios' }]
  },
  {
    slug: 'transportes-julio', url: 'https://transportes-julio-web.kharv.workers.dev/',
    sections: [{ name: 'cotizador', heading: 'Solicitar presupuesto' }, { name: 'zonas', heading: 'Zonas de cobertura' }]
  },
  {
    slug: 'kharv', url: 'https://kharv.com.ar/',
    sections: [{ name: 'servicios', id: 'servicios' }, { name: 'proceso', id: 'proceso' }]
  }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* Espera fuentes, imágenes visibles y que terminen las animaciones de entrada */
const settle = async (page, extra = 1800) => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter(i => !i.complete && i.loading !== 'lazy')
      .map(i => new Promise(r => { i.onload = i.onerror = r; })));
  });
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); /* Turnstile nunca queda en reposo */
  await sleep(extra);
};

/* Recorre la página para disparar las animaciones con scroll y las imágenes lazy */
const sweep = async page => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); }
  });
};

const open = async (browser, url, mobile) => {
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'es-AR' }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'es-AR' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await settle(page, 2500);
  return { ctx, page };
};

/* PNG → WebP (y versión achicada) usando canvas en una página en blanco */
const encoder = async browser => {
  const page = await browser.newPage();
  return async (png, widths) => page.evaluate(async ({ b64, widths, q }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    return widths.map(w => {
      const c = document.createElement('canvas');
      c.width = w; c.height = Math.round(img.naturalHeight * w / img.naturalWidth);
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return { w, h: c.height, data: c.toDataURL('image/webp', q).split(',')[1] };
    });
  }, { b64: png.toString('base64'), widths, q: QUALITY });
};

const browser = await chromium.launch({ channel: 'chrome' });
const toWebp = await encoder(browser);
const out = [];

const save = async (dir, name, png, full, small) => {
  for (const r of await toWebp(png, [full, small])) {
    const file = `${dir}${name}${r.w === full ? '' : '-' + r.w}.webp`;
    await writeFile(file, Buffer.from(r.data, 'base64'));
    out.push(`${file.slice(ROOT.length)}  ${r.w}×${r.h}`);
  }
};

for (const p of PROJECTS) {
  const dir = `${ROOT}${p.slug}/`;
  await mkdir(dir, { recursive: true });

  /* 1. Portada en PC: lo que se ve al cargar, sin scroll (+ .jpg para Open Graph) */
  const pc = await open(browser, p.url, false);
  await save(dir, 'portada-pc', await pc.page.screenshot(), 1440, 720);
  await writeFile(`${dir}portada-pc.jpg`, await pc.page.screenshot({ type: 'jpeg', quality: 88 }));
  out.push(`${p.slug}/portada-pc.jpg  1440×900`);

  /* 3. Secciones en PC */
  await sweep(pc.page);
  for (const s of p.sections) {
    const top = await pc.page.evaluate(({ id, heading }) => {
      const el = id ? document.getElementById(id)
        : [...document.querySelectorAll('section')].find(x => x.querySelector('h1,h2,h3')?.textContent.trim().startsWith(heading));
      if (!el) return null;
      return el.getBoundingClientRect().top + scrollY;
    }, s);
    if (top == null) throw new Error(`No encontré la sección ${s.name} en ${p.url}`);
    await pc.page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top);
    await settle(pc.page, 1800);
    await save(dir, s.name, await pc.page.screenshot(), 1440, 720);
  }
  await pc.ctx.close();

  /* 2. Portada en celular */
  const mob = await open(browser, p.url, true);
  await save(dir, 'celular', await mob.page.screenshot(), 780, 390);
  await mob.ctx.close();
}

await browser.close();
console.log(out.join('\n'));
