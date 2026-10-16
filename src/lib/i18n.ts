// 英語版の記事（/en/trivia/<動画ID>/）。いまは記事ページだけを英語にしている。
// 中身は scripts/translate.mjs が Claude で翻訳して src/translations/en/<動画ID>.md に書き、すべて公開する（ページに AI 翻訳だと出す）。
// 人が内容を確かめた記事は reviewedAt に日付が入っていて、ページに「確認済み」と出る。
// 画面の決まった文言は UI にまとめる（あとでトップや一覧を英語にするときもここに足す）
import { videos, type Video } from './data';

export type Lang = 'ja' | 'en';

export const UI = {
  ja: {
    siteName: '雑学スイッチ',
    subscribe: 'チャンネル登録',
    subscribeShort: '登録',
    languageNav: '言語',
    breadcrumb: 'パンくずリスト',
    videoTitle: (t: string) => `動画: ${t}`,
  },
  en: {
    siteName: 'Zatsugaku Switch',
    subscribe: 'Subscribe',
    subscribeShort: 'Subscribe',
    languageNav: 'Language',
    breadcrumb: 'Breadcrumb',
    videoTitle: (t: string) => `Video: ${t}`,
  },
} as const;

export const LANG_LABEL: Record<Lang, string> = { ja: '日本語', en: 'English' };

export const CATEGORY_NAME_EN: Record<string, string> = {
  sports: 'Sports',
  food: 'Food & Kitchen',
  body: 'Body & Living Things',
  nature: 'Sky, Weather & Nature',
  things: 'Everyday Things',
};

export type EnSource = { title: string; titleEn?: string; publisher: string; url: string; lang: 'ja' | 'en' };
type EnModule = {
  frontmatter: {
    reviewedAt?: string | Date;
    translatedAt?: string | Date;
    title: string;
    answer: string;
    description: string;
    scenes: { text: string; alt: string }[];
    sources?: EnSource[];
  };
  compiledContent: () => string | Promise<string>;
};

/** 日付（"2026-10-17" か、引用符を忘れて Date になったもの）を YYYY-MM-DD にそろえる。空なら '' */
const ymd = (d: string | Date | undefined) => (d instanceof Date ? d.toISOString().slice(0, 10) : (d ?? '').trim());

const modules = import.meta.glob<EnModule>('../translations/en/*.md', { eager: true });

export type EnArticle = EnModule['frontmatter'] & {
  id: string;
  video: Video;
  /** 人が確かめた日。確かめていなければ '' */
  reviewedAt: string;
  translatedAt: string;
  /** 最後に手が入った日（確かめた日か翻訳した日） */
  updatedAt: string;
  html: () => Promise<string>;
};

/** 日本語の記事もある英語版 */
export const enArticles: EnArticle[] = videos.flatMap((video) => {
  const mod = modules[`../translations/en/${video.id}.md`];
  if (!mod) return [];
  const reviewedAt = ymd(mod.frontmatter.reviewedAt);
  const translatedAt = ymd(mod.frontmatter.translatedAt);
  return [{ ...mod.frontmatter, id: video.id, video, reviewedAt, translatedAt, updatedAt: reviewedAt || translatedAt || video.publishedAt.slice(0, 10), html: async () => await mod.compiledContent() }];
});

const enById = new Map(enArticles.map((a) => [a.id, a]));
export const enArticleOf = (id: string) => enById.get(id);
export const enUrl = (id: string) => `/en/trivia/${id}/`;
export const jaUrl = (id: string) => `/trivia/${id}/`;
