<script lang="ts">
  import { onMount } from 'svelte';
  import { backgrounds } from 'Home';

  let [width, height] = $state([window.innerWidth, window.innerHeight]);
  const abortController = new AbortController();

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  const Background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  onMount(() => {
    window.addEventListener('resize', handleResize, { signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  });
</script>

<main>
  <Background {width} {height} />
</main>
