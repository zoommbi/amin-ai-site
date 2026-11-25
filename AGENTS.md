# AGENTS.md

本文件是所有 Agent（开发 Agent、Hermes Agent 等）在本仓库工作的共同规则。

## 项目目标

「阿旻AI」个人网站。围绕真实问题、AI 实践与独立思考，公开已形成的判断、知识地图和阅读清单。
只有真实完成、可验证、得到阿旻确认公开的成果才能进入作品展示；不展示正在开发项目的进度百分比。
同时也是多 Agent 协同流程的演练：

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
    ├── pages/index.astro      # 编辑式首页：核心定位、精选判断、学习和阅读入口
    ├── layouts/Base.astro     # 页面骨架
    ├── styles/global.css      # 全局样式
    ├── styles/themes.css      # 配色方案（颜色变量只在这里定义）
    ├── config.ts              # 当前配色 SITE_THEME
    ├── site.ts                # 网站身份：名称、一句话定位、关注方向（meta / JSON-LD / llms.txt 共用）
    ├── data/profile.ts        # 首页「藤蔓」长处短处与「给 AI 的规则」文案
    ├── judgments.ts           # 读取判断、判断网址
    ├── llms.ts                # 生成 llms.txt / llms-full.txt（给 AI 读的纯文本版）
    ├── components/
    │   ├── SiteHeader.astro   # 顶部导航
    │   ├── Intro.astro        # 首页开头：一句话定位（文案在文件里）
    │   ├── Persona.astro      # 「我像一株藤蔓」：长处与容易踩的坑
    │   ├── AiRules.astro      # 「我给 AI 定的规则」
    │   ├── JudgmentWall.astro # 「我的判断」卡片，轻点弹出详情（featured 只显示精选）
    │   ├── HomeThoughts.astro # 首页编辑式判断目录
    │   ├── HomeExplore.astro  # 首页知识地图与阅读入口
    │   ├── ProjectList.astro  # 历史组件，冻结，不在公开页面使用
    │   ├── LearningList.astro # 「正在学习」地图卡片
    │   ├── KnowledgeMap.astro # 知识地图（板块 + 知识块 + 详情弹窗）
    │   └── SiteFooter.astro
    ├── content.config.ts      # 内容集合定义
    ├── content/judgments/     # 每条判断一个 .md 文件
    ├── content/maps/          # 每张知识地图一个 .yaml 文件
    ├── pages/judgments/       # 全部判断（/judgments/）+ 每条判断一页（/judgments/文件名/）
    ├── pages/*.txt.ts, sitemap.xml.ts # robots.txt、sitemap、llms.txt，构建时自动生成
    ├── pages/about/           # 关于我（/about/）：藤蔓和 AI 规则
    ├── pages/learning/        # 学习索引页 + 每张地图一页（/learning/文件名/）
    └── data/projects.yaml     # 旧项目进度历史存档；停止维护，不对外公开
```

### 新增一条判断

在 `src/content/judgments/` 新建 `YYYY-MM-DD-简短英文名.md`：

```md
---
title: 一句话判断
date: 2026-10-18
tags: [标签1, 标签2]
# featured: true # 同时放到首页「几条判断」（建议保持 3 条）
# sample: true   # 示例内容才加
# draft: true    # 暂不公开才加
---

详细说明（轻点卡片后展开显示）。
```

### 新增一张知识地图（正在学习）

在 `src/content/maps/` 新建 `英文短名.yaml`（文件名即网址 `/learning/英文短名/`），
字段定义见 `src/content.config.ts`，可照 `ai-philosophy.yaml` 抄：

```yaml
title: 地图标题
summary: 一句话说明
status: 学习中        # 或 已梳理
updated: 2026-10-21
tags: [标签]
regions:              # 板块
  - id: part-a
    title: 板块名
    summary: 一句话
    nodes:            # 知识块：卡片上显示 title + summary，轻点弹出其余字段
      - id: node-a    # 全图唯一，用于 related 和网址 #node-a
        title: 知识块名
        summary: 一句话
        detail: |
          详细说明，空行分段。
        points: [要点 1, 要点 2]
        related: [node-b]
        questions: [想深入时可以继续问 AI 的问题]
```

内容同样要遵守下方「我的判断」的脱敏规则，公开前先给阿旻确认。

### 更新阅读清单

在 `src/data/books.ts` 的 `books` 数组里增加图书，页面 `/reading/` 自动按 `category` 分类；
只建立有书的分类，不显示空分类。每本包含中外书名、全部作者、所列英文版本的出版时间、
内容简介、阅读理由及可核实的出版来源链接。不要把中文译本与英文版的出版日期混用。
书单独立于 `/learning/` 知识地图；提交前核对版权与书目信息。

### 已交付作品入选规则（2026-11-25 生效）

- **禁止**恢复公开的项目进度、百分比、预计完成时间；`/projects/` 已下线。
- 只有已完成并可实际使用或已交付的成果才具备作品候选资格；还需有可验证的页面截图、演示、成果材料或交付证据。
- 公开前由阿旻确定展示范围与脱敏口径；未经授权不得公开真实客户、合作方、业务金额、私有仓库或尚未公布的产品。
- 网站没有合规的已完成作品时，首页**不出现空白作品栏、虚构案例或占位图片**。
- 如需未来新增作品页，应单独开 Issue/PR，先确认每件作品的完成状态、公开许可和可展示证据，再上线。
- `src/data/projects.yaml` 和 `src/components/ProjectList.astro` 仅保留作历史存档，不再更新、渲染或作为站点数据源。

### GEO（让 AI 搜索读懂、引用网站）

robots.txt、sitemap、llms.txt、结构化数据都在构建时从内容自动生成，新增判断或地图不用另外改。
换域名只改 `astro.config.mjs` 的 `site`。判断文件名就是它的永久网址，上线后不要再改名。

## 脱敏规则（必须遵守）

### 作品与案例

- 真实、已交付、允许公开；不允许用演示图冒充已完成项目，不允许从内部记录自动抓取业务详情。
- 涉及个人身份、客户、未公布的合作或知识产权内容时先做脱敏并获得明确确认。
- 每件作品的简介必须说明解决的问题和可以核实的成果，不宣称未经验证的效果。

### 我的判断

- 判断板块可以公开，但**不要写入任何人的私人信息**（姓名、联系方式、住址、学校、单位、
  聊天记录、可识别的个人经历等）。
- 判断可以取材自阿旻的思考类私人仓库，但只取一般性的原则与判断，**去掉具体项目、业务案例、
  人物与角色分工、公司信息和未经核实的引文**。本仓库是公开的：**先把草稿给阿旻确认，再提交**。
- 判断的 `date` 是形成时间；页面只显示年月。

### 首页与关于页

- 首页采用编辑式版式：明确个人定位、精选判断、知识地图及阅读入口；不要堆砌等宽白色卡片，不展示未完成作品。
- 「藤蔓」「给 AI 的规则」迁移到 `/about/`，不再占据首页首屏。
- 「藤蔓／乙木」等五行说法只作自我提醒的比喻，页面上要说明不是命理判断。
  **不公开**八字、命盘原文、公司名称、合作方，也不用五行给他人定角色。

## 工作流程

1. **任务来源**：GitHub Issue（用 `.github/ISSUE_TEMPLATE/task.md` 模板，必须写验收标准）。
2. **每完成一项就 commit 并 push**，提交信息写清做了什么，并关联 Issue（如 `Closes #3`）。
3. 完成后在对应 Issue 评论里写明改了什么、如何验收，然后关闭 Issue。
4. **改动后必须同步 `STATUS.md`**：在「本周进展」追加一条 `日期｜做了什么｜下一步`，
   并更新「进行中」「卡住」。
5. **需要阿旻拍板的事**写进 `STATUS.md` 的「待决定」，不要自行替阿旻决定文案、
   公开范围、域名、付费服务等。
6. 推送前本地跑一次 `npm run build`，确保构建成功。
