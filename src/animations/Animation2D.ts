export type Animation2DConstructor = new (...args: any[]) => Animation2D;

export default abstract class Animation2D {
  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public setupListeners(): void {}
}
