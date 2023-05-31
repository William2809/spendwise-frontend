/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			white: "#ffffff",
			black: "#000000",
			primary: "#43AF61",
			secondary: "#C5DDC6",
			disabled: "#8A8A8A",
			"primary-muted": "#497A4B",
			"input-bg": "#EAEAEA",
			"primary-hover": "#3D8D53",
			"chart-bg": "#7ACC7D",
		},
	},
	plugins: [],
};
