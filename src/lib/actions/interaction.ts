import { expoOut } from 'svelte/easing';
import { spring, tweened } from 'svelte/motion';

export function press(
	el: HTMLElement,
	config: {
		press: (el: HTMLElement, t: number) => void;
	} = {
		press: (el, t) => {
			const w = el.getBoundingClientRect().width;
			const x = (w - 6 * t) / w;
			el.style.transform = `scale(${x})`;
		}
	}
) {
	const pressSpring = spring(0, { stiffness: 0.5, damping: 0.5 });

	const onpress = (ev: unknown) => {
		if (ev instanceof KeyboardEvent && ev.code !== 'Enter' && ev.code !== 'Space') return;
		pressSpring.stiffness = 0.2;
		pressSpring.damping = 0.8;
		pressSpring.set(1);
		if (ev instanceof PointerEvent) window.addEventListener('click', onrelease, { once: true });
	};
	const onrelease = () => {
		pressSpring.damping = 0.25;
		pressSpring.set(0);
	};
	pressSpring.subscribe((t) => config.press(el, t));
	el.style.cursor = 'pointer';
	el.addEventListener('keydown', onpress);
	el.addEventListener('keyup', onrelease);

	el.addEventListener('pointerdown', onpress);
	return {
		destroy: () => {
			el.removeEventListener('keydown', onpress);
			el.removeEventListener('keyup', onrelease);

			el.removeEventListener('pointerdown', onpress);
		}
	};
}

export function focus(
	el: HTMLElement,
	config: {
		focus: (el: HTMLElement, t: number) => void;
	} = {
		focus: (el, t) => {
			const x = t * 100;
			const computedStyle = window.getComputedStyle(el);
			el.dataset.textColor = el.dataset.textColor || computedStyle.color;
			el.dataset.backgroundColor = el.dataset.backgroundColor || computedStyle.backgroundColor;

			const A = el.dataset.textColor;
			const B = el.dataset.backgroundColor;

			//swap colors
			// el.style.backgroundImage = `linear-gradient(to right, ${A} ${x}%, ${B} ${x}%, ${B})`;
			// el.style.backgroundImage = `conic-gradient(from 0deg, ${A} ${x}%, ${B} ${x}%, ${B})`;
			el.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${A} ${x}%, ${B} ${x}%, ${B})`;
			el.style.color = x < 50 ? A : B;
		}
	}
) {
	const focusTween = tweened(0, { easing: expoOut, duration: 500 });

	const onfocusin = () => {
		focusTween.set(1);
	};
	const onfocusout = () => {
		focusTween.set(0);
	};

	focusTween.subscribe((t) => config.focus(el, t));

	el.addEventListener('focusin', onfocusin);
	el.addEventListener('focusout', onfocusout);

	return {
		destroy: () => {
			el.removeEventListener('focusin', onfocusin);
			el.removeEventListener('focusout', onfocusout);
		}
	};
}
