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
	import { io } from '$lib/actions/observers';
	import NFT from './NFT.svelte';

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
</script>

<div class="container mx-auto p-8">
    <h3 class="text-3xl font-semibold text-paper-200 mb-4">Heading</h3>
    <div class="swiper-container mx-auto">
        <!-- Slider main container -->
        <div class="swiper" use:initializer>
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                {#each NFTS as nft}
                    <div class="swiper-slide">
                        <div use:io class="transition-[opacity,transform] opacity-0 scale-50 in-view:opacity-100 in-view:scale-100">
                            <NFT {...nft}/>
                        </div>
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
        <hidden class="swiper-slide-prev swiper-slide-active swiper-slide-next"/>
    </div>
</div>



<style lang="scss">
	.swiper-container {
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
</style>
