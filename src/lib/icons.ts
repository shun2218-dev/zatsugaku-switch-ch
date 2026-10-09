// カテゴリのアイコン（線画のSVG）。色は currentColor で周りの文字色に合わせる
// Astro 側（CategoryIcon.astro）と検索ページのブラウザ側スクリプトの両方から使う
const PATHS: Record<string, string> = {
  // サッカーボール
  sports:
    '<circle cx="12" cy="12" r="9"/><path d="M12 8l3.8 2.8-1.4 4.4H9.6L8.2 10.8z"/><path d="M12 8V3M15.8 10.8l4.7-1.5M14.4 15.2l2.9 4M9.6 15.2l-2.9 4M8.2 10.8L3.5 9.3"/>',
  // 湯気の立つお椀
  food: '<path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z"/><path d="M8 20.5h8"/><path d="M9 2.5c-1.2 1.4 1.2 2.6 0 4M15 2.5c-1.2 1.4 1.2 2.6 0 4"/>',
  // ハート
  body: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  // 太陽と雲
  nature:
    '<path d="M9 2.5V4M3.4 4.9l1.1 1.1M14.6 4.9l-1.1 1.1M2 10.5h1.5"/><path d="M5.8 12.4A4 4 0 0 1 12.6 7.6"/><path d="M8.5 20h9a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.6 1.2A2.9 2.9 0 0 0 8.5 20z"/>',
  // 電球
  things:
    '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1V16h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',
};

export function iconSvg(slug: string, className = 'icon') {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[slug] ?? PATHS.things}</svg>`;
}
