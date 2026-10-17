// 英語版のページ。日本語のページと同じ構成を /en/ の下に置く（/about/ → /en/about/）。
// 記事の中身は scripts/translate.mjs が Claude で翻訳して src/translations/en/<動画ID>.md に書き、すべて公開する（ページに AI 翻訳だと出す）。
// 人が内容を確かめた記事は reviewedAt に日付が入っていて、ページに「確認済み」と出る。
// 画面の決まった文言は UI にまとめる
import { videos, categoryOf, type Video } from './data';

export type Lang = 'ja' | 'en';

export const UI = {
  ja: {
    siteName: '雑学スイッチ',
    subscribe: 'チャンネル登録',
    subscribeShort: '登録',
    languageNav: '言語',
    breadcrumb: 'パンくずリスト',
    videoTitle: (t: string) => `動画: ${t}`,
    count: (n: number) => `${n}本`,
    longform: 'じっくり解説',
    note: '詳細記事',
  },
  en: {
    siteName: 'Zatsugaku Switch',
    subscribe: 'Subscribe',
    subscribeShort: 'Subscribe',
    languageNav: 'Language',
    breadcrumb: 'Breadcrumb',
    videoTitle: (t: string) => `Video: ${t}`,
    count: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    longform: 'Deep dive',
    note: 'In-depth',
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

/** 言語ごとのパス。日本語はそのまま、英語は /en/ をつける（'/about/' → '/en/about/'） */
export const localePath = (lang: Lang, path: string) => (lang === 'en' ? `/en${path}` : path);
/** 日本語と英語のページの組（Base の alternates に渡す） */
export const alternatesOf = (path: string): Record<Lang, string> => ({ ja: path, en: localePath('en', path) });

export const categoryName = (slug: string, lang: Lang) => (lang === 'en' ? CATEGORY_NAME_EN[slug] : categoryOf(slug).name);

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
export const articleUrl = (id: string, lang: Lang) => (lang === 'en' ? enUrl(id) : jaUrl(id));
/** 一覧に出すタイトル。英語版がまだない記事は日本語のまま */
export const titleOf = (v: Video, lang: Lang) => (lang === 'en' ? (enArticleOf(v.id)?.title ?? v.title) : v.title);
/** 英語のページの一覧に出す記事（英語版があるものだけ） */
export const inLang = (list: Video[], lang: Lang) => (lang === 'en' ? list.filter((v) => enById.has(v.id)) : list);
