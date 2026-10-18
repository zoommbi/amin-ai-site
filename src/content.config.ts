import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 「我的判断」：每条判断一个 Markdown 文件，放在 src/content/judgments/
const judgments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/judgments' }),
  schema: z.object({
    title: z.string(), // 一句话判断
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    sample: z.boolean().default(false), // true 时卡片显示"示例"
    draft: z.boolean().default(false), // true 时不在网站显示
  }),
});

export const collections = { judgments };
