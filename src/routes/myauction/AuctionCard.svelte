<script lang="ts">
    import {Auctions} from '$lib/data';
    import { press } from '$lib/actions/interaction';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { ArrowUpRight, Timer } from 'lucide-svelte';
	import { scale } from 'svelte/transition';
	import { formatTimeDifference } from '$lib/formatting';

	export let auction=Auctions[0];
</script>


