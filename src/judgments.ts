import { getCollection } from 'astro:content';

// 公开的判断（去掉 draft），新的在前。判断墙、单条页面、sitemap、llms.txt 共用
export async function getJudgments({ featured = false } = {}) {
  const entries = await getCollection(
    'judgments',
    ({ data }) => !data.draft && (!featured || data.featured),
  );
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// 每条判断的独立网址
export const judgmentPath = (id: string) => `/judgments/${id}/`;

// 只显示年月：很多判断只记录到形成的月份
export const fmtMonth = (d: Date) => d.toISOString().slice(0, 7).replace('-', '.');
