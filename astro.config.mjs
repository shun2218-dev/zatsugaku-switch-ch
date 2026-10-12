import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番は https://zatsugaku-switch.com（CI では Variables の SITE_URL で上書きできる）
export default defineConfig({
  site: process.env.SITE_URL || 'https://zatsugaku-switch.com',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/search/') })],
});
