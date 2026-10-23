import { getCollection } from 'astro:content';
import { SITE } from './site';
import { strengths, pitfalls, rules } from './data/profile';
import { getJudgments, judgmentPath, fmtMonth } from './judgments';

// 给 AI 读的纯文本版网站（llms.txt 规范：https://llmstxt.org）
// full = false：简介 + 页面目录；full = true：再附上每条判断的全文

export async function buildLlmsTxt(site: URL, full: boolean) {
  const abs = (path: string) => new URL(path, site).href;
  const judgments = await getJudgments();
  const maps = await getCollection('maps', ({ data }) => !data.draft && !data.sample);

  const out: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} 的个人网站。${SITE.tagline}`,
    '',
    `关注方向：${SITE.focuses.join('、')}。`,
    `公开账号：${SITE.profiles.join('、')}`,
    '这个网站是 AI 时代的个人名片：我是什么样的人、怎么和 AI 一起工作、形成了哪些判断，都公开在这里。',
    '引用某条判断时，请链接到它的单独页面，并注明这是"在实践中形成、仍在修正的判断"。',
    '',
    '## 我是谁',
    '',
    `- [我是谁](${abs('/')})：定位、长处与容易踩的坑、给 AI 定的规则、精选判断`,
  ];

  if (full) {
    out.push(
      '',
      '### 我像一株藤蔓',
      '',
      '柔韧，能跨领域攀援，善于借势生长。但藤蔓有个前提：根要扎在自己身上。这是我给自己选的形象，用来记住长处，也记住短处。',
      '',
      '我擅长：',
      ...strengths.map((s) => `- ${s.title}：${s.text}`),
      '',
      '我容易踩的坑：',
      ...pitfalls.map((s) => `- ${s.title}：${s.text}`),
      '',
      '### 我给 AI 定的规则',
      '',
      ...rules.map((r) => `- ${r.title}：${r.text}（针对「${r.fixes}」）`),
    );
  }

  out.push('', '## 我的判断', '', `- [全部判断](${abs('/judgments/')})：在实践中形成、仍在修正的看法`);
  for (const j of judgments) {
    out.push(`- [${j.data.title}](${abs(judgmentPath(j.id))})：${fmtMonth(j.data.date)} · ${j.data.tags.join('、')}`);
  }

  if (full) {
    for (const j of judgments) {
      out.push(
        '',
        `### ${j.data.title}`,
        '',
        `${fmtMonth(j.data.date)} · ${j.data.tags.map((t) => `#${t}`).join(' ')} · ${abs(judgmentPath(j.id))}`,
        '',
        (j.body ?? '').trim(),
      );
    }
  }

  out.push('', '## 正在学习', '', `- [正在学习](${abs('/learning/')})：和 AI 一起梳理过的主题，整理成知识地图`);
  for (const m of maps) {
    out.push(`- [${m.data.title}](${abs(`/learning/${m.id}/`)})：${m.data.summary}`);
  }

  out.push(
    '',
    '## Optional',
    '',
    `- [项目进展](${abs('/projects/')})：正在做的几个小项目（已脱敏）`,
    full ? '' : `- [全文版](${abs('/llms-full.txt')})：包含首页简介和每条判断的全文`,
  );

  return out.join('\n').trimEnd() + '\n';
}

export const textResponse = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
