<script lang="ts">
	import { Nfts } from '$lib/data';
	import { io } from '$lib/actions/observers';
	import NFTCard from './NFTCard.svelte';
</script>

<section class="container mx-auto layout">
	{#each Nfts as nft}
	<div use:io class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100">
		<NFTCard {nft}/>
	</div>
	{/each}
</section>
<style>
	.layout{
		@apply grid gap-8 py-8;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
</style>