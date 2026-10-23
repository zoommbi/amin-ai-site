// @ts-check
import { defineConfig } from 'astro/config';

// 纯静态输出，部署到 Cloudflare Pages（构建命令 npm run build，输出目录 dist）
// site：线上地址，用于 canonical、sitemap、结构化数据；换域名只改这里
export default defineConfig({
  site: 'https://amin-ai-site.aminai.workers.dev',
  output: 'static',
});
