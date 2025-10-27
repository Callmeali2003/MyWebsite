const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 50;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

particles.push({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2 + 1,
  speedX: (Math.random() - 0.5) * 0.1,
  speedY = Math.random() * 0.4 + 0.1;
  opacity: Math.random()
});

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.fillStyle = `rgba(0, 255, 136, ${this.alpha})`;
    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();
// --- Add this at the end of script.js ---

let tiltX = 0;
let tiltY = 0;

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    // event.beta = front/back, event.gamma = left/right tilt
    tiltX = event.gamma / 50; 
    tiltY = event.beta / 50;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 255, 153, 0.8)";
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(draw);
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.alpha = Math.random() * 0.5 + 0.5;
  }
  update() {
    this.y += this.speedY + tiltY * 0.5;
    this.x += tiltX * 0.5;
    if (this.y > canvas.height) this.reset();
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 153, ${this.alpha})`;
    ctx.fill();
  }
}