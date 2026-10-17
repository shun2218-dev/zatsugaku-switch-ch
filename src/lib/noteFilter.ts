// 詳細記事の有無での絞り込み。値は URL の ?note= に残し、共有やリロードでも同じ絞り込みになるようにする
// ブラウザ側のスクリプトからも使うので、記事データ（data.ts・i18n.ts）は読み込まない
export type NoteFilter = 'all' | 'yes' | 'no';
type Lang = 'ja' | 'en';

export const NOTE_FILTER_TEXT = {
  ja: { label: '詳細記事', all: 'すべて', yes: 'あり', no: 'なし', empty: 'この条件に当てはまる雑学はまだありません。' },
  en: { label: 'In-depth article', all: 'All', yes: 'Yes', no: 'No', empty: 'No trivia matches this filter yet.' },
} as const;

export const NOTE_FILTERS = (lang: Lang = 'ja'): { value: NoteFilter; label: string }[] =>
  (['all', 'yes', 'no'] as const).map((value) => ({ value, label: NOTE_FILTER_TEXT[lang][value] }));

export const readNoteFilter = (search = location.search): NoteFilter => {
  const v = new URLSearchParams(search).get('note');
  return v === 'yes' || v === 'no' ? v : 'all';
};

export const matchesNote = (hasNote: boolean, f: NoteFilter) => f === 'all' || hasNote === (f === 'yes');
