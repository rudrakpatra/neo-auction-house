import { cubicInOut, expoOut } from 'svelte/easing';
import { spring, tweened } from 'svelte/motion';
import { blur } from 'svelte/transition';

export function press(
	el: HTMLElement,
	config: {
		press: (el: HTMLElement, t: number) => void;
	} = {
		press: (el, t) => {
			const w = el.getBoundingClientRect().width;
			const h = el.getBoundingClientRect().height;
			const x = w / (w + 6 * t);
			const y = h / (h + 6 * t);
			el.style.transform = `scale(${x}, ${y})`;
		}
	}
) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { destroy: () => {} };

	let pressSpring = spring(0, { stiffness: 0.5, damping: 0.5 });

	const onpress = (ev: unknown) => {
		if (ev instanceof KeyboardEvent && ev.code !== 'Enter' && ev.code !== 'Space') return;
		pressSpring.stiffness = 0.2;
		pressSpring.damping = 0.8;
		pressSpring.set(1);
		if (ev instanceof PointerEvent) window.addEventListener('pointerup', onrelease, { once: true });
	};
	const onrelease = () => {
		pressSpring.damping = 0.25;
		pressSpring.set(0);
	};

	let unsubscriber = pressSpring.subscribe((t) => config.press(el, t));
	const handleVisibilityChange = () => {
		if (document.hidden) {
			unsubscriber();
		} else {
			pressSpring = spring(0, { stiffness: 0.5, damping: 0.5 });
			unsubscriber = pressSpring.subscribe((t) => config.press(el, t));
		}
	};
	el.style.userSelect = 'none';
	el.style.cursor = 'pointer';
	document.addEventListener('visibilitychange', handleVisibilityChange);
	el.addEventListener('keydown', onpress);
	el.addEventListener('keyup', onrelease);
	el.addEventListener('dragend', onrelease);
	el.addEventListener('pointerdown', onpress);
	return {
		destroy: () => {
			unsubscriber();
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			el.removeEventListener('keydown', onpress);
			el.removeEventListener('keyup', onrelease);
			el.removeEventListener('dragend', onrelease);
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
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { destroy: () => {} };
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

export const flash = (node: Element) => {
	return blur(node, { duration: 1000, easing: cubicInOut });
};
