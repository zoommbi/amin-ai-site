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

// 「正在学习」：每张知识地图一个 YAML 文件，放在 src/content/maps/
// 地图 = 若干板块（region），每个板块里若干知识块（node）；轻点知识块弹出详细信息
const mapNode = z.object({
  id: z.string(), // 英文短名，用于网址锚点 #id 和 related 互相引用
  title: z.string(),
  summary: z.string(), // 一句话，显示在知识块上
  detail: z.string().default(''), // 弹窗里的详细说明，空行分段
  points: z.array(z.string()).default([]), // 要点
  related: z.array(z.string()).default([]), // 相关知识块的 id
  questions: z.array(z.string()).default([]), // 想深入时可以继续问 AI 的问题
});

const maps = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/maps' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // 一句话，显示在学习页的卡片上
    status: z.enum(['学习中', '已梳理']).default('学习中'),
    updated: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    sample: z.boolean().default(false), // true 时显示"示例"，内容是占位
    draft: z.boolean().default(false),
    regions: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string().default(''),
        nodes: z.array(mapNode),
      }),
    ),
  }),
});

export const collections = { judgments, maps };
