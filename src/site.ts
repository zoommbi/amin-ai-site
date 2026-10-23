// 网站身份信息：页面 meta、结构化数据（JSON-LD）、llms.txt 共用这一份。
// 换域名时改 astro.config.mjs 的 site，这里的网址会跟着变。

export const SITE = {
  name: '阿旻AI',
  description: '阿旻AI 的个人网站：AI 工作流、教育与小项目实践。',
  // 一句话定位，和首页开头保持一致
  tagline: '一个用 AI 重新组织工作的人。我关心的问题是：一个人，怎样获得过去只有组织才有的能力？',
  focuses: ['信息编排', 'AI 工作流', '产品研发', '教育', '小项目实践'],
  locale: 'zh-CN',
};

// 首页「我是谁」的 Person 结构化数据，其他页面用 @id 引用它
export const personId = (site: URL) => new URL('/#person', site).href;

export const personJsonLd = (site: URL) => ({
  '@type': 'Person',
  '@id': personId(site),
  name: SITE.name,
  url: new URL('/', site).href,
  description: SITE.tagline,
  knowsAbout: SITE.focuses,
});
