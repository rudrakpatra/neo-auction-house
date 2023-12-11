<script lang="ts">
    import { press } from '$lib/actions/interaction';
	import {io} from '$lib/actions/observers';
	import MinaToken from '$lib/icons/MinaToken.svelte';

	export let name = 'Cyber Cat';
	export let id = 1234;
	let artist = 'sArt007';
	export let imgUrl = '/nfts/cyberCat.png';
	let isOwned = true;
	let isLocked = true;
</script>
<div class="h-32">
    <img use:press 
    class="cursor-pointer rounded-2xl w-full h-full bg-paper-400 object-cover"
    src={imgUrl+'?auto=format&dpr=1&h=500'} alt=""/>
    <div><MinaToken/></div>
</div>