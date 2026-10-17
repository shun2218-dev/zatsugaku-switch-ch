// シーン画像（public/img/<動画ID>/scene-N.webp、幅720）から、一覧のカードや記事のシーン一覧で使う幅360の小さい版を作る
// （scene-N-360.webp）。作ってあるものは飛ばす。pnpm export・pnpm dev・pnpm build の前に実行される
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMG = path.resolve(import.meta.dirname, '../public/img');
let made = 0;
for (const id of existsSync(IMG) ? readdirSync(IMG) : []) {
  const dir = path.join(IMG, id);
  for (const f of readdirSync(dir).filter((f) => /^scene-\d+\.webp$/.test(f))) {
    const dest = path.join(dir, f.replace('.webp', '-360.webp'));
    if (existsSync(dest)) continue;
    await sharp(path.join(dir, f)).resize({ width: 360 }).webp({ quality: 72 }).toFile(dest);
    made++;
  }
}
if (made) console.log(`[thumbs] 小さい画像を ${made} 枚作りました`);
