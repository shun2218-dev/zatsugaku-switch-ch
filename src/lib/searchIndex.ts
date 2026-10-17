// サイト内検索用の目次。検索ページがブラウザで読み込んで絞り込む（/search-index.json と /en/search-index.json）
import { videos, categoryOf, noteOf, plainText, thumb } from './data';
import { type Lang, CATEGORY_NAME_EN, enArticleOf, inLang } from './i18n';

const stripMarkdown = (md: string) =>
  md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*>`_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();

export async function searchIndex(lang: Lang) {
  return Promise.all(
    inLang(videos, lang).map(async (v) => {
      const note = noteOf(v.id);
      const common = { id: v.id, k: v.category, i: thumb(v), l: v.format === 'longform' ? 1 : 0, n: note ? 1 : 0, v: v.views };
      if (lang === 'en') {
        const en = enArticleOf(v.id)!;
        // タグは日本語しかないので、英語の目次には入れない
        return { ...common, t: en.title, c: CATEGORY_NAME_EN[v.category], g: [], h: en.answer, b: [en.scenes.map((s) => s.text).join(' '), stripHtml(await en.html())].join(' ') };
      }
      return { ...common, t: v.title, c: categoryOf(v.category).name, g: v.tags, h: note?.frontmatter.answer ?? v.hook, b: [plainText(v), note ? stripMarkdown(note.rawContent()) : ''].join(' ') };
    }),
  );
}
