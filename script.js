const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

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
    // Start particles above the screen for a gradual entrance
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.8 + 0.2;
    this.alpha = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.y += this.speedY;

    // Fade in slightly while falling
    if (this.alpha < 1) this.alpha += 0.005;

    if (this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 128, ${this.alpha})`;
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 150; i++) {
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