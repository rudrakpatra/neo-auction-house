<script lang="ts">
	import { focus, press } from '$lib/actions/interaction';
	import { Auctions, Collections } from '$lib/data';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import '$lib/styles/Card.scss';
	import { ArrowUpRightIcon } from 'lucide-svelte';

	let auction = Auctions[0];
	$: name = auction.nft.name;
	$: collection = Collections[0];
	$: id = auction.nft.idx;
	$: src = auction.nft.imgUrl;
</script>

<form method="POST">
	<section class="container mx-auto grid gap-3 justify-center">
		<div class="card grid-cols-3 max-w-[600px]">
			<h5 class="col-span-full">You have selected</h5>
			<div class="col-span-full grid gap-3 grid-cols-3">
				<img class="flex-col row-span-3" use:press {src} loading="lazy" alt="" />
				<h4 class="col-span-2">
					<h1>{name}</h1>
					<h4>#{id}</h4>
				</h4>
				<div>
					<h5>Bought</h5>
					<h4>{10.02}<MinaToken class="w-4 h-4" /></h4>
				</div>
				<div>
					<h5>Floor</h5>
					<h4>{10.5}<MinaToken class="w-4 h-4" /></h4>
				</div>
				<div>
					<h5>Volume</h5>
					<h4>{102.5}<MinaToken class="w-4 h-4" /></h4>
				</div>
				<div>
					<h5>Live Auctions</h5>
					<h4>{12}</h4>
				</div>
			</div>
			<hr class="col-span-full opacity-30" />
			<h5 class="col-span-full">Select auction type</h5>
			<input type="radio" id="blind" name="auctionType" value="blind" checked />
			<label use:press tabindex="-1" for="blind">
				<h4>Blind</h4>
			</label>

			<input type="radio" id="english" name="auctionType" value="english" />
			<label use:press tabindex="-1" for="english">
				<h4>English</h4>
			</label>

			<input type="radio" id="dutch" name="auctionType" value="dutch" />
			<label use:press tabindex="-1" for="dutch">
				<h4>Dutch</h4>
			</label>
		</div>
	</section>
</form>

<style lang="scss">
	.card {
		@apply mt-20;
		@apply bg-card-darker;
		input[type='radio'] {
			@apply hidden;
		}
		input:checked + label {
			@apply bg-primary;
			* {
				@apply text-paper-100;
			}
		}
		label {
			@apply relative overflow-hidden;
			@apply grid place-items-center p-4 rounded-xl cursor-pointer;
			@apply bg-card-lighter;
		}
	}
</style>
