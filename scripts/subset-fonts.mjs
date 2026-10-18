// 見出しに出てくる文字だけの Zen Maru Gothic を、ページごとに作る（pnpm build のあとに実行される）
// @fontsource のフォントは文字の範囲ごとに百数十個のファイルに分かれている。
// 以前はそれを「サイト全体で使う文字」で削っていたが、それだと1つ1つのファイルにサイト中の漢字が残るため、
// トップページだけで 85ファイル・894KB を読んでいた（PageSpeed Insights のスマホ評価 57 の主因）。
// ここでは分割ファイルではなく日本語がまとまった1ファイルを元にして、
// 見出しに出てくる文字だけへ削り、@font-face をそのページの <head> に直接書く。
//   1. ビルドした CSS から @fontsource の @font-face を外す（削っていないフォントなので配らない。
//      pnpm dev で見出しが正しい書体で見えるように、Base.astro では読み込んだままにしてある）
//   2. ビルドした CSS から「見出しの書体（--font-display）を使う場所」を読み取り、
//      そこに出てくる文字を集めて、ページごとのフォントを作る
// 見出し以外はすべて端末の書体にする。本文の BIZ UDPゴシックも配信しない
// （Windows には最初から入っているので端末のものを使う）。指定は global.css の --font にある。
// 思ったとおりに削れなかったときは、気づかないまま公開しないようにビルドを止める。
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';
import { parseHTML } from 'linkedom';

const DIST = path.resolve(import.meta.dirname, '../dist');
const ASSETS = path.join(DIST, '_astro');
const FILES = path.resolve(import.meta.dirname, '../node_modules/@fontsource/zen-maru-gothic/files');

// 見出しに使う書体と太さ（global.css の --font-display、Base.astro で読み込む CSS と合わせる）
const FAMILY = 'Zen Maru Gothic';
const WEIGHTS = [700, 900];
const sourceOf = (weight) => path.join(FILES, `zen-maru-gothic-japanese-${weight}-normal.woff2`);

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else yield p;
  }
}
const htmlFiles = () => [...files(DIST)].filter((f) => f.endsWith('.html'));

const problems = [];
for (const weight of WEIGHTS) if (!existsSync(sourceOf(weight))) problems.push(`元のフォントがありません … ${sourceOf(weight)}`);

// 見出しの書体を使う場所と、その中で本文の書体に戻している場所（.page-title span など）
const displaySelectors = new Set();
const bodySelectors = new Set();

// 1. ビルドした CSS から @font-face を外す。中身が変わるので名前を付け直し、読み込んでいるページを書き換える
let faces = 0;
for (const name of readdirSync(ASSETS).filter((n) => n.endsWith('.css'))) {
  const file = path.join(ASSETS, name);
  const css = readFileSync(file, 'utf8');
  if (!css.includes('@font-face')) continue;
  const stripped = css.replace(/@font-face\{[^}]*\}/g, (block) => {
    faces++;
    for (const [, url] of block.matchAll(/url\((\/[^)]+?\.woff2?)\)/g)) rmSync(path.join(DIST, url), { force: true });
    return '';
  });
  if (stripped.includes('@font-face')) { problems.push(`${name}: 外せない @font-face があります`); continue; }

  // どの場所がどちらの書体かを読み取る（@media の中の指定も、念のため区別せずに入れる）
  for (const [, selector, decls] of stripped.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const family = decls.match(/(?:^|;)font-family:([^;]+)/)?.[1];
    if (!family) continue;
    const sel = selector.trim();
    if (sel.startsWith('@') || sel.includes(':root')) continue;
    (/--font-display|Zen Maru Gothic/.test(family) ? displaySelectors : bodySelectors).add(sel);
  }
  const newName = name.replace(/\.[^.]+\.css$/, `.${createHash('sha256').update(stripped).digest('base64url').slice(0, 8)}.css`);
  writeFileSync(path.join(ASSETS, newName), stripped);
  if (newName !== name) {
    rmSync(file);
    for (const f of htmlFiles()) {
      const html = readFileSync(f, 'utf8');
      if (html.includes(name)) writeFileSync(f, html.replaceAll(name, newName));
    }
  }
}
if (!faces) problems.push('CSS に @font-face がありません（Base.astro でフォントの CSS を読み込んでいますか）');
if (!displaySelectors.size) problems.push('CSS に見出しの書体（--font-display）を使う場所がありません');

// 使えない書き方の指定があると取りこぼすので、先に確かめておく
const { document: blank } = parseHTML('<!doctype html><html><body></body></html>');
const usable = (set) =>
  [...set].filter((sel) => {
    try { blank.querySelectorAll(sel); return true; } catch { problems.push(`CSS の指定を読み取れません … ${sel}`); return false; }
  });
