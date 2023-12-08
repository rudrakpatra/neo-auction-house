import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			DEFAULT: ['Poppins', ...fontFamily.sans]
			// main: ['Poppins', ...fontFamily.sans]
		},
		colors: {
			primary: '#00b2ff', //cyan
			secondary: '#00ff38', //lime
			accent: '#ff6b00', //orange
			red: '#ff0000', //red
			paper: {
				0: '#ffffff',
				100: '#fafafa',
				200: '#f4f4f5',
				300: '#e4e4e7',
				400: '#d4d4d8',
				500: '#a1a1aa',
				600: '#71717a',
				700: '#52525b',
				800: '#3f3f46',
				900: '#27272a',
				950: '#09090b'
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('in-view', '.in-view&');
		})
	]
};
