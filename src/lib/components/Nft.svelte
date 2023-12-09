<script>
	import { press } from '$lib/actions/interaction';
	import io from '$lib/actions/io';
	import MinaToken from './MinaToken.svelte';

	let name = 'Cyber Cat';
	let id = '#1234';
	let artist = 'sArt007';
	let imgUrl = '/img/cyberCat.png';
	let isOwned = true;
	let isLocked = true;
</script>

<div
	use:io
	class="w-80 transition-[opacity,transform] opacity-0 scale-50 in-view:opacity-100 in-view:scale-100"
>
	<div class="relative h-[300px] w-[300px] m-[10px] glowing-image">
		<img class="background" src={imgUrl} alt={name} />
		<img class="foreground" src={imgUrl} alt={name} />
	</div>
	<div class="-mt-5 space-y-2 p-1.5 rounded-glass-panel">
		<div class="flex items-center justify-between px-8 py-4">
			<div>
				<p class="text-2xl font-semibold text-paper-200">{name}</p>
				<p class="text-base font-normal text-paper-500">by {artist}</p>
			</div>
		</div>
		{#if isOwned}
			<div class="flex items-center justify-between px-8 py-2.5">
				<div>
					<p class="text-base font-normal text-paper-500">Floor Price</p>
					<p class="text-xl font-normal text-paper-200">0.0067 <MinaToken /></p>
				</div>
				<div>
					<p class="text-right text-base font-normal text-paper-500">Bought for</p>
					<p class="text-right text-xl font-normal text-paper-200">0.034 <MinaToken /></p>
				</div>
			</div>
			{#if isLocked}
				<a
					use:press
					class="
                    bg-accent
                    text-paper-100
                    px-8 py-4 text-2xl font-semibold block w-full"
					href="/auction/1234"
				>
					In Auction
				</a>
			{:else}
				<a
					use:press
					class="
                    bg-primary
                    text-paper-100
                    px-8 py-4 text-2xl font-semibold block w-full"
					href="/auction/create"
				>
					Start Auction
				</a>
			{/if}
		{/if}
	</div>
</div>

//

<style lang="scss">
	.glowing-image {
		img {
			@apply absolute bg-paper-300 h-full w-full rounded-3xl object-cover;
		}
		img.background {
			@apply scale-95 blur-xl;
		}
	}
	.rounded-glass-panel {
		@apply rounded-2xl;
		@apply backdrop-blur-lg;
		@apply bg-paper-800 bg-opacity-20;
		> * {
			@apply rounded-md;
		}
		> div {
			@apply bg-paper-600 bg-opacity-10;
		}
		:first-child {
			@apply rounded-t-2xl;
		}
		:last-child {
			@apply rounded-b-2xl;
		}
	}
</style>
