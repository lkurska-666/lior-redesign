/* Background block pattern — the same idea as on Lior's page (build.liorpozin.com, canvas.blocks):
   a 24px grid, ~7% of cells hold an 8×12 block that slowly fades in and out; blocks near the
   pointer light up. Colour = border/strong (#686868). Reduced motion: a still pattern.
   Phones (under 768px) have no panel behind the content, so there a block is not drawn where it
   would touch text, a button, a card or an image (Olena 2026-11-24). */
(function () {
  const cv = document.createElement('canvas');
  cv.className = 'f-pattern';
  cv.setAttribute('aria-hidden', 'true');
  document.body.prepend(cv);
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const color = getComputedStyle(document.documentElement).getPropertyValue('--c-line').trim() || '#686868';
  const STEP = 24, W = 8, H = 12, DENSITY = 0.07, BASE = 0.35, R = 140;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let blocks = [], w = 0, h = 0, raf = 0, last = 0;
  const ptr = { x: -9999, y: -9999 };
  const MOBILE = matchMedia('(max-width: 767px)'), PAD = 8;
  let mask = [], maskAt = 0;
  const SOLID = 'img,video,svg,canvas:not(.f-pattern),input,select,textarea,button,a,label';
  function collect() {
    mask = []; maskAt = performance.now();
    if (!MOBILE.matches) return;
    const roots = [...document.querySelectorAll('body > *:not(.f-pattern)')].filter(e => !e.hidden && e.tagName !== 'SCRIPT' && getComputedStyle(e).display !== 'none');
    for (const r of roots) for (const el of r.querySelectorAll('*')) {
      if (el.closest('[hidden]')) continue;
      const cs = getComputedStyle(el);
      const filled = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0;
      const text = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (!(filled || text || el.matches(SOLID))) continue;
      const b = el.getBoundingClientRect();
      if (b.width && b.height && b.bottom > 0 && b.top < h) mask.push([b.left - PAD, b.top - PAD, b.right + PAD, b.bottom + PAD]);
    }
  }
  const covered = (x, y) => { for (const m of mask) if (x + W / 2 > m[0] && x - W / 2 < m[2] && y + H / 2 > m[1] && y - H / 2 < m[3]) return true; return false; };

  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    blocks = [];
    for (let y = STEP / 2; y < h; y += STEP)
      for (let x = STEP / 2; x < w; x += STEP)
        if (Math.random() < DENSITY) { const on = Math.random() < 0.5 ? 1 : 0; blocks.push({ x, y, a: still ? on : 0, t: on }); }
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    if (MOBILE.matches && performance.now() - maskAt > 250) collect();
    for (const b of blocks) {
      const d = Math.hypot(b.x - ptr.x, b.y - ptr.y), near = d < R ? 1 - d / R : 0;
      const a = Math.max(b.a * BASE, near);
      if (a < 0.02 || (mask.length && covered(b.x, b.y))) continue;
      ctx.globalAlpha = a;
      ctx.fillRect(Math.round(b.x - W / 2), Math.round(b.y - H / 2), W, H);
    }
    ctx.globalAlpha = 1;
  }
  function tick(now) {
    raf = 0;
    if (document.hidden) return;
    if (now - last > 120) {
      last = now;
      for (let i = 0; i < Math.max(2, blocks.length / 40); i++) { const b = blocks[Math.random() * blocks.length | 0]; if (b) b.t = Math.random() < 0.5 ? 1 : 0; }
    }
    for (const b of blocks) b.a += (b.t - b.a) * 0.08;
    draw();
    raf = requestAnimationFrame(tick);
  }
  const start = () => { if (still) return draw(); if (!raf) raf = requestAnimationFrame(tick); };
  build(); collect(); start();
  addEventListener('scroll', () => { collect(); if (still) draw(); }, { passive: true, capture: true });
  addEventListener('click', () => setTimeout(() => { collect(); if (still) draw(); }, 50));
  addEventListener('resize', () => { build(); collect(); still ? draw() : start(); });
  document.addEventListener('visibilitychange', start);
  if (!still) {
    addEventListener('pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });
    document.addEventListener('pointerleave', () => { ptr.x = ptr.y = -9999; });
  }
})();
