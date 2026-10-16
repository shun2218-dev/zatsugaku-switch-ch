// 新しく公開した動画をサイトに載せる。YTAutomator から書き出し → ビルド確認 → ブランチ → PR → main へマージまでを1回で行う。
// 使い方: pnpm sync              書き出しからマージまで
//         pnpm sync --no-merge   PR を作るところまで（GitHub で中身を見てからマージする）
//         pnpm sync --dry-run    書き出しとビルドの確認だけ（git は触らない）
// 英語の下書き（src/translations/en）も作って同じ PR に入れる。新しい動画と、日本語が変わった下書きが対象（人が reviewedAt を入れるまで公開されない）
// マージすると main への push で GitHub Actions が公開する。YTAutomator の DB が起動している必要がある
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const merge = !args.has('--no-merge');

const run = (cmd, ...a) => execFileSync(cmd, a, { cwd: ROOT, stdio: 'inherit' });
const out = (cmd, ...a) => execFileSync(cmd, a, { cwd: ROOT, encoding: 'utf8' }).trim();
const fail = (msg) => {
  console.error(`[sync] ${msg}`);
  process.exit(1);
};

// 書き出し・翻訳で変わるファイル
const DATA = ['src/data/videos.json', 'public/img', 'src/translations'];
const exported = () => JSON.parse(readFileSync(path.join(ROOT, 'src/data/videos.json'), 'utf8'));

if (!dryRun) {
  if (out('git', 'status', '--porcelain')) fail('作業中の変更があります。コミットするか退避してからやり直してください');
  run('git', 'switch', 'main');
  run('git', 'pull', '--ff-only');
}

const before = new Set(exported().map((v) => v.id));
try {
  run('pnpm', 'export');
} catch {
  fail('書き出しに失敗しました。YTAutomator の DB（docker）が起動しているか確かめてください');
}
const added = exported().filter((v) => !before.has(v.id));
// 英語の下書き（--dry-run では作らない）。失敗しても記事の公開は止めない（あとで pnpm translate --auto で作れる）
if (!dryRun) {
  try {
    run('pnpm', 'translate', '--auto');
  } catch {
    console.warn('[sync] 英語の下書きを作れませんでした。あとで pnpm translate --auto を実行してください');
  }
}
run('pnpm', 'build'); // 壊れていないかを確かめる

if (!out('git', 'status', '--porcelain', '--', ...DATA)) {
  console.log('[sync] 変更はありません');
  process.exit(0);
}
console.log(`[sync] 新しい動画: ${added.length} 本`);
for (const v of added) console.log(`  - ${v.title}`);
if (dryRun) {
  console.log('[sync] --dry-run なので git は触りません（書き出した内容は作業ツリーに残っています）');
  process.exit(0);
}

const stamp = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Tokyo' }).slice(0, 16).replace(/\D/g, ''); // 202610122100
const branch = `content/sync-${stamp}`;
const title = added.length ? `content: 新しい動画 ${added.length} 本の記事を追加` : 'content: 書き出しを更新（再生数など）';
const body = [
  added.length ? '## 追加した動画' : '新しい動画はありません。',
  ...added.map((v) => `- ${v.title}（https://www.youtube.com/watch?v=${v.id}）`),
  '',
  '`pnpm sync` で作成',
].join('\n');

run('git', 'switch', '-c', branch);
run('git', 'add', '--', ...DATA);
run('git', 'commit', '-m', title, '-m', body);
run('git', 'push', '-u', 'origin', branch);
run('gh', 'pr', 'create', '--base', 'main', '--head', branch, '--title', title, '--body', body);
if (merge) {
  run('gh', 'pr', 'merge', branch, '--merge', '--delete-branch');
  run('git', 'switch', 'main');
  run('git', 'pull', '--ff-only');
  console.log('[sync] main にマージしました。GitHub Actions が公開します');
} else {
  console.log(`[sync] PR を作りました。GitHub でマージすると公開されます（ブランチ ${branch}）`);
}
