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

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.8 + 0.2;
    this.alpha = Math.random() * 0.5 + 0.5;
  }

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