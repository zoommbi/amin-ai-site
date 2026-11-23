// 个人网站的阅读清单：只维护真实推荐，分类由内容自动汇总。
// 出版日期采用下面明确标注的英文版本口径，不混用中文译本出版时间。
export interface ReadingBook {
  id: string;
  category: string;
  title: string;
  originalTitle: string;
  authors: string[];
  published: string; // YYYY-MM-DD，只有月份可写 YYYY-MM
  publisher: string;
  summary: string;
  reason: string;
  sourceUrl: string;
  sourceLabel: string;
}

export const books: ReadingBook[] = [
  {
    id: 'competing-against-luck',
    category: '商业',
    title: '与运气竞争',
    originalTitle: 'Competing Against Luck: The Story of Innovation and Customer Choice',
    authors: ['克莱顿·克里斯坦森', '塔迪·霍尔', '卡伦·迪伦', '大卫·邓肯'],
    published: '2016-10-04',
    publisher: 'HarperBusiness',
    summary:
      '从“待完成的任务”（Jobs to Be Done）出发，解释人们为什么在特定情境下选择某个产品或服务。重点不是用户有什么身份，而是他们希望取得什么进展，以及现有方案为什么不能满足。',
    reason: '先理解购买动机：用户会做，不代表用户愿意自己做。',
    sourceUrl: 'https://www.christenseninstitute.org/book/competing-against-luck/',
    sourceLabel: '克里斯坦森研究所',
  },
  {
    id: 'value-proposition-design',
    category: '商业',
    title: '价值主张设计',
    originalTitle: 'Value Proposition Design: How to Create Products and Services Customers Want',
    authors: ['亚历山大·奥斯特瓦德', '伊夫·皮尼厄', '格雷戈里·贝尔纳达', '艾伦·史密斯'],
    published: '2014-10',
    publisher: 'John Wiley & Sons',
    summary:
      '通过客户画像与价值地图，把用户要完成的任务、痛点和期待的收益，与产品提供的功能、痛点缓解和收益创造对应起来，帮助设计并检验产品是否真的符合需求。',
    reason: '把模糊需求转成用户愿意购买的具体交付。',
    sourceUrl: 'https://www.wiley.com/en-us/shop/general-introductory-business-management/value-proposition-design-how-to-create-products-and-services-customers-want-p-9781118968055',
    sourceLabel: 'Wiley 出版社',
  },
  {
    id: 'traction',
    category: '商业',
    title: '拉新',
    originalTitle: 'Traction: How Any Startup Can Achieve Explosive Customer Growth',
    authors: ['加布里埃尔·温伯格', '贾斯汀·马雷斯'],
    published: '2015-10-06',
    publisher: 'Portfolio / Penguin',
    summary:
      '介绍 19 种获取客户的渠道，并说明如何通过有重点的测试选择有效渠道。产品存在不代表客户能发现它；找到合适的获客渠道，是商业闭环的一部分。',
    reason: '解决“用户有需求时，怎样快速找到我的产品”。',
    sourceUrl: 'https://www.penguinrandomhouse.com/books/319121/traction-by-gabriel-weinberg-and-justin-mares/9781591848363/',
    sourceLabel: 'Penguin Random House',
  },
];

export const readingCategories = [...new Set(books.map((book) => book.category))];

export const formatPublicationDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return [year + ' 年', month ? month + ' 月' : '', day ? day + ' 日' : '']
    .filter(Boolean)
    .join(' ');
};
