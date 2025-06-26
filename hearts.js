const canvas = document.createElement('canvas');
canvas.className = 'hearts-rain';
document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const hearts = [];
const heartEmoji = ['❤️', '💖', '💗', '💜', '💘', '💝', '💓', '🩷'];

function randomHeart() {
  return heartEmoji[Math.floor(Math.random() * heartEmoji.length)];
}

for (let i = 0; i < 30; i++) {
  const size = 24 + Math.random() * 24;
  hearts.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size,
    speed: 0.5 + (size / 48),
    emoji: randomHeart(),
    drift: (Math.random() - 0.5) * 0.5,
    parallax: 0.2 + (size / 60)
  });
}

let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

const ctx = canvas.getContext('2d');
function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    const parallaxY = h.y + scrollY * h.parallax;
    ctx.font = `${h.size}px serif`;
    ctx.globalAlpha = 0.85;
    ctx.fillText(h.emoji, h.x, parallaxY);
    h.y += h.speed;
    h.x += h.drift;
    if (h.y > canvas.height + 40) {
      h.y = -40;
      h.x = Math.random() * canvas.width;
      h.emoji = randomHeart();
    }
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();