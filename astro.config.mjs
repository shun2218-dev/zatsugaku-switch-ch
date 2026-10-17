import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkCjkFriendly from 'remark-cjk-friendly';
import { lastmodOf, isPendingPage } from './scripts/lastmod.mjs';

// 本番は https://zatsugaku-switch.com（CI では Variables の SITE_URL で上書きできる）
export default defineConfig({
  site: process.env.SITE_URL || 'https://zatsugaku-switch.com',
  trailingSlash: 'always',
  markdown: {
    // 「**約24時間のリズム（体内時計）**が」のように、約物の直後で ** を閉じても太字になるようにする
    // （CommonMark のままだと、閉じる ** の前が約物で後ろが日本語の文字だと太字にならない）。
    // Astro 標準の Sätteri にはこの設定がないので、unified（remark）で remark-cjk-friendly を使う。
    // 引用符などの自動変換（smartypants）は Sätteri と同じく使わない
    processor: unified({ remarkPlugins: [remarkCjkFriendly], smartypants: false }),
  },
  vite: {
    // 小さいフォントを CSS に埋め込まず、必ずファイルとして出す（scripts/subset-fonts.mjs がビルド後に削るため）
    build: { assetsInlineLimit: (file) => (/\.woff2?$/.test(file) ? false : undefined) },
  },
  integrations: [
    sitemap({
      // 英語版の記事（/en/trivia/<動画ID>/）と日本語の記事（/trivia/<動画ID>/）を hreflang でつなぐ
      i18n: { defaultLocale: 'ja', locales: { ja: 'ja', en: 'en' } },
      filter: (page) => !page.includes('/search/') && !isPendingPage(page),
      serialize: (item) => ({ ...item, lastmod: lastmodOf(item.url) }),
    }),
  ],
});
