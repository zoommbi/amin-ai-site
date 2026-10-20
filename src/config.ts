// 网站当前使用的配色方案。可选值见 src/styles/themes.css 里的 [data-theme="..."]。
// 预览其他方案：在网址后面加 ?theme=a（a/b/c/d/warm），页面底部会出现切换按钮。

export const THEMES = [
  { id: 'warm', label: '现状', bg: '#f7efe4' },
  { id: 'a', label: 'A 留白', bg: '#f6f6f4' },
  { id: 'b', label: 'B 雾玻璃', bg: '#eef1f6' },
  { id: 'c', label: 'C 鼠尾草', bg: '#f3f1ea' },
  { id: 'd', label: 'D 夜墨', bg: '#121316' },
] as const;

export const SITE_THEME: (typeof THEMES)[number]['id'] = 'warm';
