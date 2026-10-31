import type { DeepPartial, M3EConfig } from "../types/site-config.ts";

export const defaultM3EConfig: M3EConfig = {
  authors: {
    meng: { name: "Meng", url: "https://example.com/about" },
  },
  profile: {
    name: "Meng",
    handle: "M33E",
    role: "前端工程师 · 设计系统爱好者",
    avatar: "/avatar.svg",
    bio: "喜欢把复杂的东西拆开、再装回去。这里记录前端工程、设计系统与一些不务正业的折腾。",
    location: "中国",
    skills: [
      "VitePress",
      "Vue",
      "TypeScript",
      "Material 3",
      "设计系统",
      "前端工程",
    ],
    cta: {
      label: "认识我",
      href: "/about",
    },
  },
  socials: [
    {
      label: "GitHub",
      handle: "@M33E",
      href: "https://github.com/",
      icon: "code",
      navIcon: "github",
    },
    {
      label: "Bilibili",
      handle: "@M33E",
      href: "https://www.bilibili.com/",
      icon: "smart_display",
    },
    {
      label: "Email",
      handle: "hello@example.com",
      href: "mailto:hello@example.com",
      icon: "mail",
    },
    {
      label: "RSS",
      handle: "订阅博客",
      href: "/blog/feed.xml",
      icon: "rss_feed",
      navIcon: "rss",
    },
  ],
  home: {
    hero: {
      eyebrowIcon: "flare",
      eyebrow: "M33E · NOTES ON CRAFT",
      titleLead: "把想法写成",
      titleAccent: "可以运行的东西",
      titleTail: "。",
      description:
        "前端工程、设计系统与 Material 3 Expressive。这里记录我如何把界面、代码和一点好奇心，拼成可以交付的产品。",
      actions: [
        {
          label: "阅读文章",
          href: "/blog/",
          icon: "article",
          variant: "filled",
          size: "medium",
        },
        {
          label: "关于我",
          href: "/about",
          icon: "person",
          variant: "outlined",
          size: "medium",
        },
      ],
      asideLabel: "站点速览",
      stats: [
        {
          icon: "edit_note",
          value: "{postCount}",
          label: "篇公开笔记",
          tone: "primary",
        },
        {
          icon: "interests",
          value: "M3E",
          label: "Material 3 Expressive",
          tone: "tertiary",
        },
        {
          icon: "rss_feed",
          value: "RSS 已开启",
          label: "订阅全部文章",
          href: "/blog/feed.xml",
          tone: "surface",
        },
      ],
    },
    latest: {
      eyebrow: "LATEST NOTES",
      title: "最近写下的",
      limit: 7,
      action: {
        label: "查看全部",
        href: "/blog/",
        icon: "arrow_forward",
        variant: "text",
      },
      empty: "还没有文章。在 docs/blog/ 中新建一篇试试。",
    },
    about: {
      eyebrow: "ABOUT",
      title: "关于这个站点",
      body: "这是一个用 VitePress 2 搭起来的个人博客，视觉层按 Material 3 Expressive 的 token 体系设计。文章、RSS 与 SEO 交给博客插件，首页文章流则用 createContentLoader 读取同一套 frontmatter。",
      action: {
        label: "阅读 Readme",
        href: "/about",
        icon: "arrow_outward",
        variant: "tonal",
      },
    },
  },
  footer: {
    since: 2024,
    icp: "",
    links: [
      { label: "文章", href: "/blog/" },
      { label: "关于", href: "/about" },
      { label: "RSS", href: "/blog/feed.xml" },
    ],
    socialsLabel: "页脚社交链接",
    builtWith: "Built with VitePress & Material 3 Expressive",
    copyrightSuffix: "保留所有权利",
  },
  oneLiner: {
    source: "/one-liners.json",
    label: "今日一言",
    offlineLabel: "（离线句子）",
    refreshLabel: "换一句",
    loadingLabel: "正在获取新句子",
    fallback: {
      text: "慢慢来，比较快。",
      from: "M33E",
    },
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeValue<T>(base: T, override: unknown): T {
  if (override === undefined) return base;
  if (Array.isArray(base)) return override as T;
  if (isObject(base) && isObject(override)) {
    return Object.fromEntries(
      Object.entries(base).map(([key, value]) => [
        key,
        mergeValue(value, override[key]),
      ]),
    ) as T;
  }
  return override as T;
}

export function resolveM3EConfig(override?: DeepPartial<M3EConfig>): M3EConfig {
  return mergeValue(defaultM3EConfig, override);
}
