/* Background block pattern — the same idea as on Lior's page (build.liorpozin.com, canvas.blocks):
   a 24px grid, ~7% of cells hold an 8×12 block that slowly fades in and out; blocks near the
   pointer light up. Colour = border/strong (#686868). Reduced motion: a still pattern. */
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
    for (const b of blocks) {
      const d = Math.hypot(b.x - ptr.x, b.y - ptr.y), near = d < R ? 1 - d / R : 0;
      const a = Math.max(b.a * BASE, near);
      if (a < 0.02) continue;
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
  build(); start();
  addEventListener('resize', () => { build(); still ? draw() : start(); });
  document.addEventListener('visibilitychange', start);
  if (!still) {
    addEventListener('pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });
    document.addEventListener('pointerleave', () => { ptr.x = ptr.y = -9999; });
  }
})();
