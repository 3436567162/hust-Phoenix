// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

const site = process.env.SITE_URL?.trim() || 'https://3436567162.github.io';
const base = process.env.BASE_PATH?.trim() || '/hust-Phoenix';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [sitemap()],
	vite: {
		plugins: [tailwind()],
	},
});
