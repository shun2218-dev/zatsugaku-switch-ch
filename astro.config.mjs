import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 独自ドメインを取得したら SITE_URL（または下の既定値）を差し替え、public/CNAME を置く
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://zatsugaku-switch.example',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/search/') })],
});
