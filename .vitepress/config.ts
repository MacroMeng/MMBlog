import { defineConfig, type DefaultTheme } from "vitepress";
import { withBlog } from "@binarynoir/vitepress-blog/vitepress";
import mathjax3 from "markdown-it-mathjax3";
import githubAlerts from "markdown-it-github-alerts";
import { resolveM3EConfig } from "./theme/config/defaults.ts";
import type { DeepPartial, M3EConfig } from "./theme/types/site-config.ts";

// VitePress site-level values. `sitemap.hostname` is the single source for the
// absolute URL; the blog plugin receives the same value.
const siteUrl = "https://unnuTechnology.github.io";
const siteTitle = "M33EBlog";
const siteDescription = "MacrosMeng's Material 3 Expressive Blog Example Site";
// Root site / custom domain: "/". GitHub Pages project site: "/repo-name/".
const base = process.env.VP_BASE || "/M33EBlog/";

const alertIcon = (name: string) =>
  `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;

const githubAlertOptions = {
  titles: {
    note: "注意",
    tip: "提示",
    important: "重要",
    warning: "警告",
    caution: "小心",
  },
  icons: {
    note: alertIcon("info"),
    tip: alertIcon("lightbulb"),
    important: alertIcon("priority_high"),
    warning: alertIcon("warning"),
    caution: alertIcon("dangerous"),
  },
};

/** MathJax CHTML / MathML elements are HTML, not Vue components. */
const mathElements = new Set([
  "math",
  "semantics",
  "annotation",
  "annotation-xml",
  "mrow",
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "mspace",
  "msup",
  "msub",
  "msubsup",
  "mfrac",
  "msqrt",
  "mroot",
  "mstyle",
  "merror",
  "mpadded",
  "mphantom",
  "mfenced",
  "menclose",
  "mtable",
  "mtr",
  "mtd",
  "mlabeledtr",
  "maction",
  "mglyph",
  "mprescripts",
  "none",
  "mmultiscripts",
]);

const isMathElement = (tag: string) =>
  tag.startsWith("mjx-") || mathElements.has(tag);

const blogLabels = {
  by: "作者",
  published: "发布于",
  updated: "更新于",
  dateTime: "{date} {time}",
  readingTime: "约 {n} 分钟",
  newer: "更新一篇",
  older: "更早一篇",
  allPosts: "查看全部文章",
  draft: "草稿",
  pinned: "置顶",
  announcement: "公告",
  announcements: "公告",
  announcementCount: "{n} 条公告",
  dismiss: "关闭",
  noPosts: "还没有文章。",
  undated: "未标注日期",
  browse: "筛选文章",
  all: "全部",
  moreCategories: "更多",
  date: "日期",
  allTime: "全部时间",
  categories: "分类",
  tags: "标签",
  archive: "归档",
  tag: "标签",
  postCount: "{n} 篇文章",
  postCountOne: "{n} 篇文章",
  noMatches: "没有符合条件的文章。",
  removeFilter: "移除筛选：{filter}",
  showAll: "显示全部文章",
  more: "还有 {n} 个",
  less: "收起",
  filter: "筛选 {row}",
  noFilterMatches: "没有匹配项。",
  previous: "上一页",
  next: "下一页",
  pages: "分页",
  subscribe: "订阅",
  rssFeed: "RSS 订阅",
  subscribeTo: "订阅 {blog}",
  subscribeHint: "把下面的地址复制到你的阅读器。",
  feedAddress: "Feed 地址",
  copy: "复制",
  copied: "已复制",
  openInReader: "在阅读器中打开",
  viewFeed: "查看 Feed",
  aboutFeeds: "什么是 Feed？",
  close: "关闭",
};

/**
 * Markdown-it has no table wrapper token, so add one. This keeps the native
 * table layout intact on desktop and gives narrow screens a scroll container
 * instead of letting the table widen the whole page.
 */
function wrapMarkdownTables(md: any) {
  const defaultOpen = md.renderer.rules.table_open;
  const defaultClose = md.renderer.rules.table_close;

  md.renderer.rules.table_open = (
    tokens: any[],
    idx: number,
    options: any,
    env: any,
    self: any,
  ) =>
    `<div class="m3e-table-wrapper">${
      defaultOpen
        ? defaultOpen(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options)
    }`;

  md.renderer.rules.table_close = (
    tokens: any[],
    idx: number,
    options: any,
    env: any,
    self: any,
  ) =>
    `${
      defaultClose
        ? defaultClose(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options)
    }</div>`;
}

/**
 * Site content and home-page configuration.
 *
 * Every field is optional at the type level because the theme merges this
 * object with its defaults, so you can override only what you need:
 * `m3e: { socials: [...] }`.
 */
const m3eConfig = {
  authors: {
    meng: { name: "MacrosMeng", url: `${siteUrl}/about` },
  },
  profile: {
    name: "MacrosMeng",
    handle: "M33E",
    role: "只是一个学生……",
    avatar: "/avatar.svg",
    bio: "The people who are crazy to think they can change the world, are the ones who do. —— Think Different, Apple",
    location: "中国",
    skills: [
      "VitePress",
      "Vue",
      "TypeScript",
      "Material 3 Expressive",
      "Designing",
    ],
    cta: {
      label: "认识我",
      href: "/about",
    },
  },
  socials: [
    {
      label: "GitHub Repo",
      handle: "unnuTechnology/M33EBlog",
      href: "https://github.com/unnuTechnology/M33EBlog",
      icon: "code",
      navIcon: "github",
    },
    {
      label: "Email",
      handle: "meng-yc@outlook.com",
      href: "mailto:meng-yc@outlook.com",
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
      eyebrow: "M33E · 表达，自有声",
      titleLead: "To Express",
      titleAccent: "Expressively",
      titleTail: "",
      description:
        "深入探索 Material Design 3 Expressive 带来的深厚表现力与足够简约不抢眼的博客风格。",
      actions: [
        {
          label: "开始阅读",
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
      body: "这是一个用 VitePress 2 搭起来的博客范例，视觉层按 Material 3 Expressive 的 token 体系设计。文章、RSS 与 SEO 交给博客插件，首页文章流则用 createContentLoader 读取同一套 frontmatter。",
      action: {
        label: "阅读 Readme",
        href: "/about",
        icon: "arrow_outward",
        variant: "tonal",
      },
    },
  },
  footer: {
    since: 2026,
    icp: "",
    links: [
      { label: "文章", href: "/blog/" },
      { label: "关于", href: "/about" },
      { label: "RSS", href: "/blog/feed.xml" },
    ],
    socialsLabel: "页脚社交链接",
    builtWith: "Built with VitePress & Material 3 Expressive",
    copyrightSuffix: "Code in MPL 2.0, Content in CC-BY 4.0",
  },
  oneLiner: {
    source: "/hitokoto.json",
    label: "今日一言",
    offlineLabel: "（离线句子）",
    refreshLabel: "换一句",
    loadingLabel: "正在获取新句子",
    fallback: {
      text: "你咋看到这个句子的？",
      from: "你知道太多了。",
    },
  },
} satisfies DeepPartial<M3EConfig>;

const m3e = resolveM3EConfig(m3eConfig);
const { authors } = m3e;

const navSocialLinks = m3e.socials.flatMap((social) => {
  if (!social.navIcon) return [];
  return [
    {
      icon: social.navIcon,
      link: social.href,
      ariaLabel: social.label,
      ...(social.href.startsWith("http") ? {} : { target: "_self" }),
    },
  ];
});

const blogOptions = {
  siteUrl,
  authors,
  defaultAuthor: "MacrosMeng",
  locale: "zh-CN",
  timeZone: "Asia/Shanghai",
  dateFormat: { dateStyle: "long" as const },
  timeFormat: {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    timeZoneName: "short" as const,
  },
  wordsPerMinute: 220,
  byline: true,
  cover: true,
  postNav: true,
  feedLimit: 20,
  pageSize: 9,
  rssLink: true,
  labels: blogLabels,
};

export default withBlog(
  defineConfig({
    lang: "zh-CN",
    title: siteTitle,
    titleTemplate: `:title · ${siteTitle}`,
    description: siteDescription,
    base,
    srcDir: "docs",
    cleanUrls: true,
    sitemap: { hostname: siteUrl },
    head: [
      ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      ["meta", { name: "author", content: m3e.profile.name }],
      ["meta", { name: "format-detection", content: "telephone=no" }],
    ],
    markdown: {
      // A single Catppuccin Mocha theme keeps code blocks on one known dark
      // surface in both light and dark page modes.
      theme: "catppuccin-mocha",
      config(md) {
        md.use(mathjax3);
        md.use(githubAlerts, githubAlertOptions);
        wrapMarkdownTables(md);
      },
      image: { lazyLoading: true },
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: isMathElement,
        },
      },
    },
    themeConfig: {
      logo: "/favicon.svg",
      nav: [
        { text: "首页", link: "/" },
        { text: "博客", link: "/blog/" },
        { text: "关于", link: "/about" },
      ],
      socialLinks: navSocialLinks,
      m3e,
      search: {
        provider: "local",
        options: {
          translations: {
            button: {
              buttonText: "搜索",
              buttonAriaLabel: "搜索文章",
            },
            modal: {
              displayDetails: "显示详情",
              resetButtonTitle: "清除",
              backButtonTitle: "返回",
              noResultsText: "没有找到结果",
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
              },
            },
          },
        },
      },
      outline: {
        level: [2, 3],
        label: "本页目录",
      },
      docFooter: {
        prev: "上一篇",
        next: "下一篇",
      },
      lastUpdated: false,
      returnToTopLabel: "回到顶部",
      sidebarMenuLabel: "菜单",
      darkModeSwitchLabel: "外观",
      lightModeSwitchTitle: "切换到浅色模式",
      darkModeSwitchTitle: "切换到深色模式",
      skipToContentLabel: "跳到正文",
      externalLinkIcon: true,
    } as DefaultTheme.Config & { m3e: DeepPartial<M3EConfig> },
  }),
  blogOptions,
);
