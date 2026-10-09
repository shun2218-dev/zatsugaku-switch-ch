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

本番: https://zatsugaku-switch.com （GitHub Pages・GitHub Actions でデプロイ）

- main に push すると `.github/workflows/deploy.yml` がビルドし、Variables の `SITE_URL` が登録されていれば Pages に公開する（未登録ならビルドの確認だけ）
- 独自ドメインはリポジトリの Settings → Pages → Custom domain で設定する。GitHub Actions で公開する場合、`CNAME` ファイルは使われない（置かなくてよい）

### DNS（Cloudflare）

| 種類 | 名前 | 値 | プロキシ |
|---|---|---|---|
| A | `@` | 185.199.108.153 / .109.153 / .110.153 / .111.153（4件） | DNS only |
| AAAA | `@` | 2606:50c0:8000::153 / 8001 / 8002 / 8003（4件） | DNS only |
| CNAME | `www` | shun2218-dev.github.io | DNS only |
| TXT | `_github-pages-challenge-shun2218-dev` | GitHub のドメイン確認で表示される値 | — |

プロキシ（オレンジの雲）をオンにすると、GitHub が HTTPS 証明書を発行できないことがあるので DNS only にする。
