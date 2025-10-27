/* ---------- Typing header ---------- */
const siteNameEl = document.querySelector('.site-name');
const headerText = '> TESTING SITE';
let idx = 0;

function typeHeader() {
  if (idx < headerText.length) {
    siteNameEl.textContent += headerText.charAt(idx);
    idx++;
    setTimeout(typeHeader, 80);
  } else {
    siteNameEl.classList.add('cursor');
  }
}

/* ---------- Particles (canvas) ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let W = window.innerWidth;
let H = window.innerHeight;
let particles = [];
const PARTICLE_COUNT = 32; // calm amount

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    // start above the screen (negative y) so they drop in gradually
    this.y = -Math.random() * H - 10;
    this.size = Math.random() * 2 + 0.6; // tiny
    this.speedY = Math.random() * 0.35 + 0.05; // slow drift
    this.alpha = Math.random() * 0.4 + 0.15; // start faint
    // a small horizontal wobble base
    this.wobble = (Math.random() - 0.5) * 0.4;
  }
  update(tiltX=0, tiltY=0) {
    // apply vertical fall plus tiny tilt influence
    this.y += this.speedY + tiltY * 0.12;
    // horizontal movement influenced by tilt + wobble
    this.x += this.wobble + tiltX * 0.12;
    // fade in slowly as it falls
    if (this.alpha < 1) this.alpha = Math.min(1, this.alpha + 0.003);

    // when below screen, reset to above
    if (this.y > H + 10) {
      this.reset();
      // give it a new x near the top each reset
      this.x = Math.random() * W;
    }
    // wrap horizontally
    if (this.x > W + 10) this.x = -10;
    if (this.x < -10) this.x = W + 10;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0,255,136,${this.alpha})`;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

/* create particles but don't animate them until after text */
function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

/* tilt variables */
let tiltX = 0, tiltY = 0;
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (e) => {
    // gamma: left/right, beta: front/back
    // clamp and normalize gently
    tiltX = (e.gamma || 0) / 25;
    tiltY = (e.beta  || 0) / 40;
  }, true);
}

/* animate only when started */
let animRunning = false;
function animateParticles() {
  if (!animRunning) return;
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.update(tiltX, tiltY);
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}

/* ---------- Start sequence ---------- */
window.addEventListener('load', () => {
  // start typing header
  typeHeader();

  // start particles after the content fade-in completes
  // safe delay ~2600ms (matches CSS animation delays)
  setTimeout(() => {
    initParticles();
    animRunning = true;
    animateParticles();
  }, 2600);
});