<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { Bids, Nfts, Collections, Auctions } from '$lib/data';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import '$lib/styles/card.scss';
	import { ArrowUpRightIcon } from 'lucide-svelte';

	export let nft = Nfts[0];
	const name = nft.name;
	const id = nft.idx;
	const src = nft.imgUrl;

	const floor = Collections[0].floorPrice;
	const bought = Bids[0].amount;
	const auctionId = Auctions[0]?.id;
</script>

<div class="card w-full">
	<img use:press {src} class="aspect-square object-cover" loading="lazy" alt="" />
	<h3 class="justify-between">
		<a use:press class="overflow inline-flex" href="collection/{name}">
			{name}<ArrowUpRightIcon class="h-4" />
		</a>
		<h3>#{id}</h3>
	</h3>
	<h3 class="justify-between">
		Floor <h2>{floor} <MinaToken /></h2>
	</h3>
	<h3 class="justify-between">
		Bought <h2>{bought} <MinaToken /></h2>
	</h3>
	{#if auctionId}
		<a
			use:press
			href="/auctions/{auctionId}"
			class="bg-accent justify-center p-3 rounded-xl rounded-t-md">In Auction</a
		>
	{:else}
		<a
			use:press
			href="/auctions/create"
			class="bg-primary justify-center p-3 rounded-xl rounded-t-md">In Auction</a
		>
	{/if}
</div>

<style lang="scss">
	.overflow {
		@apply flex-1;
		@apply overflow-hidden;
		mask: linear-gradient(to right, #000 80%, transparent);
	}
</style>
