# 阿旻AI 个人网站

Astro 静态站，部署在 Cloudflare（推送 main 自动上线）。

线上地址：https://amin-ai-site.aminai.workers.dev

- 文章栏目：[/articles/](https://amin-ai-site.aminai.workers.dev/articles/)；新增文章只需添加 `src/content/articles/*.md`，由 PR 审核后随 `main` 自动上线。
- 本地开发：`npm install && npm run dev`
- 构建：`npm run build`（输出 `dist/`）
- 协同规则见 [AGENTS.md](./AGENTS.md)，进度见 [STATUS.md](./STATUS.md)
