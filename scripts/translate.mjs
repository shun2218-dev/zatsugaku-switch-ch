// 日本語の記事（videos.json の台本 + src/notes の加筆）を Claude で英語にし、src/translations/en/<動画ID>.md に書く。
// 書いた英語版はそのまま /en/trivia/<動画ID>/ に公開される（ページに AI 翻訳だと出す）。人が確かめたら reviewedAt に日付を入れると「確認済み」と出る。
// 使い方: pnpm translate <動画ID> ...   指定した記事を翻訳する（あれば上書き）
//         pnpm translate --missing      英語版がまだない記事をすべて翻訳する
//         pnpm translate --stale        日本語の記事が翻訳後に変わったものを翻訳し直す
//         pnpm translate --auto         英語版がまだない記事と、日本語が変わった記事を翻訳する（--missing と --stale。pnpm sync と GitHub Actions が使う）
//         --dry-run をつけると、対象を表示するだけで翻訳しない。--jobs=N で同時に翻訳する本数（既定 4）
// ANTHROPIC_API_KEY は環境変数か ../YTAutomator/.env から読む
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import YAML from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const YTA = process.env.YTAUTOMATOR_DIR ?? path.resolve(ROOT, '../YTAutomator');
const NOTES = path.join(ROOT, 'src/notes');
const OUT = path.join(ROOT, 'src/translations/en');

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith('--')));
const ids = argv.filter((a) => !a.startsWith('--'));
const dryRun = flags.has('--dry-run');
const jobs = Math.max(1, Number(argv.find((a) => a.startsWith('--jobs='))?.slice(7)) || 4);

const videos = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/videos.json'), 'utf8'));
const byId = new Map(videos.map((v) => [v.id, v]));

const readOr = (file, fallback) => fs.readFile(file, 'utf8').catch(() => fallback);

/** Markdown を frontmatter（オブジェクト）と本文に分ける */
function splitFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { data: YAML.parse(m[1]) ?? {}, body: m[2].trim() } : { data: {}, body: md.trim() };
}

/** 翻訳のもとになる日本語。これが変わったら翻訳し直す */
async function sourceOf(video) {
  const note = splitFrontmatter(await readOr(path.join(NOTES, `${video.id}.md`), ''));
  return {
    title: video.title,
    hook: video.hook,
    answer: note.data.answer ?? '',
    description: video.description,
    scenes: video.scenes.map((s) => ({ text: s.text, alt: s.alt })),
    body: note.body,
    sources: note.data.sources ?? [],
  };
}
const hashOf = (src) => crypto.createHash('sha256').update(JSON.stringify(src)).digest('hex').slice(0, 12);

async function existing(id) {
  const md = await readOr(path.join(OUT, `${id}.md`), null);
  return md && splitFrontmatter(md).data;
}

// ---- 対象を決める ----
let targets = ids;
const missing = flags.has('--auto') || flags.has('--missing');
const staleToo = flags.has('--auto') || flags.has('--stale');
if (missing || staleToo) {
  targets = [];
  for (const v of videos) {
    const done = await existing(v.id);
    if (!done ? missing : staleToo && done.sourceHash !== hashOf(await sourceOf(v))) targets.push(v.id);
  }
}
const unknown = targets.filter((id) => !byId.has(id));
if (unknown.length) throw new Error(`書き出し済みの記事にない動画ID: ${unknown.join(', ')}`);
if (!targets.length) {
  console.log('[translate] 翻訳する記事はありません');
  process.exit(0);
}
console.log(`[translate] ${targets.length} 本: ${targets.map((id) => byId.get(id).title).join(' / ')}`);
if (dryRun) process.exit(0);

// ---- Claude で翻訳する ----
async function apiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const env = await readOr(path.join(YTA, '.env'), '');
  return env.match(/^ANTHROPIC_API_KEY="?([^"\n]+)"?/m)?.[1]; // なければ SDK の既定（ant auth login のプロファイルなど）
}
const client = new Anthropic({ apiKey: await apiKey() });

