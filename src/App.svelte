<script lang="ts">
  import { onMount } from 'svelte';
  import Constelation from './Home/Constelation.svelte';

  const abortController = new AbortController();
  let [width, height] = $state([window.innerWidth, window.innerHeight]);

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  onMount(() => {
    window.addEventListener('resize', handleResize, { signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  });
</script>

<main>
  <Constelation {width} {height} />
</main>
