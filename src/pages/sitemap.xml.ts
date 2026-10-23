import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getJudgments, judgmentPath } from '../judgments';

// 站点地图：告诉搜索引擎和 AI 爬虫有哪些页面、什么时候更新过
const day = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async ({ site }) => {
  const judgments = await getJudgments();
  const maps = await getCollection('maps', ({ data }) => !data.draft);
  const latest = judgments[0] ? day(judgments[0].data.date) : undefined;

  const pages: { path: string; lastmod?: string }[] = [
    { path: '/', lastmod: latest },
    { path: '/judgments/', lastmod: latest },
    ...judgments.map((j) => ({ path: judgmentPath(j.id), lastmod: day(j.data.date) })),
    { path: '/projects/' },
    { path: '/learning/' },
    ...maps.map((m) => ({ path: `/learning/${m.id}/`, lastmod: day(m.data.updated) })),
  ];

  const urls = pages
    .map(({ path, lastmod }) => {
      const loc = new URL(path, site).href;
      return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
