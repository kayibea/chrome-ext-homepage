import './style.css';
import { animations } from './animations';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d')!;

const animationIndex = Math.floor(Math.random() * animations.length);
const animationDrawFn = animations[animationIndex];

let lastTime = 0;
const fpsInterval = 1000 / 60; // 60fps cap

requestAnimationFrame(animate);

function animate(timestamp: number): void {
  if (timestamp - lastTime >= fpsInterval) {
    lastTime = timestamp;
    animationDrawFn(ctx);
  }
  requestAnimationFrame(animate);
}
