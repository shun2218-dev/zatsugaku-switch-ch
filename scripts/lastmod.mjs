// サイトマップの最終更新日（lastmod）。astro.config.mjs から使う
// 記事 = 動画の公開日と、詳細記事の確認日（reviewedAt）の新しいほう
// 英語版の記事 = 人が確かめた日（reviewedAt）、なければ翻訳した日（translatedAt）
// 一覧・カテゴリ = 含まれる記事のうち最も新しい日（英語のページは英語版の日付で）。それ以外の固定ページは付けない
import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const videos = JSON.parse(readFileSync(new URL('src/data/videos.json', root), 'utf8'));

// <dir> の各記事（<動画ID>.md）の reviewedAt
function reviewedDates(dir, keys = ['reviewedAt']) {
  const dates = new Map();
  let files = [];
  try {
    files = readdirSync(new URL(dir, root));
  } catch {}
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const text = readFileSync(new URL(`${dir}${file}`, root), 'utf8');
    const m = keys.map((k) => text.match(new RegExp(`^${k}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'))).find(Boolean);
    if (m) dates.set(file.slice(0, -3), `${m[1]}T00:00:00+09:00`);
  }
  return dates;
}
const reviewedAt = reviewedDates('src/notes/');
const enReviewedAt = reviewedDates('src/translations/en/', ['reviewedAt', 'translatedAt']);

const latest = (dates) => dates.reduce((a, b) => (new Date(b) > new Date(a) ? b : a));
const articleDate = new Map(videos.map((v) => [v.id, latest([v.publishedAt, reviewedAt.get(v.id) ?? v.publishedAt])]));
const newest = (list) => (list.length ? new Date(latest(list.map((v) => articleDate.get(v.id)))).toISOString() : undefined);
const enVideos = videos.filter((v) => enReviewedAt.has(v.id));
const newestEn = (list) => (list.length ? new Date(latest(list.map((v) => enReviewedAt.get(v.id)))).toISOString() : undefined);

// 書き出し済みの記事か。/trivia/<動画ID>/ のうち記事でないもの（準備中の仮ページ）はサイトマップに載せない
export function isPendingPage(url) {
  const m = new URL(url).pathname.match(/^\/trivia\/([^/]+)\/$/);
  return Boolean(m) && !articleDate.has(m[1]);
}

export function lastmodOf(url) {
  const path = new URL(url).pathname;
  const en = path.match(/^\/en\/trivia\/([^/]+)\/$/);
  if (en) return enReviewedAt.has(en[1]) ? new Date(enReviewedAt.get(en[1])).toISOString() : undefined;
  const trivia = path.match(/^\/trivia\/([^/]+)\/$/);
  if (trivia) return articleDate.has(trivia[1]) ? new Date(articleDate.get(trivia[1])).toISOString() : undefined;
  if (path === '/' || path === '/trivia/') return newest(videos);
  if (path === '/en/' || path === '/en/trivia/') return newestEn(enVideos);
  const cat = path.match(/^\/(en\/)?category\/([^/]+)\/$/);
  if (cat) return cat[1] ? newestEn(enVideos.filter((v) => v.category === cat[2])) : newest(videos.filter((v) => v.category === cat[2]));
  return undefined;
}
