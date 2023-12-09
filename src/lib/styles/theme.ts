import { fontFamily } from 'tailwindcss/defaultTheme';

const theme = {
	fontFamily: {
		DEFAULT: ['Poppins', ...fontFamily.sans]
		// main: ['Poppins', ...fontFamily.sans]
	},
	screens: {
		sm: '640px',
		// => @media (min-width: 640px) { ... }

		md: '768px',
		// => @media (min-width: 768px) { ... }

		lg: '1024px',
		// => @media (min-width: 1024px) { ... }

		xl: '1280px'
		// => @media (min-width: 1280px) { ... }
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
};
export default theme;
