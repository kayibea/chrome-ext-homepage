<script lang="ts">
  import { onMount } from 'svelte';
  import Constelation from 'Home/Constelation.svelte';
  import Matrix from 'Home/Matrix.svelte';
  import Constelation2 from 'Home/Constelation2.svelte';
  // import Menu from 'Components/Menu.svelte';

  let [width, height] = $state([window.innerWidth, window.innerHeight]);
  const abortController = new AbortController();

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
  <!-- <Constelation {width} {height} /> -->
  <!-- <Matrix {width} {height} /> -->
  <Constelation2 {width} {height} />
</main>
