import { TWO_PI } from 'constant';
import AnimatedCanvas from './AnimatedCanvas';

type Star = {
  x: number;
  y: number;
  readonly vx: number;
  readonly vy: number;
  readonly radius: number;
  readonly opacity: number;
};

export default class Constelation extends AnimatedCanvas {
  private readonly maxStars: number;
  private readonly maxJoinDistance: number;
  private readonly stars: Star[];

  private constructor() {
    super();
    this.maxStars = 200;
    this.maxJoinDistance = 100;
    this.stars = Array.from({ length: this.maxStars }, () => this.spawnStar());
  }

  protected draw(): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      this.updateStar(star);
      this.drawStar(star);
    }

    this.drawStarsConnections();
  }

  private updateStar(star: Star): void {
    star.x += star.vx;
    star.y += star.vy;

    // Wrap around edges
    if (star.x < 0) star.x = this.width;
    if (star.x > this.width) star.x = 0;
    if (star.y < 0) star.y = this.height;
    if (star.y > this.height) star.y = 0;
  }

  private drawStar(star: Star) {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, TWO_PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 5;
    ctx.fill();
  }

  private drawStarsConnections(): void {
    const ctx = this.ctx;
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
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    }
  }

  // private drawStarsConnections(): void {
  //   const ctx = this.ctx;

  //   for (let i = 0; i < this.stars.length; i++) {
  //     for (let j = i + 1; j < this.stars.length; j++) {
  //       const dx = this.stars[i].x - this.stars[j].x;
  //       const dy = this.stars[i].y - this.stars[j].y;
  //       const dist = Math.sqrt(dx * dx + dy * dy);

  //       if (dist < this.maxJoinDistance) {
  //         const alpha = 1 - dist / this.maxJoinDistance;
  //         ctx.beginPath();
  //         ctx.moveTo(this.stars[i].x, this.stars[i].y);
  //         ctx.lineTo(this.stars[j].x, this.stars[j].y);
  //         ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
  //         ctx.lineWidth = 0.5;
  //         ctx.stroke();
  //       }
  //     }
  //   }
  // }

  private spawnStar(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight): Star {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    };
  }

  private handleCanvasClick(e: MouseEvent): void {
    console.log('click !');
    this.stars.push(this.spawnStar(e.clientX, e.clientY));
  }

  protected setupListeners(): void {
    super.setupListeners();
    this.addEventListener('click', (e: MouseEvent) => this.handleCanvasClick(e));
  }
}
