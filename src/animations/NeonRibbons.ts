import AnimatedCanvas from './AnimatedCanvas';

class RibbonPoint {
  constructor(
    public x = Math.random() * window.innerWidth,
    public y = Math.random() * window.innerHeight,
    public angle = Math.random() * (Math.PI * 2),
    public speed = 0.5 + Math.random() * 1.5,
  ) {}
}

export default class NeonRibbons extends AnimatedCanvas {
  private readonly points: RibbonPoint[];
  private readonly maxPoints = 50;

  private constructor() {
    super();
    this.points = Array.from({ length: this.maxPoints }, () => new RibbonPoint());
  }

  protected draw() {
    this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // trails
    this.canvasCtx.fillRect(0, 0, this.width, this.height);

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
      this.canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;

      this.canvasCtx.beginPath();
      this.canvasCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      this.canvasCtx.fill();
    }
  }
}
