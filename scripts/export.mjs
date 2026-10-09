// YTAutomator の DB から公開済み動画を書き出し、サイト用の JSON と画像を作る。
// 使い方: pnpm export   （YTAUTOMATOR_DIR で YTAutomator の場所を変更可）
import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
import sharp from 'sharp';
import { categorize } from './categories.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const YTA = process.env.YTAUTOMATOR_DIR ?? path.resolve(ROOT, '../YTAutomator');
const OUT_JSON = path.join(ROOT, 'src/data/videos.json');
const OUT_IMG = path.join(ROOT, 'public/img');

async function databaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const env = await fs.readFile(path.join(YTA, '.env'), 'utf8');
  const m = env.match(/^DATABASE_URL="?([^"\n]+)"?/m);
  if (!m) throw new Error('DATABASE_URL が見つかりません');
  return m[1];
}

const client = new pg.Client({ connectionString: await databaseUrl() });
await client.connect();
const { rows } = await client.query(`
  select v.id as "projectId", v.title, v."planJson" as plan,
         u."youtubeVideoId" as "videoId", u."publishedAt",
         coalesce((select sum(m.views) from "MetricsDaily" m
                   where m."youtubeVideoId" = u."youtubeVideoId"), 0)::int as views
  from "VideoProject" v
  join "Upload" u on u."projectId" = v.id
  where u."privacyStatus" = 'PUBLIC' and v."planJson" is not null
  order by u."publishedAt" desc nulls last`);
await client.end();

await fs.mkdir(OUT_IMG, { recursive: true });

async function convert(src, dest, width) {
  try {
    await fs.access(dest);
    return true; // 変換済み
  } catch {}
  try {
    await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(dest);
    return true;
  } catch {
    return false;
  }
}

const videos = [];
for (const r of rows) {
  const plan = r.plan;
  const meta = plan.metadata_draft ?? {};
  const format = plan.format === 'longform' ? 'longform' : 'short';
  const srcDir = path.join(YTA, 'storage/projects', r.projectId);
  const imgDir = path.join(OUT_IMG, r.videoId);
  await fs.mkdir(imgDir, { recursive: true });

  const scenes = [];
  for (const [i, s] of (plan.scenes ?? []).entries()) {
    const ok = await convert(path.join(srcDir, `scene-${i}.jpg`), path.join(imgDir, `scene-${i}.webp`), 720);
    scenes.push({ text: s.narration, alt: s.visual ?? '', image: ok ? `/img/${r.videoId}/scene-${i}.webp` : null });
  }

  const title = r.title ?? meta.title ?? plan.title_candidates?.[0];
  const tags = [...new Set([...(meta.tags ?? []), ...(plan.tags ?? [])])].filter((t) => t !== '雑学');
  const bundle = plan.plan_tags?.find((t) => t.key === 'theme_bundle')?.value ?? '';
  videos.push({
    id: r.videoId,
    title,
    hook: plan.hook ?? '',
    description: meta.description ?? '',
    format,
    publishedAt: r.publishedAt,
    views: r.views,
    tags,
    category: categorize({ title, tags, bundle }),
    scenes,
  });
}

await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
await fs.writeFile(OUT_JSON, JSON.stringify(videos, null, 2) + '\n');

const byCat = Object.groupBy(videos, (v) => v.category);
console.log(`${videos.length} 本を書き出しました`);
for (const [c, list] of Object.entries(byCat)) console.log(`  ${c}: ${list.length}`);
