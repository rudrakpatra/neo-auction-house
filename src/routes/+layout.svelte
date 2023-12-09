<script lang="ts">
	import '../app.css';
	import { setup as setupIntersectionObserver } from '$lib/actions/io';
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';

	onMount(() => {
		setupIntersectionObserver();
		register();
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

<Header />
<slot />
