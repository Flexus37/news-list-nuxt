import xml2js from 'xml2js'
import getSourceFromUrl from '~/utils/getSourceFromUrl'

const parseRss = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }

    const text = await response.text();
    const data = await xml2js.parseStringPromise(text, {
      trim: true,
      mergeAttrs: true,
    });

    const items = data.rss.channel[0].item;

    return items.map((item: any) => ({
      title: item.title[0],
      link: item.link[0],
      source: getSourceFromUrl(item.link[0]),
      pubDate: new Date(item.pubDate[0]),
      description: item.description ? item.description[0] : '',
      enclosure: {
        url: item.enclosure ? item.enclosure[0].url[0] : '',
      },
    }));
  } catch (error) {
    console.error(`Error fetching or parsing RSS feed from ${url}`, error);
    return [];
  }
}

export default defineEventHandler(async (event) => {
  const urls = [
    'https://lenta.ru/rss/news',
    'https://www.mos.ru/rss',
  ];

  const promises = urls.map(url => parseRss(url));
  const results = await Promise.all(promises);

  const combinedResults = results.flat();

  return combinedResults;
});
