import { getCollection } from 'astro:content';

export const articlePath = (id: string) => '/articles/' + encodeURIComponent(id) + '/';
export const articleDate = (date: Date) => date.toISOString().slice(0, 10);

export async function getArticles() {
  const entries = await getCollection('articles', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
