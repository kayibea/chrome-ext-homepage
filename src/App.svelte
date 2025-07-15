<script lang="ts">
  import { onMount } from 'svelte';
  import { links } from './data/links';
  import { sites, type Site } from './data/sites';
  import type { Nullable } from './types';

  let now = $state(new Date());
  let time = $derived(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  let date = $derived(
    now.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
  );

  let site: Nullable<Site> = $state(null);

  function onKeyDown(ev: Event) {
    const e = ev as KeyboardEvent;
    const input = e.target as HTMLInputElement;
    const key = e.code;

    // console.log(key);
    if (key === 'Enter' && input.value.length > 1) {
      return doSearch(input.value, site);
    }

    if (key === 'Backspace' && site) {
      input.value = `${site.shortcut}  `;
      site = null;
      return;
    }

    if (key === 'Space' && !site) {
      const [shortcut, ...rest] = input.value.split(' ');
      if (rest.length > 1) return;

      const matchedSite = sites.find((s) => s.shortcut === shortcut);
      if (matchedSite) {
        site = matchedSite;
        input.value = '';
      }
    }
  }

  async function doSearch(query: string, site: Nullable<Site>) {
    const text = site ? `${query} site:${site.domain}` : query;
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(text)}`;
    await chrome.tabs.create({ url: searchUrl });
  }

  onMount(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const delay = 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    timeoutId = setTimeout(() => {
      now = new Date();
      intervalId = setInterval(() => (now = new Date()), 60_000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  });
</script>

<main>
  <div class="container">
    <div class="time-display">{time}</div>
    <div class="date-display">{date}</div>
    <div class="search-container">
      <span id="shortcutLabel" class="shortcut-label"
        >{#if site}Search {site.name} |{/if}</span
      >
      <input minlength="1" onkeydown={onKeyDown} type="text" id="searchInput" placeholder="Type shortcut..." />
    </div>
    <!-- TODO: Maybe, i said maybe implement preview ! (not sure, kinda pointless) -->
    <!-- <div id="siteList"></div> -->

    <div class="quick-links" id="quickLinks">
      {#each links as link}
        <a class="link-card" href={link.url}>{link.name}</a>
      {/each}
    </div>
  </div>

  <video autoplay loop muted playsinline src="background.mp4" class="video-background"></video>
  <div class="background-overlay"></div>
</main>

<style>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    animation: slideUp 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .time-display {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 3rem;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -2px;
  }

  .date-display {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--text-muted);
    margin-top: -2rem;
    margin-bottom: 3rem;
  }

  .search-container {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 4px;
    padding: 8px 12px;
    width: 80%;
    max-width: 600px;
  }

  .shortcut-label {
    background: #eee;
    color: #333;
    padding: 4px 8px;
    border-radius: 3px;
    margin-right: 8px;
    font-size: 14px;
    white-space: nowrap;
  }

  .shortcut-label:empty {
    display: none;
  }

  #searchInput {
    flex: 1;
    border: none;
    font-size: 16px;
    outline: none;
  }

  /* #siteList {
    width: 80%;
    max-width: 600px;
    background: #fff;
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-top: 16px;
    display: none;
  } */

  /* .site-item {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }

  .site-item:last-child {
    border-bottom: none;
  }

  .site-item:hover {
    background-color: #f0f0f0;
  } */

  .video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
    /* opacity: 0; */
    transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-color: black;
    /* background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.7) 0%,
      rgba(118, 75, 162, 0.8) 50%,
      rgba(0, 0, 0, 0.6) 100%
    ); */
    z-index: -1;
    backdrop-filter: blur(8px);
  }

  .quick-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    width: 100%;
    max-width: 1000px;
    margin: 3rem;
    grid-auto-rows: 1fr;
  }

  .link-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;

    text-align: center;
    padding: 1.5rem 1rem;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
  }

  .link-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  .link-card:hover::before {
    left: 100%;
  }

  .link-card:hover {
    transform: translateY(-4px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: var(--shadow-hover);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .quick-links {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.8rem;
    }

    .link-card {
      padding: 1.2rem 0.8rem;
      font-size: 0.8rem;
    }
  }
</style>
