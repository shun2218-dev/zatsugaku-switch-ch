// サイト内検索用の目次。検索ページがブラウザで読み込んで絞り込む
import type { APIRoute } from 'astro';
import { videos, categoryOf, noteOf, plainText, thumb } from '../lib/data';

const stripMarkdown = (md: string) =>
  md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*>`_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = () => {
  const index = videos.map((v) => {
    const note = noteOf(v.id);
    const cat = categoryOf(v.category);
    return {
      id: v.id,
      t: v.title,
      c: cat.name,
      k: cat.slug,
      g: v.tags,
      h: note?.frontmatter.answer ?? v.hook,
      b: [plainText(v), note ? stripMarkdown(note.rawContent()) : ''].join(' '),
      i: thumb(v),
      l: v.format === 'longform' ? 1 : 0,
      v: v.views,
    };
  });
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
