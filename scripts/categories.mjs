// 動画をサイトのカテゴリへ振り分ける。上から順に最初に当たったものを採用。
// YTAutomator の theme_bundle は表記が揺れているため、タイトル・タグのキーワードで判定する。
export const CATEGORIES = [
  { slug: 'sports', name: 'スポーツ', emoji: '⚽', re: /サッカー|フットボール|オフサイド|PK|VAR|キーパー|審判|主審|ワールドカップ|ハットトリック|ボランチ|フリーキック|スローイン|陸上|コーナーフラッグ|アディショナルタイム/ },
  { slug: 'food', name: '食べもの・キッチン', emoji: '🍯', re: /ハチミツ|蜂蜜|はちみつ|コーヒー|炭酸|天ぷら|玉ねぎ|缶詰|お米|塩|パン|プリン|野菜|揚げ|じゃがいも|牛乳|バナナ|冷蔵庫|圧力鍋|食品|料理/ },
  { slug: 'body', name: 'からだ・生きもの', emoji: '🫀', re: /寝不足|風邪|あくび|眠|自分の声|耳|息が|靴擦れ|猫|犬|金魚|植物|年輪|赤目|体内時計|からだ|体の/ },
  { slug: 'nature', name: '空・天気・自然', emoji: '🌈', re: /雨|雷|虹|(?<!真)空(?!気)|月|星|台風|雲|夕立|天気|朝焼け|夕焼け|雪|露|曇|火星|海の水/ },
  { slug: 'things', name: '身近なモノ・しくみ', emoji: '💡', re: /.*/ },
];

// タイトルで決まればそれを優先し、決まらなければタグで判定する
export function categorize({ title, tags }) {
  const specific = CATEGORIES.slice(0, -1);
  const hit = specific.find((c) => c.re.test(title)) ?? specific.find((c) => c.re.test(tags.join(' ')));
  return (hit ?? CATEGORIES.at(-1)).slug;
}
