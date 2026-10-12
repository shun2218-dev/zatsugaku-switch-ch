// サイトマップの最終更新日（lastmod）。astro.config.mjs から使う
// 記事 = 動画の公開日と、詳細記事の確認日（reviewedAt）の新しいほう
// 一覧・カテゴリ = 含まれる記事のうち最も新しい日。それ以外の固定ページは付けない
import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const videos = JSON.parse(readFileSync(new URL('src/data/videos.json', root), 'utf8'));

const reviewedAt = new Map();
for (const file of readdirSync(new URL('src/notes/', root))) {
  if (!file.endsWith('.md')) continue;
  const m = readFileSync(new URL(`src/notes/${file}`, root), 'utf8').match(/^reviewedAt:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  if (m) reviewedAt.set(file.slice(0, -3), `${m[1]}T00:00:00+09:00`);
}

const latest = (dates) => dates.reduce((a, b) => (new Date(b) > new Date(a) ? b : a));
const articleDate = new Map(videos.map((v) => [v.id, latest([v.publishedAt, reviewedAt.get(v.id) ?? v.publishedAt])]));
const newest = (list) => (list.length ? new Date(latest(list.map((v) => articleDate.get(v.id)))).toISOString() : undefined);

export function lastmodOf(url) {
  const path = new URL(url).pathname;
  const trivia = path.match(/^\/trivia\/([^/]+)\/$/);
  if (trivia) return articleDate.has(trivia[1]) ? new Date(articleDate.get(trivia[1])).toISOString() : undefined;
  if (path === '/' || path === '/trivia/') return newest(videos);
  const cat = path.match(/^\/category\/([^/]+)\/$/);
  if (cat) return newest(videos.filter((v) => v.category === cat[1]));
  return undefined;
}