const DISPLAY = usable(displaySelectors).join(',');
const BODY = usable(bodySelectors).join(',');

// そのページの見出しに出てくる文字。
// 見出しの中で本文の書体に戻している部分は入れない。
// 検索欄に打つ英数字や、ページを動かす JavaScript が書き込む英語の文言に備えて、ASCII の表示できる文字は必ず入れる
const charsOf = (html) => {
  const used = new Set();
  for (let c = 0x20; c <= 0x7e; c++) used.add(c);
  const add = (el) => {
    for (const node of el.childNodes) {
      if (node.nodeType === 3) for (const ch of node.textContent) used.add(ch.codePointAt(0));
      else if (node.nodeType === 1 && !(BODY && node.matches(BODY))) add(node);
    }
  };
  const { document } = parseHTML(html);
  const found = [...document.querySelectorAll(DISPLAY)];
  for (const el of found) add(el);
  // 見出しのタグは、CSS の読み取り方が変わっても取りこぼさないように必ず入れる
  for (const el of document.querySelectorAll('h1,h2')) add(el);
  return { used, found: found.length };
};
const textOf = (codes) => String.fromCodePoint(...[...codes].sort((a, b) => a - b));

// このサイトのページ（公開フォルダにそのまま置いた HTML は、別のデザインなので触らない）
const pages = [];
for (const f of htmlFiles()) {
  const html = readFileSync(f, 'utf8');
  if (!/<link[^>]+rel="stylesheet"[^>]+href="\/_astro\//.test(html)) continue;
  if (!html.includes('</head>')) { problems.push(`${path.relative(DIST, f)}: </head> がないので @font-face を書き込めません`); continue; }
  const { used, found } = charsOf(html);
  // どのページもヘッダーのサイト名が見出しの書体なので、1つも見つからなければ読み取りに失敗している
  if (!found) { problems.push(`${path.relative(DIST, f)}: 見出しが1つも見つかりません`); continue; }
  pages.push({ file: f, html, used });
}
if (!pages.length) problems.push('ページが見つかりません（<head> の読み込み方が変わっていないか確かめてください）');

if (problems.length) {
  console.error(`[subset-fonts] フォントを削れませんでした（${problems.length} 件）`);
  for (const p of problems.slice(0, 10)) console.error(`  - ${p}`);
  process.exit(1);
}

// 2. ページごとに削る前に、まずサイト全体の見出しの文字だけにしておく（元のファイルは1.4MBあり、毎ページ削ると時間がかかる）
const everything = new Set();
for (const p of pages) for (const c of p.used) everything.add(c);
const base = new Map();
for (const weight of WEIGHTS) base.set(weight, await subsetFont(readFileSync(sourceOf(weight)), textOf(everything), { targetFormat: 'woff2' }));

// 同じ文字づかいのページは同じファイルを使い回す（中身で名前を付けるので自然にまとまる）
const made = new Map();
const keep = new Set();
let bytes = 0;
const urlOf = async (weight, used) => {
  const key = `${weight} ${textOf(used)}`;
  if (made.has(key)) return made.get(key);
  const out = await subsetFont(base.get(weight), textOf(used), { targetFormat: 'woff2' });
  const hash = createHash('sha256').update(out).digest('base64url').slice(0, 8);
  const name = `zen-maru-gothic-${weight}-${hash}.woff2`;
  if (!keep.has(name)) { writeFileSync(path.join(ASSETS, name), out); keep.add(name); bytes += out.length; }
  made.set(key, `/_astro/${name}`);
  return made.get(key);
};

for (const page of pages) {
  const decls = [];
  for (const weight of WEIGHTS) {
    const url = await urlOf(weight, page.used);
    decls.push(`@font-face{font-family:${FAMILY};font-style:normal;font-display:swap;font-weight:${weight};src:url(${url}) format("woff2")}`);
  }
  writeFileSync(page.file, readFileSync(page.file, 'utf8').replace('</head>', `<style>${decls.join('')}</style></head>`));
}

// 前のビルドの削り残しを片づける
for (const f of readdirSync(ASSETS)) {
  if ((f.endsWith('.woff2') || f.endsWith('.woff')) && !keep.has(f)) rmSync(path.join(ASSETS, f), { force: true });
}

const kb = (n) => `${Math.round(n / 1024)}KB`;
const perPage = pages.map((p) => p.used.size);
console.log(
  `[subset-fonts] ${pages.length} ページ / 見出しの文字 ${everything.size} 字（1ページ ${Math.min(...perPage)}〜${Math.max(...perPage)} 字）` +
    ` → フォント ${keep.size} 個・${kb(bytes)}（CSS から @font-face ${faces} 個を外し、見出しの指定 ${displaySelectors.size} 件を読み取った）`,
);
