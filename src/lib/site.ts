export const SITE = {
  name: '雑学スイッチ',
  // YouTube のハンドル（@雑学スイッチch）。検索で同名のゲーム等と区別してもらうため、構造化データの別名に入れる
  alternateName: '雑学スイッチch',
  tagline: '30秒で、好奇心にスイッチ。',
  description:
    'YouTube の雑学チャンネル「雑学スイッチ（雑学スイッチch）」の公式サイト。「なぜ？」に30秒で答える動画で紹介した雑学を、空・天気、食べもの、からだ、身近なモノのしくみまで記事で詳しく解説します。',
  channelUrl: 'https://www.youtube.com/@%E9%9B%91%E5%AD%A6%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81ch',
  channelId: 'UC6v_FuKG6UdkwpOLeCJRGbQ',
  contactUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd17kfMR-RGTlm9WlabCfRjMqN5H1HnwIdzWe2JFuS6hfp3hQ/viewform',
};

// 英語のページ（/en/）で使う名前と説明
export const SITE_EN = {
  name: 'Zatsugaku Switch',
  tagline: 'Everyday "why?" questions, answered in 30 seconds.',
  description:
    'The official site of Zatsugaku Switch, a Japanese YouTube trivia channel. Short videos answer everyday "why?" questions in about 30 seconds, and the articles here explain them in more detail with sources. English pages are translated from Japanese with AI.',
};

// Google アナリティクス 4 の測定ID。CI では Variables の GA_ID から渡す。未設定（ローカルなど）なら計測しない
const gaId = import.meta.env.PUBLIC_GA_ID ?? '';
export const GA_ID = /^G-[A-Z0-9]+$/.test(gaId) ? gaId : '';

export const subscribeUrl = `${SITE.channelUrl}?sub_confirmation=1`;

/** お問い合わせフォームを「内容の誤り」と対象の記事を入れた状態で開くURL */
export function reportUrl(target: string): string {
  const params = new URLSearchParams({
    usp: 'pp_url',
    'entry.875255136': '動画・記事の内容の誤りを知らせたい',
    'entry.1199837282': target,
  });
  return `${SITE.contactUrl}?${params}`;
}
