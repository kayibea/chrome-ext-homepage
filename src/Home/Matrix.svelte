<script lang="ts">
  import { onMount } from 'svelte';
  import type { Props } from 'types';
  import PerfMon from 'utils/PerfMon';

  const { width, height }: Props = $props();

  const FPS_TARGET = 33;
  const FRAME_DURATION = 1000 / FPS_TARGET;

  let ctx: CanvasRenderingContext2D;
  let canvas: HTMLCanvasElement;
  let animationFrameId: number;

  const perfM = new PerfMon();
  const fontSize = 14;
  const columns = $derived(width / fontSize);
  const drops = $derived(Array(Math.floor(columns)).fill(1));
  const chars =
    'アァイィウヴエカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  onMount(() => {
    ctx = canvas.getContext('2d', { alpha: false })!;
    if (!ctx) throw new Error('Could not get CanvasRenderingContext2D');
    animationFrameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrameId);
  });

  let lastTime = 0;
  function animate(timestamp: number) {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime;
    if (dt <= FRAME_DURATION) return requestAnimationFrame(animate);

    perfM.update(dt);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
    perfM.draw(ctx);
    lastTime = timestamp - (dt % FRAME_DURATION);
    animationFrameId = requestAnimationFrame(animate);
  }
</script>

<canvas {width} {height} bind:this={canvas}></canvas>

<style>
  canvas {
    display: block;
    background-color: black;
  }
</style>
