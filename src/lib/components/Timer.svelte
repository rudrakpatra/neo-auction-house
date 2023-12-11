<script lang="ts">
	import {onMount } from 'svelte';

	export let startTime=0;
    export let endTime=0;
    
    let duration=endTime-startTime;
	let elapsed = Date.now() - startTime;

	let last_time = 0;
	let frame: number;

	function update() {
		frame = requestAnimationFrame(update);

		const time = window.performance.now();
		elapsed += Math.min(time - last_time, duration - elapsed);

		last_time = time;
	}

    onMount(() => {
        last_time = window.performance.now();
        update();
        return () => cancelAnimationFrame(frame);
    })
</script>

<slot remaining={duration-elapsed} progress={elapsed/duration}/>

<!-- <button on:click={() => (elapsed = 0)}>reset</button> -->