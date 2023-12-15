<script lang="ts">
	import { Auctions } from '$lib/data';
	import AuctionCard from './AuctionCard.svelte';
</script>

<AuctionCard auction={Auctions[0]}/>
<!-- <section class="container mx-auto layout">
	{#each NFTS as nft}
	<div use:io class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100">
		<AuctionCard auction={Auctions[0]}/>
	</div>
	{/each}
</section> -->
<style>
	.layout{
		@apply grid gap-4 py-8;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}
</style>