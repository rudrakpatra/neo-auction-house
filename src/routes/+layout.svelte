<script lang="ts">
	import '../app.css';
	import { setupIO, setupMO } from '$lib/actions/observers'; 
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	onMount(() => {
		setupIO();
		setupMO();
		register();
	});
</script>

<Header />
<slot />
<Footer/>
