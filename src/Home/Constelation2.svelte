<script lang="ts">
  import { onMount } from 'svelte';
  import type { Props } from 'types';
  import PerfMon from 'utils/PerfMon';

  type Star = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
  };

  const FPS_TARGET = 33;
  const FRAME_DURATION = 1000 / FPS_TARGET;

  const { width, height }: Props = $props();

  let ctx: CanvasRenderingContext2D;
  let canvas: HTMLCanvasElement;
  let animationFrameId: number;
  const perfM = new PerfMon();

  const maxStars = 200;
  const stars: Star[] = [];
  const abortController = new AbortController();

  onMount(() => {
    ctx = canvas.getContext('2d', { alpha: false })!;
    if (!ctx) throw new Error('Could not get CanvasRenderingContext2D');

    initStars();

    animationFrameId = window.requestAnimationFrame(animateStarts);
    window.addEventListener('click', clickHandler, { signal: abortController.signal });
    return () => {
      abortController.abort();
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  function clickHandler(e: MouseEvent) {
    stars.push(createStar(e.clientX, e.clientY));
  }

  let lastTime = 0;
  function animateStarts(timestamp: number) {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime;
    if (dt <= FRAME_DURATION) return window.requestAnimationFrame(animateStarts);

    ctx.clearRect(0, 0, width, height);
    updateStars();
    perfM.update(dt);
    drawConnections();
    drawStars();
    perfM.draw(ctx);

    lastTime = timestamp - (dt % FRAME_DURATION);
    animationFrameId = window.requestAnimationFrame(animateStarts);
  }

  function createStar(x = Math.random() * width, y = Math.random() * height): Star {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    };
  }

  function initStars(count = maxStars) {
    for (let i = 0; i < count; i++) {
      stars.push(createStar());
    }
  }

  function updateStars() {
    for (const star of stars) {
      star.x += star.vx;
      star.y += star.vy;

      // Wrap around edges
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
    }
  }

  function drawStars() {
    ctx.save();
    for (const star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 5;
      ctx.fill();
    }
    ctx.restore();
  }

  function drawConnections() {
    const maxDistance = 100;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
</script>

<canvas {width} {height} bind:this={canvas}></canvas>

<style>
  canvas {
    display: block;
    background-color: black;
  }
</style>
