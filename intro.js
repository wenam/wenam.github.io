let canvas;
let ctx;
let particles = [];

document.getElementById('logo').addEventListener('click', enterSite);

function enterSite() {
  const intro = document.getElementById('intro');
  const tornado = document.createElement('div');
  tornado.classList.add('tornado-effect');
  intro.appendChild(tornado);

  document.getElementById('whooshSound').play();

  setTimeout(() => {
    window.location.href = 'home.html';
  }, 2100);
}

function resizeCanvas() {
  canvas = document.getElementById('particles');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 0.8 + 0.3;
    this.color = Math.random() > 0.5 ? 'rgba(255,105,180,0.8)' : 'rgba(255,255,0,0.8)';
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }
}

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles(150);
animateParticles();