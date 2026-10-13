# 雑学スイッチ 公式サイト

YouTube「雑学スイッチ」の公式サイト。Astro で静的生成し、GitHub Pages で公開する。

## しくみ

```
YTAutomator (Postgres + storage/projects)
   │  pnpm export   ← 公開済み(PUBLIC)の動画だけを書き出す
   ▼
src/data/videos.json + public/img/<動画ID>/scene-N.webp
src/notes/<動画ID>.md   ← 記事の加筆（ひとことで言うと・もう少し詳しく・出典）
   │  pnpm build   ← YouTube Data API からチャンネルの数字と新着動画も取る（YOUTUBE_API_KEY があるとき）
   ▼
dist/ → GitHub Pages
```

## コマンド

```bash
pnpm install
pnpm export     # YTAutomator の DB・画像から書き出す（YTAutomator の DB が起動している必要あり）
pnpm sync       # 新しい動画を載せる: 書き出し → ビルド確認 → PR → main へマージ（下記）
pnpm dev        # http://localhost:4321
pnpm build
```

`pnpm export` は `../YTAutomator/.env` の `DATABASE_URL` を読む。場所が違う場合は `YTAUTOMATOR_DIR` か `DATABASE_URL` を指定する。

## 新しい動画の反映

記事（台本・シーン画像）は手元の YTAutomator にしかないので、CI だけでは作れない。2段構えにしている。

1. **つなぎ（自動）**: GitHub Actions が3時間ごとにサイトを作り直す。そのとき YouTube にあってまだ書き出していない公開動画を、トップの「新着の雑学」の先頭に YouTube へのリンクとして出す（YouTube のサムネイルとタイトル）
2. **記事にする（手動）**: 動画を公開したあと（数本まとめてでもよい）、手元で `pnpm sync` を実行する。書き出し → `pnpm build` で確認 → `content/sync-…` ブランチ → PR → main へマージまで行い、マージで公開される。つなぎのカードは記事のカードに置き換わる

- 動画の概要欄には記事のURL（`/trivia/<動画ID>/`）が入る（YTAutomator が `SITE_ARTICLE_BASE_URL` でアップロード直後に足す）。記事がまだない公開動画は、定期ビルドで「読みものは準備中」の仮ページを作る（noindex・サイトマップに載せない）。定期ビルドまでの数時間は404になるが、404ページが YouTube の動画へ案内する
- `pnpm sync --no-merge` … PR を作るところまで（GitHub で中身を見てからマージ）
- `pnpm sync --dry-run` … 書き出しとビルドの確認だけ。git は触らない（書き出した内容は作業ツリーに残る）
- YTAutomator が公開状態を DB に取り込むのは日次バッチ（Studio で公開した直後は PRIVATE のまま）なので、公開当日の動画は `sync` しても入らないことがある。その間はつなぎ表示で出る

## チャンネルの数字

トップのヒーローと「このサイトについて」に、登録者数・総再生回数・公開中の動画数・高評価（各動画の合計）を取得日時つきで出す。値はビルドのときに YouTube Data API v3 で取る（公開情報だけなので OAuth は不要、1回あたり 10 ユニットほど）。人気順の並びにも、このときの再生数を使う。

- 登録者数は API の仕様で上3桁に丸められる
- `YOUTUBE_API_KEY` がない・取得に失敗したときは、数字・つなぎ表示・規約の YouTube API Services の項を出さずにビルドする（ビルドは止めない）
- 定期実行は、公開リポジトリに60日間コミットがないと GitHub が止める。`pnpm sync` のマージで動き続ける

### API キーの用意

1. Google Cloud Console で（YTAutomator と同じプロジェクトでよい）「YouTube Data API v3」を有効にする
2. 「認証情報」→「API キーを作成」。キーの制限で「API の制限」を YouTube Data API v3 だけにする（ビルド時にサーバーから使うだけなので、アプリケーションの制限は「なし」）
3. GitHub の Settings → Secrets and variables → Actions → **Secrets** に `YOUTUBE_API_KEY` として登録する
4. ローカルで確かめるときは、リポジトリ直下の `.env`（git 管理外）に `YOUTUBE_API_KEY=...` を書く

## 記事の加筆（notes）

`src/notes/<YouTube動画ID>.md` を置くと、その動画の記事に差し込まれる。見本: `src/notes/ucWGOsTcOcE.md`

```yaml
---
answer: 「ひとことで言うと」に出す要約（なければ動画のフックを表示）
reviewedAt: "2026-10-09"   # 出典を確認した日。必ずクォートする
sources:
  - title: 資料名
    publisher: 発行元
    url: https://...
---
本文（Markdown）＝「もう少し詳しく」
```

## カテゴリ

`scripts/categories.mjs` のキーワードで振り分ける（タイトル優先、なければタグ）。変えたら `pnpm export` をやり直す。

## 公開

本番: https://zatsugaku-switch.com （GitHub Pages・GitHub Actions でデプロイ）

- main に push すると `.github/workflows/deploy.yml` がビルドし、Variables の `SITE_URL` が登録されていれば Pages に公開する（未登録ならビルドの確認だけ）
- 3時間ごとの定期実行でも作り直して公開する（チャンネルの数字と新着のつなぎ表示を新しくするため）。Secrets の `YOUTUBE_API_KEY` を使う
- Variables の `GA_ID`（Google アナリティクス 4 の測定ID、`G-` で始まる）を登録すると、ビルドに計測タグが入り、プライバシーポリシーに「アクセス解析」の項が出る（未登録なら計測しない）
- 独自ドメインはリポジトリの Settings → Pages → Custom domain で設定する。GitHub Actions で公開する場合、`CNAME` ファイルは使われない（置かなくてよい）

### DNS（Cloudflare）

| 種類 | 名前 | 値 | プロキシ |
|---|---|---|---|
| A | `@` | 185.199.108.153 / .109.153 / .110.153 / .111.153（4件） | DNS only |
| AAAA | `@` | 2606:50c0:8000::153 / 8001 / 8002 / 8003（4件） | DNS only |
| CNAME | `www` | shun2218-dev.github.io | DNS only |
| TXT | `_github-pages-challenge-shun2218-dev` | GitHub のドメイン確認で表示される値 | — |

プロキシ（オレンジの雲）をオンにすると、GitHub が HTTPS 証明書を発行できないことがあるので DNS only にする。
