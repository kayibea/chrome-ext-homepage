import AnimatedCanvas from './AnimatedCanvas';

class RibbonPoint {
  constructor(public x: number, public y: number, public angle: number, public speed: number) {}
}

export default class NeonRibbons extends AnimatedCanvas {
  private readonly points: RibbonPoint[] = [];
  private readonly count = 50;

  private constructor() {
    super();
    for (let i = 0; i < this.count; i++) {
      this.points.push(
        new RibbonPoint(
          Math.random() * this.width,
          Math.random() * this.height,
          Math.random() * Math.PI * 2,
          0.5 + Math.random() * 1.5,
        ),
      );
    }
  }

  protected draw() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // trails
    ctx.fillRect(0, 0, this.width, this.height);

    for (const p of this.points) {
      // move point along angle
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;

      // wrap around edges
      if (p.x < 0) p.x += this.width;
      if (p.x > this.width) p.x -= this.width;
      if (p.y < 0) p.y += this.height;
      if (p.y > this.height) p.y -= this.height;

      // update angle slightly for smooth curves
      p.angle += (Math.random() - 0.5) * 0.2;

      // glowing neon color
      const hue = (Date.now() / 50 + p.x + p.y) % 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
