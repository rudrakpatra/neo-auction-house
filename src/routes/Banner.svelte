<script lang="ts">
	import { NFTS, collections } from '$lib/data';
	//Swiper
	import 'swiper/css';
	import { Swiper } from 'swiper/core';
	import theme from '$lib/styles/theme';
	import { fade, fly, scale } from 'svelte/transition';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import { press } from '$lib/actions/interaction';
	import Timer from '$lib/components/Timer.svelte';
	import humanReadableTimeDifference from '$lib/humanReadableTime';
	import { mo } from '$lib/actions/observers';

	let swiper: Swiper;
	const initializer = (el: HTMLElement) => {
		const [sm, md, lg, xl] = Object.values(theme.screens).map((bp) => parseInt(bp));
		swiper = new Swiper(el, {
			// Default parameters
			slidesPerView: 'auto',
			spaceBetween: 10,
			breakpoints: {
				[sm]: {
					slidesPerView: 1,
					loopAdditionalSlides: 1,
				},
				[md]: {
					slidesPerView: 3,
					loopAdditionalSlides: 2,
				},
				[lg]: {
					slidesPerView: 3,
					loopAdditionalSlides: 2,
				},
				[xl]: {
					slidesPerView: 5,
					loopAdditionalSlides: 3,
				}
			},
			freeMode: {
				enabled: true,
				sticky: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			centeredSlides: true,
			slideToClickedSlide: true,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false
			// }
		});
		activeItem = swiper.activeIndex;
		swiper.on('slideChange', () => {
			activeItem = swiper.activeIndex;
		});
	};
	let activeItem=1;
	//get low res background image
	$:backgroundImageUrl = `url(${collections[activeItem].imgUrl}?auto=format&dpr=1&h=50&w=80)`;
	
</script>

<div class="banner header-p-t mx-auto">
    {#key activeItem}
    	<div class="banner-background" style="--background-image-url:{backgroundImageUrl}" transition:fade={{duration:600}}/>     
    {/key}
	<div class="container mx-auto p-8">
		<!-- Slider main container -->
		<div class="swiper" use:initializer>
			<!-- Additional required wrapper -->
			<div class="swiper-wrapper">
				<!-- Slides -->
				{#each collections as collection}
					<div class="swiper-slide">
						<img  
						use:press
						class="cursor-pointer rounded-2xl w-full h-full bg-paper-400 object-cover"
						src={collection.imgUrl+'?auto=format&dpr=1&h=500'} alt=""/>
					</div>
				{/each}
			</div>
		</div>
		<!-- If we need navigation buttons -->
		<div class="swiper-button-prev">
			<span use:press>
				<ArrowLeft class="w-12 h-12 stroke-paper-0"/>
			</span>
		</div>
		<div class="swiper-button-next">
			<span use:press>
				<ArrowRight class="w-12 h-12 stroke-paper-0"/>
			</span>
		</div>
		<div class="banner-foreground mt-2">
			{#key activeItem}
			<div class="switcher" in:scale={{duration:300,delay:100,start:0.8}} out:fly={{duration:100,y:50}}>
				<!-- name ,artist name, cost, place bid -->
				<Timer startTime={collections[activeItem].startTime} endTime={collections[activeItem].endTime} let:remaining let:progress>
					<div
						style="background:linear-gradient(90deg, var(--tw-shadow-color) 0%, var(--tw-shadow-color) {(progress*100).toFixed(2)}%,#0000 {(progress*100).toFixed(2)}%);" 
						class="w-fit text-xl font-base mt-8 text-paper-100 p-4 shadow-paper-400/40 ring-2 ml-[2px] ring-paper-400/40 rounded-2xl">
						Time left - {humanReadableTimeDifference(remaining)}
					</div>
				</Timer>
				<div class="text-5xl font-bold mt-8 text-paper-100">
					{collections[activeItem].name}
				</div>
				<div class="text-2xl font-normal mt-4 ml-4 text-paper-400">
					by {collections[activeItem].name}
				</div>
			</div>
			{/key}
		</div>
	</div>
	<hidden class="swiper-slide-prev swiper-slide-active swiper-slide-next"/>
</div>



<style lang="scss">
	.banner {
		@apply h-[600px];
		@apply relative overflow-hidden;
		.swiper {
			mask: linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%);
		}
		.swiper-button-prev{
			@apply absolute top-0 left-4 h-full flex items-center z-10;
		}
		.swiper-button-next{
			@apply absolute top-0 right-4 h-full flex items-center z-10;
		}
		.swiper-slide {
			@apply h-[240px] scale-75 transition-transform duration-300;
		}
		.swiper-slide-prev {
			@apply transform scale-90 translate-x-[-14px];
		}
		.swiper-slide-active  {
			@apply transform scale-100;
		}
		.swiper-slide-next  {
			@apply transform scale-90 translate-x-[14px];
		}
	}

	.banner-background {
		@apply absolute m-0 inset-0;
		@apply w-full h-full;
		@apply -z-10;
        background:var(--background-image-url);
        background-size: 100%;
        background-position: center;
		background-repeat: no-repeat;
		@apply scale-110;
		@apply filter blur-[20px] saturate-[2.0] contrast-[0.5] brightness-[0.5];

	}
	.banner-foreground{
		@apply relative;
		@apply z-10;
		@apply flex flex-col justify-start;
		.switcher{
			@apply absolute top-0;
		}
	}
</style>
