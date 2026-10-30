// 一覧・カテゴリページのページ分け。1ページ24本（2・3・4列のどれでも割り切れる）
// 「詳細記事 あり/なし」の絞り込みも静的なページにする（GitHub Pages では ?note= でページの中身を変えられないため）。
// /trivia/ → /trivia/2/ … と /trivia/note-yes/ → /trivia/note-yes/2/ …。絞り込んだページは検索に出さない（noindex・サイトマップに載せない）
import { type Video, hasNote } from './data';
import { type Lang, alternatesOf } from './i18n';
import { type NoteFilter, NOTE_FILTER_TEXT, matchesNote } from './noteFilter';

export const PER_PAGE = 24;
const FILTERS = ['all', 'yes', 'no'] as const;

/** 絞り込みとページ番号のパス（base は '/trivia/' や '/en/category/food/'） */
export const listPath = (base: string, filter: NoteFilter, page: number) =>
  `${base}${filter === 'all' ? '' : `note-${filter}/`}${page > 1 ? `${page}/` : ''}`;

const matching = (list: Video[], filter: NoteFilter) => list.filter((v) => matchesNote(hasNote(v.id), filter));
const pageCount = (n: number) => Math.max(1, Math.ceil(n / PER_PAGE));

export type ListPage = { filter: NoteFilter; page: number; pages: number; items: Video[]; counts: Record<NoteFilter, number> };

/** getStaticPaths 用。[...page] に入る値（undefined・'2'・'note-yes'・'note-yes/2' …）と、そのページに出す記事 */
export function listPages(list: Video[]): { page: string | undefined; props: ListPage }[] {
  const counts = Object.fromEntries(FILTERS.map((f) => [f, matching(list, f).length])) as Record<NoteFilter, number>;
  return FILTERS.flatMap((filter) => {
    const matched = matching(list, filter);
    const pages = pageCount(matched.length);
    return Array.from({ length: pages }, (_, i) => ({
      page: listPath('', filter, i + 1).replace(/\/$/, '') || undefined,
      props: { filter, page: i + 1, pages, items: matched.slice(i * PER_PAGE, (i + 1) * PER_PAGE), counts },
    }));
  });
}

/** 日本語と英語の両方に同じページ（同じ絞り込み・ページ番号）があれば、その組（Base の alternates） */
export const listAlternates = (path: string, ja: Video[], en: Video[], filter: NoteFilter, page: number) =>
  page <= pageCount(matching(ja, filter).length) && page <= pageCount(matching(en, filter).length) ? alternatesOf(listPath(path, filter, page)) : undefined;

/** 絞り込みとページ番号の説明（「詳細記事あり・2ページ目」「with in-depth articles, page 2」）。最初のページで絞り込みなしなら '' */
export function listLabel(lang: Lang, filter: NoteFilter, page: number) {
  const parts = lang === 'en'
    ? [filter === 'all' ? '' : `${filter === 'yes' ? 'with' : 'without'} in-depth articles`, page > 1 ? `page ${page}` : '']
    : [filter === 'all' ? '' : `詳細記事${NOTE_FILTER_TEXT.ja[filter]}`, page > 1 ? `${page}ページ目` : ''];
  return parts.filter(Boolean).join(lang === 'en' ? ', ' : '・');
}

/** タイトルの後ろにつける listLabel（「（詳細記事あり・2ページ目）」「 (with in-depth articles, page 2)」） */
export function listSuffix(lang: Lang, filter: NoteFilter, page: number) {
  const label = listLabel(lang, filter, page);
  return label ? (lang === 'en' ? ` (${label})` : `（${label}）`) : '';
}

/** ページ送りに出す番号。最初・最後・いまのページの前後だけ出し、あいだは null（…）にする。1つしか飛ばさないときは番号を出す */
export function pageNumbers(page: number, pages: number): (number | null)[] {
  const shown = [...new Set([1, page - 1, page, page + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  return shown.flatMap((n, i) => {
    const prev = shown[i - 1];
    if (prev === undefined || n - prev === 1) return [n];
    return n - prev === 2 ? [prev + 1, n] : [null, n];
  });
}
