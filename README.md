# 雑学スイッチ 公式サイト

YouTube「雑学スイッチ」の公式サイト。Astro で静的生成し、GitHub Pages で公開する。

## しくみ

```
YTAutomator (Postgres + storage/projects)
   │  pnpm export   ← 公開済み(PUBLIC)の動画だけを書き出す
   ▼
src/data/videos.json + public/img/<動画ID>/scene-N.webp
src/notes/<動画ID>.md   ← 記事の加筆（ひとことで言うと・もう少し詳しく・出典）
   │  pnpm build
   ▼
dist/ → GitHub Pages
```

## コマンド

```bash
pnpm install
pnpm export     # YTAutomator の DB・画像から書き出す（YTAutomator の DB が起動している必要あり）
pnpm dev        # http://localhost:4321
pnpm build
```

`pnpm export` は `../YTAutomator/.env` の `DATABASE_URL` を読む。場所が違う場合は `YTAUTOMATOR_DIR` か `DATABASE_URL` を指定する。

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

1. GitHub にリポジトリを作って push
2. Settings → Pages → Source を「GitHub Actions」にする
3. Settings → Variables に `SITE_URL`（例: `https://zatsugaku-switch.jp`）を登録
4. 独自ドメインは `public/CNAME` にドメイン名を書き、DNS を GitHub Pages に向ける
