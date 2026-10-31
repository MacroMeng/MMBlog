export interface PostAuthor {
  name: string;
  url?: string;
}

export interface PostImage {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
}

/**
 * Home-page projection of a post. Field names mirror the blog plugin's
 * frontmatter (`date`, `summary`, `image`, `author`, `tags`, `category`,
 * `pinned`) so the home feed and the generated blog index describe the same
 * content, while each reads it through its own pipeline.
 */
export interface HomePost {
  url: string;
  title: string;
  date: string;
  summary: string;
  image: PostImage | null;
  author: PostAuthor[];
  tags: string[];
  category: string;
  pinned: boolean;
}
