<script lang="ts">
	//Swiper
	import 'swiper/css';
	import { Swiper } from 'swiper/core';
	import theme from '$lib/styles/theme';
	import { press } from '$lib/actions/interaction';
	let swiper: Swiper;
	const initializer = (el: HTMLElement) => {
		const [sm, md, lg, xl] = Object.values(theme.screens).map((bp) => parseInt(bp));
		swiper = new Swiper(el, {
			// Default parameters
			slidesPerView: 'auto',
			spaceBetween: 10,
			scrollbar: {
				dragClass: 'swiper-scrollbar',
				draggable: true
			},
			breakpoints: {
				[sm]: {
					slidesPerView: 1,
					loopAdditionalSlides: 2
				},
				[md]: {
					slidesPerView: 3,
					loopAdditionalSlides: 6
				},
				[lg]: {
					slidesPerView: 3,
					loopAdditionalSlides: 6
				},
				[xl]: {
					slidesPerView: 5,
					loopAdditionalSlides: 10
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
			loop: true,
			loopAddBlankSlides: true,
			centeredSlides: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			}
		});
		swiper.slideNext();
		swiper.on('slideChange', () => {
			activeItem = swiper.activeIndex;
		});
	};
	let activeItem: number;
	let nfts = ['./nfts/cyberCat.png', './nfts/head.png', './nfts/monkey.png', './nfts/stone.png'];
</script>

<!-- Slider main container -->
<div class=" space-y-16 banner container mx-auto" data-src>
	<img class="banner-background" src={nfts[(activeItem - 1) % 4]} />
	<div class="swiper" use:initializer>
		<!-- Additional required wrapper -->
		<div class="swiper-wrapper">
			<!-- Slides -->
			{#each Array.from({ length: 40 }) as _, i}
				<div class="swiper-slide">
					<img use:press src={nfts[i % 4]} />
				</div>
			{/each}
		</div>
		<!-- If we need pagination -->
		<div class="swiper-pagination" />

		<!-- If we need navigation buttons -->
		<div class="swiper-button-prev">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-arrow-left"
			>
				<line x1="19" y1="12" x2="5" y2="12"></line>
				<polyline points="12 19 5 12 12 5"></polyline>
			</svg>
		</div>
		<div class="swiper-button-next">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-arrow-right"
			>
				<line x1="5" y1="12" x2="19" y2="12"></line>
				<polyline points="12 5 19 12 12 19"></polyline>
			</svg>
		</div>

		<!-- If we need scrollbar -->
		<div class="swiper-scrollbar" />
	</div>
</div>

<style global>
	.banner {
		position: relative;
		overflow: hidden;
		height: 600px;
	}
	.banner-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: stretch;
		filter: blur(100px) saturate(2.5) contrast(0.4) brightness(1.2);
		z-index: -1;
	}

	.swiper {
		padding: 2rem;
	}
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		/* background: #666; */
		width: 100%;
		height: 260px;
		transition: transform 0.3s ease-in-out;
		transform: scale(0.8);
	}
	.swiper-slide > img {
		border-radius: 20px;
		width: 100%;
		height: 100%;
		object-fit: cover;
		user-select: none;
		box-shadow: 0 6px 12px 0 #0004;
	}
	.swiper-slide-prev {
		transform: scale(0.95) translateX(-14px);
		/* background: #3847; */
	}
	.swiper-slide-active {
		transform: scale(1);
		/* background: #0005; */
	}
	.swiper-slide-next {
		transform: scale(0.95) translateX(14px);
		/* background: #8447; */
	}
</style>
