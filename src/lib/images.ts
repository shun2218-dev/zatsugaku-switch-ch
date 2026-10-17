// シーン画像（幅720）と、scripts/thumbs.mjs が作る幅360の版（scene-N-360.webp）の使い分け
// Astro 側と検索ページのブラウザ側スクリプトの両方から使う

const SCENE = /(\/scene-\d+)\.webp$/;

/** 幅360の版。シーン画像でないもの（/og-default.jpg など）はそのまま返す */
export const smallImage = (src: string) => src.replace(SCENE, '$1-360.webp');

/** 幅360と720を選ばせる srcset。シーン画像でないものは undefined */
export const imageSrcset = (src: string) => (SCENE.test(src) ? `${smallImage(src)} 360w, ${src} 720w` : undefined);

/** 一覧のカード（.grid）に映る画像の幅。狭い画面で2列・640px から3列・960px から4列で、横幅は最大 1200px */
export const CARD_SIZES = '(min-width: 960px) 282px, (min-width: 640px) 31vw, 46vw';

/** 一覧の先頭の何枚かは最初の画面に映るので、後回しにせず優先して読む */
export const EAGER_CARDS = 4;
