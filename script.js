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
    // add cursor class to blink
    siteNameEl.classList.add('cursor');
  }
}

/* ---------- Particles (canvas) ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = innerWidth;
let H = innerHeight;
let particles = [];
const PARTICLE_COUNT = 28; // calm amount

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 2 + 0.6; // tiny dots
    this.speedY = Math.random() * 0.4 + 0.05; // slower drift
    this.alpha = Math.random() * 0.5 + 0.35;
  }
  update(tiltX=0, tiltY=0) {
    this.y += this.speedY + tiltY * 0.15;
    this.x += tiltX * 0.15;
    if (this.y > H + 10) { this.x = Math.random()*W; this.y = -10; } // re-enter from top
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

/* initialize particles array */
function initParticles() {
  particles = [];
  for (let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());
}

/* tilt variables */
let tiltX = 0, tiltY = 0;
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (e) => {
    // e.gamma left/right, e.beta front/back
    tiltX = (e.gamma || 0) / 30;
    tiltY = (e.beta  || 0) / 40;
  });
}

/* animate */
let animRunning = false;
function animateParticles() {
  if (!animRunning) return;
  ctx.clearRect(0,0,W,H);
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

  // ensure particles start AFTER the fade-in animations finish
  // total animation delay (main-title 0.6s + 1s, mono 1.0s +1s, button 1.4s +1s) => safe delay ~2600ms
  setTimeout(() => {
    initParticles();
    animRunning = true;
    animateParticles();
  }, 2600);
});