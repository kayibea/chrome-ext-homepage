import { TWO_PI } from 'constant';
import AnimatedCanvas from './AnimatedCanvas';

class Star {
  constructor(
    public x = Math.random() * window.innerWidth,
    public y = Math.random() * window.innerHeight,
    public readonly vx = (Math.random() - 0.5) * 0.5,
    public readonly vy = (Math.random() - 0.5) * 0.5,
    public readonly radius = Math.random() * 2 + 1,
    public readonly opacity = Math.random() * 0.5 + 0.5,
  ) {}

  public update(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 5;
    ctx.fill();
  }
}

export default class Constelation extends AnimatedCanvas {
  private readonly stars: Star[];
  private readonly maxStars = 200;
  private readonly maxJoinDistance = 100;

  private constructor() {
    super();
    this.stars = Array.from({ length: this.maxStars }, () => new Star());
  }

  protected draw(): void {
    this.canvasCtx.clearRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      star.update(this.width, this.height);
      star.draw(this.canvasCtx);
    }

    this.drawStarsConnections();
  }

  private drawStarsConnections(): void {
    const cellSize = this.maxJoinDistance;
    const cols = Math.ceil(this.width / cellSize);
    const rows = Math.ceil(this.height / cellSize);

    // one flat array of buckets
    const buckets: Star[][] = Array.from({ length: cols * rows }, () => []);

    // put stars into buckets
    for (const star of this.stars) {
      const col = Math.floor(star.x / cellSize);
      const row = Math.floor(star.y / cellSize);
      const index = row * cols + col;
      buckets[index].push(star);
    }

    // check connections
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const bucket = buckets[index];

        if (bucket.length === 0) continue;

        // collect this bucket + 8 neighbors
        const neighbors: Star[] = [];
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
            neighbors.push(...buckets[r * cols + c]);
          }
        }

        // connect stars
        for (const star of bucket) {
          for (const other of neighbors) {
            if (star === other) continue;

            const dx = star.x - other.x;
            if (Math.abs(dx) > this.maxJoinDistance) continue;

            const dy = star.y - other.y;
            if (Math.abs(dy) > this.maxJoinDistance) continue;

            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.maxJoinDistance) {
              const alpha = 1 - dist / this.maxJoinDistance;
              this.canvasCtx.beginPath();
              this.canvasCtx.moveTo(star.x, star.y);
              this.canvasCtx.lineTo(other.x, other.y);
              this.canvasCtx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
              this.canvasCtx.lineWidth = 0.5;
              this.canvasCtx.stroke();
            }
          }
        }
      }
    }
  }

  private handleCanvasClick(e: MouseEvent): void {
    console.log('click !');
    this.stars.push(new Star(e.clientX, e.clientY));
  }

  protected setupListeners(): void {
    super.setupListeners();
    this.addEventListener('click', (e: MouseEvent) => this.handleCanvasClick(e));
  }
}
