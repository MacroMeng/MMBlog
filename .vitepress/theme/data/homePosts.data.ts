import { createContentLoader } from "vitepress";
import type { HomePost, PostAuthor, PostImage } from "../types/post.ts";
import { toIso } from "../utils/date.ts";

type Frontmatter = Record<string, unknown>;

interface RawPage {
  url: string;
  frontmatter: Frontmatter;
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeImage(value: unknown, alt = ""): PostImage | null {
  if (typeof value === "string" && value.trim()) {
    return { src: value.trim(), alt };
  }
  if (value && typeof value === "object") {
    const image = value as Record<string, unknown>;
    const src = asString(image.src);
    if (!src) return null;
    return {
      src,
      alt: asString(image.alt, alt),
      fit: image.fit === "contain" ? "contain" : "cover",
      position: asString(image.position) || undefined,
    };
  }
  return null;
}

function normalizeAuthors(value: unknown): PostAuthor[] {
  const list = Array.isArray(value) ? value : value ? [value] : [];

  return list.flatMap((item): PostAuthor[] => {
    if (typeof item === "string" && item.trim()) {
      return [{ name: item.trim() }];
    }
    if (item && typeof item === "object") {
      const author = item as Record<string, unknown>;
      const name = asString(author.name);
      if (!name) return [];
      return [{ name, url: asString(author.url) || undefined }];
    }
    return [];
  });
}

function normalizeTags(value: unknown): string[] {
  const values = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return [...new Set(values.map((tag) => asString(tag)).filter(Boolean))];
}

export default createContentLoader("blog/**/*.md", {
  transform(rawPages): HomePost[] {
    return (rawPages as RawPage[])
      .flatMap((page): HomePost[] => {
        const frontmatter = page.frontmatter ?? {};
        const rawBlog = frontmatter.blog;
        if (!rawBlog) return [];

        const blog = rawBlog === true ? {} : asObject(rawBlog);
        if (blog.draft === true) return [];

        const title =
          asString(blog.title) ||
          asString(frontmatter.title) ||
          decodeURIComponent(
            page.url.split("/").filter(Boolean).at(-1) ?? "未命名文章",
          );
        const summary =
          asString(blog.summary) ||
          asString(frontmatter.description) ||
          "这篇文章还没有写摘要。";
        const imageValue = blog.image ?? frontmatter.image;
        const imageAlt =
          asString(blog.imageAlt) || asString(frontmatter.imageAlt);

        return [
          {
            url: page.url,
            title,
            date:
              toIso(blog.date) ||
              toIso(frontmatter.date) ||
              toIso(frontmatter.published) ||
              "",
            summary,
            image: normalizeImage(imageValue, imageAlt),
            author: normalizeAuthors(
              blog.author ?? frontmatter.author ?? frontmatter.authors,
            ),
            tags: normalizeTags(blog.tags ?? frontmatter.tags),
            category: asString(blog.category) || asString(frontmatter.category),
            pinned: blog.pinned === true,
          },
        ];
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        if (!a.date && !b.date) return a.title.localeCompare(b.title, "zh-CN");
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.localeCompare(a.date);
      });
  },
});

declare const data: HomePost[];
export { data };