const SYSTEM = `You translate articles from "雑学スイッチ" (Zatsugaku Switch), a Japanese website that explains everyday "why?" trivia from its short YouTube videos, into English.

Write for curious general readers around the world: plain, friendly, natural American English, not a word-for-word rendering. Keep every factual claim, number, caveat and hedge exactly as strong as the original; do not add or drop information.

Fields:
- title: the question as a natural English headline (e.g. "Why doesn't honey spoil?").
- answer: the short "in short" answer. If the Japanese answer is empty, translate the hook instead.
- description: the video description, for search results.
- scenes: narration lines of the video and their image descriptions. Translate one-to-one, same count and order.
- body: Markdown. Keep the same structure (### headings, lists, bold, links). Keep every link URL exactly as written; translate only the link text. Return "" if the Japanese body is empty.
- sources: one entry per source, in order. titleEn is an English translation of the title, or "" if the title is already in English. publisher is the publisher's English name (for Japanese organizations, the official English name, e.g. "Ministry of Health, Labour and Welfare (Japan)").

The video itself is in Japanese; references to "the video" stay as they are. When a term only makes sense in Japan, use its English name and add a brief gloss.`;

const SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    answer: { type: 'string' },
    description: { type: 'string' },
    scenes: {
      type: 'array',
      items: { type: 'object', properties: { text: { type: 'string' }, alt: { type: 'string' } }, required: ['text', 'alt'], additionalProperties: false },
    },
    body: { type: 'string' },
    sources: {
      type: 'array',
      items: { type: 'object', properties: { titleEn: { type: 'string' }, publisher: { type: 'string' } }, required: ['titleEn', 'publisher'], additionalProperties: false },
    },
  },
  required: ['title', 'answer', 'description', 'scenes', 'body', 'sources'],
  additionalProperties: false,
};

async function translate(src) {
  const input = { ...src, sources: src.sources.map((s) => ({ title: s.title, publisher: s.publisher })) };
  const res = await client.beta.messages.create({
    model: 'claude-opus-5-5',
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
    system: SYSTEM,
    messages: [{ role: 'user', content: JSON.stringify(input, null, 2) }],
  });
  if (res.stop_reason === 'refusal') throw new Error(`翻訳を断られました（${res.stop_details?.category ?? '理由不明'}）`);
  if (res.stop_reason === 'max_tokens') throw new Error('出力が長すぎて途中で切れました');
  const out = JSON.parse(res.content.find((b) => b.type === 'text').text);
  if (out.scenes.length !== src.scenes.length) throw new Error('シーンの数が日本語と合いません');
  if (out.sources.length !== src.sources.length) throw new Error('出典の数が日本語と合いません');
  return out;
}

const JAPANESE = /[぀-ヿ一-鿿]/;
const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });

async function write(id, src, en) {
  const data = {
    reviewedAt: '',
    translatedAt: today,
    sourceHash: hashOf(src),
    title: en.title,
    answer: en.answer,
    description: en.description,
    scenes: en.scenes,
    sources: src.sources.map((s, i) => ({
      title: s.title,
      ...(en.sources[i].titleEn && { titleEn: en.sources[i].titleEn }),
      publisher: en.sources[i].publisher,
      url: s.url,
      lang: JAPANESE.test(s.title) ? 'ja' : 'en',
    })),
  };
  const head = '# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る\n';
  await fs.mkdir(OUT, { recursive: true });
  // 日付は引用符で囲む（Astro の YAML は囲まない日付を Date として読むため。src/notes の reviewedAt と同じ）
  const yaml = YAML.stringify(data, { lineWidth: 0 }).replace(/^(reviewedAt|translatedAt): (.*)$/gm, (_, k, v) => `${k}: "${v.replace(/^"|"$/g, '')}"`);
  await fs.writeFile(path.join(OUT, `${id}.md`), `---\n${head}${yaml}---\n${en.body ? `${en.body}\n` : ''}`);
}

let failed = 0;
async function translateOne(id) {
  const video = byId.get(id);
  try {
    if ((await existing(id))?.reviewedAt) console.warn(`  ! ${id} は確認済みでしたが、翻訳し直すので確認済みの印を外します`);
    const src = await sourceOf(video);
    // シーンや出典の数が日本語と合わないなど、検証で弾いたときは1回だけやり直す（API のエラーは SDK が再試行する）
    const en = await translate(src).catch((e) => {
      if (e instanceof Anthropic.APIError) throw e;
      console.warn(`  … ${id} やり直します（${e.message}）`);
      return translate(src);
    });
    await write(id, src, en);
    console.log(`  ✓ ${id} ${video.title}`);
  } catch (e) {
    failed++;
    console.error(`  ✗ ${id} ${video.title}: ${e instanceof Anthropic.APIError ? `API ${e.status} ${e.message}` : e.message}`);
  }
}
// jobs 本ずつ同時に翻訳する（SDK が 429 などは自動で再試行する）
const queue = [...targets];
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await translateOne(queue.shift());
}));
console.log(`[translate] ${targets.length - failed} 本を src/translations/en に書きました`);
if (failed) process.exit(1);
