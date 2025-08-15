<script lang="ts">
  import { onMount } from 'svelte';
  import { backgrounds } from 'Components';
  // import Constelation from 'Home/Constelation.svelte';
  import Matrix from 'Components/Matrix.svelte';

  let [width, height] = $state([window.innerWidth, window.innerHeight]);
  const abortController = new AbortController();

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  const Background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  onMount(() => {
    window.addEventListener('resize', handleResize, { signal: abortController.signal });
    return () => abortController.abort();
  });
</script>

<main>
  <Matrix {width} {height} />
  <!-- <Background {width} {height} /> -->
  <!-- <Constelation {width} {height} /> -->
  <!-- <img src="assets/img/nebula.jpg" alt="" /> -->
</main>
