// ページ全体の小さな動き（Base.astro から読み込む）。「視差効果を減らす」設定の人には何もしない
// - カード: 画面の外にあるものだけを隠しておき、スクロールで入ってきたら少し下からふわっと出す（同じ行は少しずつずらす）
// - 見出し（.section-title）: 左のスイッチ印を OFF にしておき、画面に入ったら ON にする
// 最初から画面に入っているカードは隠さない（読み込みの途中で一瞬消えて見えるのを避けるため）
export function startMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const inView = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.top < innerHeight && r.bottom > 0;
  };

  const cards = [...document.querySelectorAll<HTMLElement>('.grid > .card')].filter((c) => !inView(c));
  const cardObserver = new IntersectionObserver(
    (entries) => {
      // 同じタイミングで入ってきたカードを、左から順に 70ms ずつずらす
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e, i) => {
          const c = e.target as HTMLElement;
          c.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 70}ms`);
          c.classList.add('is-shown');
          c.classList.remove('is-hidden');
          cardObserver.unobserve(c);
          c.addEventListener('transitionend', () => c.classList.remove('is-shown'), { once: true });
        });
    },
    { rootMargin: '0px 0px -40px 0px' },
  );
  for (const c of cards) {
    c.classList.add('is-hidden');
    cardObserver.observe(c);
  }

  const titles = [...document.querySelectorAll<HTMLElement>('.section-title')];
  const titleObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        // 少し間をおいてから入れると「カチッ」と入ったのが見える
        setTimeout(() => e.target.classList.remove('is-off'), 250);
        titleObserver.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  );
  for (const t of titles) t.classList.add('is-off');
  // OFF にしたのを描いてから、ON にする動きを有効にする
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      for (const t of titles) {
        t.classList.add('is-armed');
        titleObserver.observe(t);
      }
    }),
  );
}
