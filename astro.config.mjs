// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

const site = process.env.SITE_URL?.trim();

// https://astro.build/config
export default defineConfig({
	...(site ? { site } : {}),
	integrations: site ? [sitemap()] : [],
	vite: {
		plugins: [tailwind()],
	},
});
