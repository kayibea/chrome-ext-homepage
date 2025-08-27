import AnimatedCanvas from './AnimatedCanvas';
import { KATAKANA_ALNUM_CHARS } from 'constant';

const chars = KATAKANA_ALNUM_CHARS.split('');

export default class Matrix extends AnimatedCanvas {
  private readonly fontSize = 20;
  private readonly drops: Uint16Array;

  private constructor() {
    super();

    const dropLen = Math.floor(window.innerWidth / this.fontSize);
    const dataArray = new Uint16Array(dropLen);
    for (let i = 0; i < dropLen; i++)
      //
      dataArray[i] = dropLen * this.fontSize;

    this.drops = dataArray;
  }

  protected draw(): void {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = '#0F0';
    ctx.font = this.fontSize + 'px monospace';

    for (let i = 0; i < this.drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      ctx.fillText(char, x, y);

      if (y > window.innerHeight && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }
}
