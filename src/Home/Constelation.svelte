<script lang="ts">
  import { TWO_PI } from 'constant';
  import { onMount } from 'svelte';
  import PerfMon from 'utils/PerfMon';

  import type { Props } from 'types';

  type Point = {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };

  const FPS_TARGET = 33;
  const FRAME_DURATION = 1000 / FPS_TARGET;

  const { width, height }: Props = $props();

  let ctx: CanvasRenderingContext2D;
  let canvas: HTMLCanvasElement;

  let animationFrameId: number;
  const perfMon = new PerfMon();
  const maxPoints = 150;
  const points: Point[] = [];
  const connectionDistance = 100;

  onMount(() => {
    ctx = canvas.getContext('2d', { alpha: false })!;
    if (!ctx) throw new Error('Could not get CanvasRenderingContext2D');
    animationFrameId = window.requestAnimationFrame(animatePoints);
    return () => window.cancelAnimationFrame(animationFrameId);
  });

  let lastTime = 0;
  function animatePoints(timestamp: number) {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime;
    if (dt <= FRAME_DURATION) return window.requestAnimationFrame(animatePoints);

    updatePoints();
    perfMon.update(dt);
    drawPoints();
    perfMon.draw(ctx);

    lastTime = timestamp - (dt % FRAME_DURATION);
    animationFrameId = window.requestAnimationFrame(animatePoints);
  }

  function updatePoints() {
    if (points.length < maxPoints) {
      points.push(spawnPoint());
    }

    for (let i = points.length - 1; i >= 0; i--) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
        points.splice(i, 1);
      }
    }
  }

  function drawPoints() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          ctx.beginPath();
          const alpha = 1 - dist / connectionDistance;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw points
    // for (const p of points) {
    //   ctx.fillStyle = '#ffffff';
    //   ctx.beginPath();
    //   ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    //   ctx.fill();
    // }

    // Draw points
    const radius = 2;
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    for (const p of points) {
      ctx.moveTo(p.x + radius, p.y);
      ctx.arc(p.x, p.y, radius, 0, TWO_PI);
    }
    ctx.fill();
  }

  function spawnPoint(): Point {
    // Spawn offscreen (left/right/top/bottom)
    const edge = Math.floor(Math.random() * 4);
    let x = 0,
      y = 0;
    const speed = 0.5 + Math.random() * 1.5;

    switch (edge) {
      case 0: // left
        x = -10;
        y = Math.random() * height;
        break;
      case 1: // right
        x = width + 10;
        y = Math.random() * height;
        break;
      case 2: // top
        x = Math.random() * width;
        y = -10;
        break;
      case 3: // bottom
        x = Math.random() * width;
        y = height + 10;
        break;
    }

    // Velocity towards center with slight randomness
    const angle = Math.atan2(height / 2 - y, width / 2 - x) + (Math.random() - 0.5) * 0.5;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    return { x, y, vx, vy };
  }
</script>

<canvas {width} {height} bind:this={canvas}></canvas>

<style>
  canvas {
    display: block;
    background: #000;
  }
</style>
