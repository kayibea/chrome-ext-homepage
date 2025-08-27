import AnimatedCanvas from './AnimatedCanvas';

class Particle {
  public vx = 0;
  public vy = 0;

  constructor(public x: number, public y: number, public size: number = 3) {}

  public update(targetX: number, targetY: number) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      const force = 100 / (dist * dist); // gravity strength
      this.vx += (force * dx) / dist;
      this.vy += (force * dy) / dist;
    }

    // some friction
    this.vx *= 0.9;
    this.vy *= 0.9;

    this.x += this.vx;
    this.y += this.vy;
  }
}

export default class NeonRibbonFlow extends AnimatedCanvas {
  private particles: Particle[] = [];
  private readonly count = 200;
  private mouseX = this.width / 2;
  private mouseY = this.height / 2;

  private constructor() {
    super();
    for (let i = 0; i < this.count; i++) {
      this.particles.push(new Particle(Math.random() * this.width, Math.random() * this.height));
    }

    // mouse tracking
    this.addEventListener('mousemove', (e) => {
      const rect = this.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
  }

  protected draw() {
    // semi-transparent overlay for trails
    this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    this.canvasCtx.fillRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      p.update(this.mouseX, this.mouseY);

      // glowing particle
      this.canvasCtx.fillStyle = `hsl(${(p.x + p.y + Date.now() / 10) % 360}, 100%, 50%)`;
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.canvasCtx.fill();
    }
  }
}
