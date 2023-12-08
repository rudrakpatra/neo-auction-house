<script lang="ts">
	import '../app.css';
	import { setup as setupIntersectionObserver } from '$lib/actions/io';
	import { onMount } from 'svelte';
	import { focus, press } from '$lib/actions/interaction';
	import Logo from '$lib/icons/Logo.svelte';
	import { page } from '$app/stores';
	import Header from './header.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	onMount(() => {
		setupIntersectionObserver();
	});

	//get active link from svelte

	let links = [
		{ name: 'Live Auction', url: '/' },
		{ name: 'My Auction', url: '/myauction' },
		{ name: 'My Bids', url: '/mybids' },
		{ name: 'My NFTS', url: '/mynfts' }
	];
	let searchbar: HTMLInputElement;
</script>

<svelte:window
	on:keydown={(e) => {
		//on ctrl+k focus on search
		if (e.ctrlKey && e.key === 'k') {
			e.preventDefault();
			searchbar?.focus();
		}
	}}
/>
<Header>
	<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" slot="logo">
		<Logo />
	</a>
	<ul class="flex items-center rounded-lg text-xl font-medium" slot="links">
		{#each links as link}
			<li>
				<a
					use:press
					href={link.url}
					class:active={$page.url.pathname === link.url}
					class="block rounded px-3 py-2 text-center text-paper-400 hover:text-accent"
				>
					{link.name}
				</a>
			</li>
		{/each}
	</ul>
	<div class="flex" slot="cta">
		<button
			use:press
			type="button"
			class="px-8 py-4 rounded-lg
            text-2xl font-semibold
            block w-full text-center
            bg-primary text-paper-100
            shadow-lg shadow-primary/50"
		>
			Connect wallet
		</button>
	</div>
	<form slot="search" class="flex items-center gap-4 rounded-lg p-2">
		<input
			bind:this={searchbar}
			use:press
			use:focus
			tabindex="-1"
			type="text"
			id="search"
			class="p-4 text-2xl rounded-lg
            text-paper-300 bg-paper-100/10
			placeholder-paper-500 focus:placeholder-paper-800
            shadow-lg shadow-paper-950/50
            "
			placeholder="Search anything....."
			required
		/>
		<button
			use:press
			tabindex="-1"
			type="button"
			class="px-4 py-4 rounded-lg
            aspect-square grid place-content-center
          bg-paper-700
            shadow-lg shadow-paper-950/50
          "
		>
			<SearchIcon class="w-8 h-8" />
		</button>
	</form>
</Header>
<slot />

<style>
	a.active {
		@apply text-accent border-b-[1px] border-accent;
	}
</style>
