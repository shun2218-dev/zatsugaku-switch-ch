import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { lastmodOf, isPendingPage } from './scripts/lastmod.mjs';

// 本番は https://zatsugaku-switch.com（CI では Variables の SITE_URL で上書きできる）
export default defineConfig({
  site: process.env.SITE_URL || 'https://zatsugaku-switch.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // 英語版の記事（/en/trivia/<動画ID>/）と日本語の記事（/trivia/<動画ID>/）を hreflang でつなぐ
      i18n: { defaultLocale: 'ja', locales: { ja: 'ja', en: 'en' } },
      filter: (page) => !page.includes('/search/') && !isPendingPage(page),
      serialize: (item) => ({ ...item, lastmod: lastmodOf(item.url) }),
    }),
  ],
});
