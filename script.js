const themeBtn = document.getElementById("themeBtn");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

function setTheme(mode) {
  document.body.classList.toggle("light", mode === "light");
  localStorage.setItem("theme", mode);
}

const saved = localStorage.getItem("theme");
if (saved) setTheme(saved);

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h, particles;

function resize() {
  w = canvas.width = window.innerWidth * devicePixelRatio;
  h = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  init();
}

function init() {
  const count = Math.floor(Math.min(window.innerWidth, 1200) / 10);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
    r: (Math.random() * 1.6 + 0.6) * devicePixelRatio
  }));
}

function step() {
  ctx.clearRect(0, 0, w, h);

  // dots
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,210,255, 0.75)";
    ctx.fill();
  }

  // lines (connect nearby dots)
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140 * devicePixelRatio) {
        ctx.strokeStyle = `rgba(124,92,255,${(1 - dist / (140*devicePixelRatio)) * 0.25})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}

window.addEventListener("resize", resize);
resize();
step();

(() => {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  // Cursor position (in canvas pixels). null when cursor leaves window.
  const mouse = { x: null, y: null };

  // Tweak these to change the feel
  const SETTINGS = {
    density: 5000,      // smaller = more particles
    maxSpeed: 0.35,     // drift speed
    repulseRadius: 140, // how close cursor has to be
    repulseStrength: 2.2, // how strongly particles get pushed
    linkRadius: 120,    // draw faint lines between nearby particles
    friction: 0.98      // lower = more “floaty”, higher = more “snappy”
  };

  let w, h, dpr, particles = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for performance
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const count = Math.floor((window.innerWidth * window.innerHeight) / SETTINGS.density);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SETTINGS.maxSpeed * dpr,
      vy: (Math.random() - 0.5) * SETTINGS.maxSpeed * dpr,
      r: (Math.random() * 1.6 + 0.7) * dpr
    }));
  }

  window.addEventListener("resize", resize);

  // Track mouse in the same coordinate system as the canvas (scaled by dpr)
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX * dpr;
    mouse.y = e.clientY * dpr;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // --- update particles ---
    for (const p of particles) {
      // drift
      p.x += p.vx;
      p.y += p.vy;

      // wrap around edges (looks nicer than bouncing)
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // repulsion from mouse
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < SETTINGS.repulseRadius && dist > 0.001) {
          // normalized direction away from cursor
          const nx = dx / dist;
          const ny = dy / dist;

          // stronger push when closer
          const force = (1 - dist / SETTINGS.repulseRadius) * SETTINGS.repulseStrength;

          p.vx += nx * force * dpr * 0.6;
          p.vy += ny * force * dpr * 0.6;
        }
      }

      // apply friction so they settle back into drifting
      p.vx *= SETTINGS.friction;
      p.vy *= SETTINGS.friction;

      // keep speed capped
      const speed = Math.hypot(p.vx, p.vy);
      const cap = SETTINGS.maxSpeed * 6 * dpr;
      if (speed > cap) {
        p.vx = (p.vx / speed) * cap;
        p.vy = (p.vy / speed) * cap;
      }
    }

    // --- draw connecting lines ---
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < SETTINGS.linkRadius * dpr) {
          const alpha = (1 - dist / (SETTINGS.linkRadius * dpr)) * 0.55;
          ctx.strokeStyle = `rgba(124,92,255,${alpha})`;
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // --- draw dots on top ---
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(210,220,255,0.75)";
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  resize();
  tick();
})();
