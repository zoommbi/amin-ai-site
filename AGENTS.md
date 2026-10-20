# AGENTS.md

本文件是所有 Agent（开发 Agent、Hermes Agent 等）在本仓库工作的共同规则。

## 项目目标

「阿旻AI」个人网站。介绍阿旻AI 是谁、在做什么（AI 工作流、教育、小项目实践），
公开「我的判断」和「项目进展」。同时也是多 Agent 协同流程的演练：

- **开发 Agent**：负责所有代码与内容改动，提交并推送到本仓库。
- **Hermes Agent**：每天读取本仓库（重点是 `STATUS.md`），把进度推送到阿旻手机。
- **阿旻**：只在手机上协作，不碰代码；需要拍板的事看 `STATUS.md` 的「待决定」。

## 技术

- Astro 静态站（Node ≥ 22.22，见 `.node-version`），内容用 Markdown / YAML 存放
- 部署：Cloudflare（Workers 静态资源，连接 GitHub 自动构建）。构建命令 `npm run build`，部署命令 `npx wrangler deploy`；
  `wrangler.jsonc` 指定只发布 `dist/`。推送到 main 即自动上线
- 手机优先，桌面也要好看；风格简洁、温暖，有个人感

## 目录结构

```
.
├── AGENTS.md                  # 本文件：协同规则
├── CLAUDE.md                  # 指向本文件
├── STATUS.md                  # 进度看板（每次干完活必须更新）
├── wrangler.jsonc             # Cloudflare 部署配置（发布 dist/）
├── .github/ISSUE_TEMPLATE/    # 任务模板
├── public/                    # 静态资源（favicon 等）
└── src/
    ├── pages/index.astro      # 首页（单页滚动）
    ├── layouts/Base.astro     # 页面骨架
    ├── styles/global.css      # 全局样式
    ├── styles/themes.css      # 配色方案（颜色变量只在这里定义）
    ├── config.ts              # 当前配色 SITE_THEME
    ├── components/
    │   ├── SiteHeader.astro   # 顶部导航
    │   ├── Intro.astro        # 简介（文案在文件顶部）
    │   ├── JudgmentWall.astro # 「我的判断」便签墙
    │   ├── ProjectList.astro  # 「项目进展」卡片
    │   └── SiteFooter.astro
    ├── content.config.ts      # 内容集合定义
    ├── content/judgments/     # 每条判断一个 .md 文件
    └── data/projects.yaml     # 项目进展的唯一数据源
```

### 新增一条判断

在 `src/content/judgments/` 新建 `YYYY-MM-DD-简短英文名.md`：

```md
---
title: 一句话判断
date: 2026-10-18
tags: [标签1, 标签2]
# sample: true   # 示例内容才加
# draft: true    # 暂不公开才加
---

详细说明（轻点卡片后展开显示）。
```

### 更新项目进展

只改 `src/data/projects.yaml`。项目进展**只能**来自这个文件，
**绝不**从其他私有仓库或任何外部来源自动抓取。

## 脱敏规则（必须遵守）

### 项目进展

- **不出现**：真实项目名 / 品牌名、村名地名、客户与合作方、价格金额、内部链接、仓库名、人名。
- **也不出现**：具体学科、课程主题、适用年级、技术细节等能反推出具体项目的信息。
- **名称**只用泛化名称 + 字母编号，如「电商小程序」「课外兴趣班 A」「课外兴趣班 B」；
  同类项目再多就依次用 C、D……
- **一句话说明**也要泛化，例如「面向本地的线上小程序」「周末课外兴趣班」，不写具体做什么。
- 阶段名也用泛化词（构思中 / 筹备中 / 内测中 / 运营中 等）。
- `ProjectList.astro` 在构建时会拦截链接、金额、仓库地址，但这只是兜底，
  **规则以本节为准**，提交前自己逐条检查。

### 我的判断

- 判断板块可以公开，但**不要写入任何人的私人信息**（姓名、联系方式、住址、学校、单位、
  聊天记录、可识别的个人经历等）。

## 工作流程

1. **任务来源**：GitHub Issue（用 `.github/ISSUE_TEMPLATE/task.md` 模板，必须写验收标准）。
2. **每完成一项就 commit 并 push**，提交信息写清做了什么，并关联 Issue（如 `Closes #3`）。
3. 完成后在对应 Issue 评论里写明改了什么、如何验收，然后关闭 Issue。
4. **改动后必须同步 `STATUS.md`**：在「本周进展」追加一条 `日期｜做了什么｜下一步`，
   并更新「进行中」「卡住」。
5. **需要阿旻拍板的事**写进 `STATUS.md` 的「待决定」，不要自行替阿旻决定文案、
   公开范围、域名、付费服务等。
6. 推送前本地跑一次 `npm run build`，确保构建成功。
