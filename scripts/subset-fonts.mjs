// ページごとに、そのページで使う文字だけの見出しフォントを作る（pnpm build のあとに実行される）
// @fontsource のフォントは文字の範囲ごとに百数十個のファイルに分かれている。
// 以前はそれを「サイト全体で使う文字」で削っていたが、それだと1つ1つのファイルにサイト中の漢字が残るため、
// トップページだけで 85ファイル・894KB を読んでいた（PageSpeed Insights のスマホ評価 57 の主因）。
// ここでは分割ファイルではなく日本語がまとまった1ファイルを元にして、
// ページごとに「そのページに出てくる文字だけ」へ削り、@font-face をそのページの <head> に直接書く。
//   1. ビルドした CSS から @fontsource の @font-face を外す（削っていないフォントなので配らない。
//      pnpm dev で見出しが正しい書体で見えるように、Base.astro では読み込んだままにしてある）
//   2. ページごとのフォントを作り、そのページの <head> に @font-face を書き込む
// 本文の BIZ UDPゴシックは配信しない（Windows には最初から入っているので local で使い、
// スマホでは端末の書体にする）。指定は global.css の --font にある。
// 思ったとおりに削れなかったときは、気づかないまま公開しないようにビルドを止める。
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

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

const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

// そのページに出てくる文字（ページを動かす JavaScript が書き込む文字も拾えるように、HTML 全体から集める）。
// 検索欄に打つ英数字などに備えて、ASCII の表示できる文字は必ず入れる
const charsOf = (html) => {
  const used = new Set();
  for (let c = 0x20; c <= 0x7e; c++) used.add(c);
  for (const ch of decode(html)) used.add(ch.codePointAt(0));
  return used;
};
const textOf = (codes) => String.fromCodePoint(...[...codes].sort((a, b) => a - b));

// このサイトのページ（公開フォルダにそのまま置いた HTML は、別のデザインなので触らない）
const pages = [];
for (const f of htmlFiles()) {
  const html = readFileSync(f, 'utf8');
  if (!/<link[^>]+rel="stylesheet"[^>]+href="\/_astro\//.test(html)) continue;
  if (!html.includes('</head>')) { problems.push(`${path.relative(DIST, f)}: </head> がないので @font-face を書き込めません`); continue; }
  pages.push({ file: f, html, used: charsOf(html) });
}
if (!pages.length) problems.push('ページが見つかりません（<head> の読み込み方が変わっていないか確かめてください）');

if (problems.length) {
  console.error(`[subset-fonts] フォントを削れませんでした（${problems.length} 件）`);
  for (const p of problems.slice(0, 10)) console.error(`  - ${p}`);
  process.exit(1);
}

// 2. ページごとに削る前に、まずサイト全体で使う文字だけにしておく（元のファイルは1.4MBあり、毎ページ削ると時間がかかる）
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
  `[subset-fonts] ${pages.length} ページ / 使う文字 ${everything.size} 字（1ページ ${Math.min(...perPage)}〜${Math.max(...perPage)} 字）` +
    ` → フォント ${keep.size} 個・${kb(bytes)}（CSS から @font-face ${faces} 個を外した）`,
);
