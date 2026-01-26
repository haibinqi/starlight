// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight'
import starlightThemeRapide from 'starlight-theme-rapide'
// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [starlightThemeRapide()],
			title: '七十七.七',
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
