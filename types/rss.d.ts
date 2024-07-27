export interface RssItem {
  title: string;
  link: string;
  source: string;
  pubDate: Date;
  description?: string;
  enclosure: { url: string };
}

export interface RssChannel {
  item: RssItem[];
}

export interface RssData {
  rss: {
    channel: RssChannel[];
  };
}