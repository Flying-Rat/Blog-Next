export interface PostFrontmatter {
  title: string;
  date: string;
  author?: string;
  authors?: string[];
  categories?: string[];
  tags?: string[];
  toc?: boolean;
  excerpt?: string;
}

export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  filename: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
  tocItems: TocItem[];
}
