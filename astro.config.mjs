// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight'
import starlightThemeRapide from 'starlight-theme-rapide'
// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'load',
	},
	integrations: [
		starlight({
			plugins: [starlightThemeRapide()],
			title: 'Tenwin',
			logo: {
				src: './src/assets/logo.png',
				alt: 'Tenwin',
			},
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/Header.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
		}),
	],
});
