const fontSize = 14;
const chars =
  'アァイィウヴエカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const dropLen = Math.floor(window.innerWidth / fontSize);
const drops = Array<number>(dropLen).fill(dropLen * fontSize);

export const matrix = (ctx: CanvasRenderingContext2D): void => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);

    if (y > window.innerHeight && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
};
