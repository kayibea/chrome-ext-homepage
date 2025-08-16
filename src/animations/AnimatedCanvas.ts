export default abstract class AnimatedCanvas extends HTMLCanvasElement {
  public static readonly customName = 'animated-canvas';
  private lastTime: number;
  public readonly id: string = 'canvas';
  private readonly fpsInterval: number;
  protected readonly ctx: CanvasRenderingContext2D;
  private readonly loopFn: typeof this.loop;

  protected constructor() {
    super();
    this.lastTime = 0;
    this.fpsInterval = 1000 / 60;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = this.getContext('2d')!;

    this.loopFn = this.loop.bind(this);
  }

  protected abstract draw(): void;
  protected setupListeners(): void {}

  private loop(timestamp: number): void {
    if (timestamp - this.lastTime >= this.fpsInterval) {
      this.lastTime = timestamp;
      this.draw();
    }

    requestAnimationFrame(this.loopFn);
  }

  public connectedCallback(): void {
    this.setupListeners();
    requestAnimationFrame(this.loopFn);
    console.log('AnimatedCanvas was added to the DOM');
  }
}
