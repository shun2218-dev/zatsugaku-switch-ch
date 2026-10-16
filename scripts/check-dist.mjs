// ビルドしたページに、Markdown の記号が変換されずに残っていないかを確かめる（pnpm build のあとに実行される）
// 例: 「**約24時間のリズム（体内時計）**が」が太字にならず、** がそのまま画面に出る
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '../dist');

function* htmlFiles(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

// 画面に出る文字だけを見る（script・style・code の中と、タグの属性は除く）
const visibleText = (html) =>
  html
    .replace(/<(script|style|code|pre)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]+>/g, ' ');

const LEFTOVER = [
  { name: '太字の **', re: /\*\*/ },
  { name: '斜体・太字の __', re: /(^|[^\w])__\S/ },
  { name: 'リンクの ](', re: /\]\(/ },
];

const problems = [];
for (const file of htmlFiles(DIST)) {
  const text = visibleText(readFileSync(file, 'utf8'));
  for (const { name, re } of LEFTOVER) {
    const m = text.match(new RegExp(`.{0,20}(?:${re.source}).{0,20}`));
    if (m) problems.push(`${path.relative(DIST, file)}: ${name} が残っています … ${m[0].trim()}`);
  }
}

if (problems.length) {
  console.error(`[check-dist] Markdown の記号が変換されずに残っているページがあります（${problems.length} 件）`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('[check-dist] Markdown の記号の残りはありません');
