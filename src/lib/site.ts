export const SITE = {
  name: '雑学スイッチ',
  tagline: '30秒で、好奇心にスイッチ。',
  description:
    '「なぜ？」に30秒で答える雑学チャンネル「雑学スイッチ」の公式サイト。空・天気、食べもの、からだ、身近なモノのしくみまで、動画で紹介した雑学を読みもので詳しく解説します。',
  channelUrl: 'https://www.youtube.com/@%E9%9B%91%E5%AD%A6%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81ch',
  channelId: 'UC6v_FuKG6UdkwpOLeCJRGbQ',
  contactUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd17kfMR-RGTlm9WlabCfRjMqN5H1HnwIdzWe2JFuS6hfp3hQ/viewform',
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
