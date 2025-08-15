import { TWO_PI } from 'constant';

type Star = {
  x: number;
  y: number;
  readonly vx: number;
  readonly vy: number;
  readonly radius: number;
  readonly opacity: number;
};

const maxStars = 200;
const maxJoinDistance = 100;
const stars: Star[] = Array.from({ length: maxStars }, () => createStar());

export default function constelation(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const star of stars) {
    // Update stars
    star.x += star.vx;
    star.y += star.vy;

    // Wrap around edges
    if (star.x < 0) star.x = window.innerWidth;
    if (star.x > window.innerWidth) star.x = 0;
    if (star.y < 0) star.y = window.innerHeight;
    if (star.y > window.innerHeight) star.y = 0;

    // Draw stars
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, TWO_PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 5;
    ctx.fill();
  }

  // Draw connections
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxJoinDistance) {
        const alpha = 1 - dist / maxJoinDistance;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function createStar(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight): Star {
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5,
  };
}

function handleClick(e: MouseEvent) {
  stars.push(createStar(e.clientX, e.clientY));
}

window.addEventListener('click', handleClick);
