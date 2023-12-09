import theme from './src/lib/styles/theme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: theme,
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('in-view', '.in-view&');
		})
	]
};
