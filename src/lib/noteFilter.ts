// 詳細記事の有無での絞り込み。値は URL の ?note= に残し、共有やリロードでも同じ絞り込みになるようにする
export type NoteFilter = 'all' | 'yes' | 'no';
export const NOTE_FILTERS: { value: NoteFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'yes', label: 'あり' },
  { value: 'no', label: 'なし' },
];

export const readNoteFilter = (search = location.search): NoteFilter => {
  const v = new URLSearchParams(search).get('note');
  return v === 'yes' || v === 'no' ? v : 'all';
};

export const matchesNote = (hasNote: boolean, f: NoteFilter) => f === 'all' || hasNote === (f === 'yes');
