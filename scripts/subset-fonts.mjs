// ビルドしたサイトで使っている文字だけを残すように、日本語フォントを削る（pnpm build のあとに実行される）
// @fontsource のフォントは文字の範囲ごとに百数十個のファイルに分かれていて、1ページで 80〜90 個・1MB 以上を読んでいた。
// そのうえ全部の @font-face を並べた CSS（約 240KB）を読み終えるまで画面が出なかった。
// ここでは dist の HTML・JSON・JS に出てくる文字を集め、
//   - 1文字も使わないファイルは @font-face ごと消す
//   - 使うファイルはその文字だけに削り、unicode-range も使う文字だけに書き換える
//   - woff（古いブラウザ向けの予備）は使わないので CSS から外す
// 削ったファイルは中身に合わせて名前を付け直す（古いファイルがブラウザに残っていても取り違えないように）
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

const DIST = path.resolve(import.meta.dirname, '../dist');
const ASSETS = path.join(DIST, '_astro');

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else yield p;
  }
}

// 使っている文字（検索欄に打つ英数字などに備えて、ASCII の表示できる文字は必ず入れる）
const used = new Set();
for (let c = 0x20; c <= 0x7e; c++) used.add(c);
const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
for (const f of files(DIST)) {
  if (!/\.(html|json|js)$/.test(f)) continue;
  for (const ch of decode(readFileSync(f, 'utf8'))) used.add(ch.codePointAt(0));
}

const parseRanges = (s) =>
  s.split(',').map((r) => {
    const [a, b] = r.trim().replace(/^U\+/i, '').split('-');
    return [parseInt(a, 16), parseInt(b ?? a, 16)];
  });

// 使う文字を U+3042,U+3044-3046 のような短い unicode-range にする
const toRange = (codes) => {
  const out = [];
  for (let i = 0; i < codes.length; i++) {
    let j = i;
    while (j + 1 < codes.length && codes[j + 1] === codes[j] + 1) j++;
    const hex = (n) => n.toString(16).toUpperCase();
    out.push(i === j ? `U+${hex(codes[i])}` : `U+${hex(codes[i])}-${hex(codes[j])}`);
    i = j;
  }
  return out.join(',');
};

const urlOf = (src) => src.match(/url\(([^)]+?\.woff2)\)/)?.[1];
let before = 0, after = 0, kept = 0, dropped = 0;
const remove = new Set();

for (const cssFile of readdirSync(ASSETS).filter((f) => f.endsWith('.css')).map((f) => path.join(ASSETS, f))) {
  const css = readFileSync(cssFile, 'utf8');
  if (!css.includes('@font-face')) continue;
  const blocks = [...css.matchAll(/@font-face\{[^}]*\}/g)];
  const replaced = new Map();
  for (const [block] of blocks) {
    const srcDecl = block.match(/src:([^;}]+)/)?.[1];
    const rangeDecl = block.match(/unicode-range:([^;}]+)/)?.[1];
    const url = srcDecl && urlOf(srcDecl);
    if (!url || !rangeDecl) continue;
    for (const m of srcDecl.matchAll(/url\(([^)]+)\)/g)) remove.add(path.join(DIST, m[1]));

    const ranges = parseRanges(rangeDecl);
    const codes = [...used].filter((c) => ranges.some(([a, b]) => c >= a && c <= b)).sort((a, b) => a - b);
    const font = readFileSync(path.join(DIST, url));
    before += font.length;
    if (!codes.length) { replaced.set(block, ''); dropped++; continue; }

    const out = await subsetFont(font, String.fromCodePoint(...codes), { targetFormat: 'woff2' });
    const hash = createHash('sha256').update(out).digest('base64url').slice(0, 8);
    const newUrl = url.replace(/\.[^./]+\.woff2$/, `.${hash}.woff2`);
    writeFileSync(path.join(DIST, newUrl), out);
    remove.delete(path.join(DIST, newUrl));
    after += out.length;
    kept++;
    replaced.set(block, block
      .replace(/src:[^;}]+/, `src:url(${newUrl}) format("woff2")`)
      .replace(/unicode-range:[^;}]+/, `unicode-range:${toRange(codes)}`));
  }
  // CSS も中身が変わったので名前を付け直し、読み込んでいるページを書き換える
  const newCss = css.replace(/@font-face\{[^}]*\}/g, (b) => (replaced.has(b) ? replaced.get(b) : b));
  const oldName = path.basename(cssFile);
  const newName = oldName.replace(/\.[^.]+\.css$/, `.${createHash('sha256').update(newCss).digest('base64url').slice(0, 8)}.css`);
  writeFileSync(path.join(ASSETS, newName), newCss);
  if (newName !== oldName) {
    rmSync(cssFile);
    for (const f of files(DIST)) {
      if (!f.endsWith('.html')) continue;
      const html = readFileSync(f, 'utf8');
      if (html.includes(oldName)) writeFileSync(f, html.replaceAll(oldName, newName));
    }
  }
}

for (const f of remove) rmSync(f, { force: true });
const kib = (n) => `${Math.round(n / 1024)}KB`;
console.log(`[subset-fonts] 使う文字 ${used.size} 字 / フォント ${kept} 個を削り ${dropped} 個を外した（${kib(before)} → ${kib(after)}）`);
