// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Publicado en GitHub Pages. Para otro hosting en la raíz de un dominio propio:
// SITE_URL=https://dominio.com BASE_PATH=/ npm run build
const SITE = process.env.SITE_URL ?? 'https://martinviretti.github.io';
const BASE = process.env.BASE_PATH ?? '/el-almacen-de-lola-landing';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
