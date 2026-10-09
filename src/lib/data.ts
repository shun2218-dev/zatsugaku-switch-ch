import videosJson from '../data/videos.json';
import { CATEGORIES as CATEGORY_RULES } from '../../scripts/categories.mjs';
import { norm, contentBigrams } from './normalize';

export type Scene = { text: string; alt: string; image: string | null };
export type Video = {
  id: string;
  title: string;
  hook: string;
  description: string;
  format: 'short' | 'longform';
  publishedAt: string;
  views: number;
  tags: string[];
  category: string;
  scenes: Scene[];
};
export type Source = { title: string; publisher: string; url: string };
export type Note = {
  frontmatter: { answer?: string; sources?: Source[]; reviewedAt?: string };
  Content: any;
  rawContent: () => string;
};

export const videos = videosJson as Video[];

export const categories = CATEGORY_RULES.map(({ slug, name }) => ({
  slug,
  name,
  videos: videos.filter((v) => v.category === slug),
}));

export const categoryOf = (slug: string) => categories.find((c) => c.slug === slug)!;

// 動画ごとの加筆（もう少し詳しく・出典）。src/notes/<動画ID>.md があれば記事に差し込む
const noteModules = import.meta.glob<Note>('../notes/*.md', { eager: true });
export const noteOf = (id: string): Note | undefined => noteModules[`../notes/${id}.md`];

export const popular = [...videos].sort((a, b) => b.views - a.views);
export const latest = videos; // 書き出し時点で新しい順

// チャンネル名・シリーズ名など、話題を表さないタグ
const GENERIC_TAG = /雑学|豆知識|^なぜ|通勤|疑問|シリーズ|^科学$|日常の?科学/;

// 動画の特徴 = 話題タグ ＋ タイトルの2文字ずつの切れ端（「腐らない」が共通なら近い、など）
const features = new Map<string, Set<string>>();
for (const v of videos) {
  const f = contentBigrams(v.title);
  for (const t of v.tags) if (!GENERIC_TAG.test(t)) f.add(`#${norm(t)}`);
  features.set(v.id, f);
}
// 多くの動画に出てくる特徴（「なぜ」など）ほど軽く、珍しいものほど重く数える
const featureCount = new Map<string, number>();
for (const f of features.values()) for (const k of f) featureCount.set(k, (featureCount.get(k) ?? 0) + 1);
const weight = (k: string) => {
  const n = featureCount.get(k) ?? 0;
  return n < 2 ? 0 : Math.log(videos.length / n);
};

// 関連記事: 共通する特徴の重みの合計＋同じカテゴリなら加点。同点は再生数の多い順（popular の並び）
export function related(v: Video, n = 4) {
  const mine = features.get(v.id)!;
  return popular
    .filter((x) => x.id !== v.id)
    .map((x) => {
      let score = x.category === v.category ? 3 : 0;
      for (const k of features.get(x.id)!) if (mine.has(k)) score += weight(k);
      return { x, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.x);
}

// 記事に表示するタグ: 話題を表し、2本以上で使われ、広すぎないもの
const tagCount = new Map<string, number>();
for (const v of videos) for (const t of v.tags) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
const MAX_TAG_COUNT = 25;
export const usefulTag = (t: string) => {
  const n = tagCount.get(t) ?? 0;
  return n >= 2 && n <= MAX_TAG_COUNT && !GENERIC_TAG.test(t);
};
export const displayTags = (v: Video, n = 6) => v.tags.filter(usefulTag).slice(0, n);
export const topTags = (n = 16) =>
  [...tagCount.entries()].filter(([t]) => usefulTag(t)).sort((a, b) => b[1] - a[1]).slice(0, n).map(([t]) => t);
export const searchUrl = (q: string) => `/search/?q=${encodeURIComponent(q)}`;

export const plainText = (v: Video) => v.scenes.map((s) => s.text).join('');
export const thumb = (v: Video) => v.scenes.find((s) => s.image)?.image ?? '/og-default.jpg';
export const watchUrl = (v: Video) =>
  v.format === 'short' ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
