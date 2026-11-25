# 阿旻AI 个人网站

Astro 静态站，部署在 Cloudflare（推送 main 自动上线）。

线上地址：https://amin-ai-site.aminai.workers.dev

- 本地开发：`npm install && npm run dev`
- 构建：`npm run build`（输出 `dist/`）
- 协同规则见 [AGENTS.md](./AGENTS.md)，进度见 [STATUS.md](./STATUS.md)

## 公开内容策略

网站首页强调真实问题、AI 实践与独立思考。当前公开「判断」「知识地图」「阅读清单」「关于我」。
原「项目进度」页面已暂停；只在真实成果完成、可验证并经过公开范围确认后，才新增「作品」案例。
历史 `src/data/projects.yaml` 和 `src/components/ProjectList.astro` 仅供追溯，不是公开数据源。
