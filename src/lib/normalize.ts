// 表記ゆれを吸収する（検索と関連記事で共通）
// 同じものを指す表記をカタカナにそろえる（このあと norm でひらがなに寄せるため検索ではどれでも当たる）
const SYNONYMS: [RegExp, string][] = [[/蜂蜜|はちみつ/g, 'ハチミツ']];

// 全角半角・大文字小文字をそろえ、同義の表記を置き換える（カナはそのまま）
export function canonical(s: string) {
  let out = s.normalize('NFKC').toLowerCase();
  for (const [re, to] of SYNONYMS) out = out.replace(re, to);
  return out;
}

const toHiragana = (s: string) => s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

// 比較用: canonical に加えてカタカナをひらがなに寄せる（ハチミツ = はちみつ）
export const norm = (s: string) => toHiragana(canonical(s));

// タイトルの2文字ずつの切れ端のうち、漢字かカタカナを含むものだけ（送り仮名・語尾の一致を除く）
export function contentBigrams(s: string) {
  const t = canonical(s).replace(/[\s、。？！「」・,?!]/g, '');
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) {
    const bi = t.slice(i, i + 2);
    if (!/^[ぁ-ゟ]+$/.test(bi)) out.add(toHiragana(bi));
  }
  return out;
}
