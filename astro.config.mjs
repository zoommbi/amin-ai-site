// @ts-check
import { defineConfig } from 'astro/config';

// 纯静态输出，部署到 Cloudflare Pages（构建命令 npm run build，输出目录 dist）
export default defineConfig({
  output: 'static',
});
