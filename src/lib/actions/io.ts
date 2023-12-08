import { get, writable, type Writable } from 'svelte/store';

export const observer: Writable<IntersectionObserver> = writable();
export const setup = () => {
	observer.set(
		new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				entry.isIntersecting
					? entry.target.classList.add('in-view')
					: entry.target.classList.remove('in-view');
			});
		})
	);
};

export default function io(el: HTMLElement) {
	observer.subscribe((observer) => {
		observer?.observe(el);
		return observer;
	});
	return {
		destroy() {
			get(observer).unobserve(el);
		}
	};
}
