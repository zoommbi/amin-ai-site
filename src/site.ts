// 网站身份信息：meta、结构化数据与 llms.txt 共用。
export const SITE = {
  name: '阿旻AI',
  description: '阿旻AI：用 AI 解决真实问题，分享实践、工具、工作流与独立思考。',
  tagline: '用 AI，把想法变成现实。记录解决真实问题的实践、思考与方法。',
  focuses: ['AI 实践', '工具与工作流', '真实需求', '商业验证', '独立思考'],
  locale: 'zh-CN',
  profiles: ['https://x.com/mileshuang1997'],
};

export const personId = (site: URL) => new URL('/#person', site).href;

export const personJsonLd = (site: URL) => ({
  '@type': 'Person',
  '@id': personId(site),
  name: SITE.name,
  url: new URL('/', site).href,
  description: SITE.tagline,
  knowsAbout: SITE.focuses,
  sameAs: SITE.profiles,
});
