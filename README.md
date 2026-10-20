# 阿旻AI 个人网站

「阿旻AI」个人网站：介绍阿旻AI 在做什么，公开「我的判断」和「项目进展」。

- 线上地址：https://amin-ai-site.aminai.workers.dev
- 技术：Astro 静态站，部署在 Cloudflare Workers（静态资源），推送到 `main` 即自动上线
- 协同规则：[AGENTS.md](./AGENTS.md)
- 进度与待决定：[STATUS.md](./STATUS.md)

## 本地运行

需要 Node.js 22.22 或以上（见 `.node-version`）。

```bash
npm install
npm run dev      # 本地预览，默认 http://localhost:4321
npm run build    # 构建，输出到 dist/
```

## 想改什么，去哪改

| 内容 | 位置 |
|---|---|
| 简介文案 | `src/components/Intro.astro`（文件顶部） |
| 「我的判断」 | `src/content/judgments/`，每条一个 `YYYY-MM-DD-简短英文名.md` |
| 「项目进展」 | `src/data/projects.yaml`，唯一数据源，必须遵守 AGENTS.md 的脱敏规则 |
| 颜色与全局样式 | `src/styles/global.css` |
| 页面结构 | `src/pages/index.astro`、`src/layouts/Base.astro` |

## 部署

- Cloudflare 连接本仓库，构建命令 `npm run build`，发布目录 `dist/`（配置见 `wrangler.jsonc`）。
- 推送到 `main` 后自动构建并上线，所以推送前先确认本地 `npm run build` 通过。
- 线上构建失败时，先检查 Cloudflare 构建环境的 Node 版本是否为 22.22 或以上；首次部署时修正过 `NODE_VERSION` 变量才构建通过，出问题先查它。

## 外部资源

图片、图标、字体等静态文件放进 `public/` 或 `src/`，随仓库一起发布。引入第三方网络资源（例如网络字体）会影响加载速度，是否引入由阿旻决定，见 STATUS.md「待决定」。

## 接手一个新会话

1. 先读 AGENTS.md，再读 STATUS.md 的「进行中」「卡住」「待决定」。
2. 改动完成后：`npm run build` 通过 → 更新 STATUS.md → 提交并推送。
3. 需要阿旻拍板的（文案、公开范围、域名、付费服务）写进「待决定」，不要自行决定。
