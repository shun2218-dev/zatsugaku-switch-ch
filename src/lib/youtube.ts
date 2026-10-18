// ビルド時に YouTube Data API v3 からチャンネルの公開情報（登録者数・再生数など）を取る。
// APIキーは YOUTUBE_API_KEY（CI では Secrets、ローカルでは .env）。未設定や取得失敗のときは null を返し、
// チャンネルの数字と新着のつなぎ表示を出さないだけでビルドは止めない
import { getImage } from 'astro:assets';
import { SITE } from './site';

const KEY = import.meta.env.YOUTUBE_API_KEY ?? '';
const API = 'https://www.googleapis.com/youtube/v3';

export type ChannelStats = {
  /** 登録者数。API の仕様で上3桁に丸められる。チャンネル側で非公開にしていれば null */
  subscribers: number | null;
  views: number;
  videos: number;
  /** チャンネル全体の高評価数は API にないので、公開動画の高評価の合計 */
  likes: number;
};
export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  views: number;
  short: boolean;
  url: string;
  thumbnail: string;
};
export type YouTubeData = { channel: ChannelStats; videos: YouTubeVideo[]; fetchedAt: string };

async function get(endpoint: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`${API}/${endpoint}`);
  for (const [k, v] of Object.entries({ ...params, key: KEY })) url.searchParams.set(k, v);
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`${endpoint}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

// ISO 8601 の長さ（PT1M5S など）を秒に
const seconds = (d: string) => {
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  return m ? Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0) : 0;
};

async function load(): Promise<YouTubeData | null> {
  if (!KEY) return null;
  try {
    const ch = (await get('channels', { part: 'statistics,contentDetails', id: SITE.channelId })).items?.[0];
    if (!ch) throw new Error(`チャンネル ${SITE.channelId} が見つかりません`);

    // アップロード一覧（公開中のもの）の動画IDをすべて集める。50件ずつ
    const ids: string[] = [];
    let pageToken = '';
    do {
      const page = await get('playlistItems', {
        part: 'contentDetails',
        playlistId: ch.contentDetails.relatedPlaylists.uploads,
        maxResults: '50',
        ...(pageToken && { pageToken }),
      });
      ids.push(...page.items.map((i: any) => i.contentDetails.videoId));
      pageToken = page.nextPageToken ?? '';
    } while (pageToken);

    const items: any[] = [];
    for (let i = 0; i < ids.length; i += 50) {
      const res = await get('videos', { part: 'snippet,statistics,contentDetails,status', id: ids.slice(i, i + 50).join(',') });
      items.push(...res.items.filter((v: any) => v.status.privacyStatus === 'public'));
    }

    const videos = items.map((v) => {
      const short = seconds(v.contentDetails.duration) <= 180;
      const t = v.snippet.thumbnails;
      return {
        id: v.id as string,
        title: (v.snippet.title as string).replace(/\s*#\S+/g, '').trim(), // 末尾の #shorts #雑学 を落とす
        publishedAt: v.snippet.publishedAt as string,
        views: Number(v.statistics.viewCount ?? 0),
        likes: Number(v.statistics.likeCount ?? 0),
        short,
        url: short ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`,
        thumbnail: (t.maxres ?? t.high ?? t.default).url as string,
      };
    });

    const s = ch.statistics;
    return {
      channel: {
        subscribers: s.hiddenSubscriberCount ? null : Number(s.subscriberCount),
        views: Number(s.viewCount),
        videos: Number(s.videoCount),
        likes: videos.reduce((a, v) => a + v.likes, 0),
      },
      videos: videos.map(({ likes, ...v }) => v),
      fetchedAt: new Date().toISOString(),
    };
  } catch (e) {
    console.warn(`[youtube] チャンネル情報を取れなかったので、数字と新着のつなぎ表示を出さずにビルドします: ${e}`);
    return null;
  }
}

export const youtube = await load();

// ショートの縦長サムネイル（oar2）は公式の一覧にないので、あるときだけ使う。なければ横長の通常サムネイル
export async function cardThumbnail(v: YouTubeVideo) {
  if (!v.short) return v.thumbnail;
  const url = `https://i.ytimg.com/vi/${v.id}/oar2.jpg`;
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10_000) });
    return res.ok ? url : v.thumbnail;
  } catch {
    return v.thumbnail;
  }
}

/** 一覧のカードに出す画像。シーン画像と同じく幅360と720の webp にして自前で配る */
export type CardImage = { src: string; srcset?: string; width?: number; height?: number };

// YouTube のサムネイルは 1080x1920・100KB 前後あり、カード（幅360まで）には大きすぎる。
// ビルド時に webp へ変換して 1枚 10KB ほどにし、i.ytimg.com への読み込みもなくす。
// 取れなかったときは YouTube の画像をそのまま出す（ビルドは止めない）
export async function cardImage(url: string): Promise<CardImage> {
  try {
    // inferSize は元の幅と高さを両方入れてくるので、幅だけ指定すると縦に伸びてしまう。
    // 先に元の大きさを調べて、縦横比を保った高さを自分で渡す
    const source = await getImage({ src: url, inferSize: true });
    const ratio = Number(source.options.height) / Number(source.options.width);
    const sized = (width: number) =>
      getImage({ src: url, inferSize: true, width, height: Math.round(width * ratio), format: 'webp', quality: 72 });
    const [small, large] = await Promise.all([sized(360), sized(720)]);
    return { src: large.src, srcset: `${small.src} 360w, ${large.src} 720w`, width: 720, height: Math.round(720 * ratio) };
  } catch (e) {
    console.warn(`[youtube] サムネイルを変換できなかったので YouTube の画像をそのまま使います（${url}）: ${e}`);
    return { src: url };
  }
}
