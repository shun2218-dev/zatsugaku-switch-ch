// 見出しの書体で表示される文字が、配信しているフォントに全部入っているかをブラウザで確かめる
//   pnpm build && pnpm preview   … 先にビルドしてプレビューを動かしておく
//   pnpm check:fonts
// scripts/subset-fonts.mjs は CSS から「見出しの書体を使う場所」を読み取って文字を集めるので、
// デザインを変えたときに読み取りが追いつかないと、見出しの一部だけ端末の書体になってしまう。
// ここでは実際にページを開いて、見出しとして表示されている文字を1字ずつ確かめる。
import puppeteer from 'puppeteer-core';
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '../dist');
const ORIGIN = process.env.PREVIEW_URL || 'http://localhost:4321';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!existsSync(DIST)) { console.error('[check-fonts] dist がありません。先に pnpm build してください'); process.exit(1); }
if (!existsSync(CHROME)) { console.error(`[check-fonts] Chrome が見つかりません … ${CHROME}（CHROME_PATH で場所を指定できます）`); process.exit(1); }

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else yield p;
  }
}
// 公開フォルダにそのまま置いた HTML は、別のデザインなので見ない
const urls = [...files(DIST)]
  .filter((f) => f.endsWith('.html') && !f.includes(`${path.sep}autotube${path.sep}`))
  .map((f) => '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, ''));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

const bad = [];
let checked = 0;
for (const u of urls) {
  try {
    await page.goto(ORIGIN + u, { waitUntil: 'networkidle0', timeout: 30000 });
  } catch {
    bad.push({ url: u, miss: ['ページを開けませんでした（pnpm preview は動いていますか）'] });
    break;
  }
  const miss = await page.evaluate(async () => {
    await document.fonts.ready;
    const out = new Set();
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const el = n.parentElement;
      if (!el || !n.textContent.trim()) continue;
      const style = getComputedStyle(el);
      if (!/^["']?Zen Maru Gothic/.test(style.fontFamily)) continue;
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      for (const ch of n.textContent) {
        if (/\s/.test(ch)) continue;
        if (!document.fonts.check('700 1rem "Zen Maru Gothic"', ch) || !document.fonts.check('900 1rem "Zen Maru Gothic"', ch)) out.add(ch);
      }
    }
    return [...out];
  });
  checked++;
  if (miss.length) bad.push({ url: u, miss });
}
await browser.close();

if (bad.length) {
  console.error(`[check-fonts] 見出しに、フォントに入っていない文字があります（${bad.length} ページ）`);
  for (const b of bad.slice(0, 20)) console.error(`  - ${b.url} … ${b.miss.join('')}`);
  process.exit(1);
}
console.log(`[check-fonts] ${checked} ページ / 見出しの文字はすべてフォントに入っています`);
