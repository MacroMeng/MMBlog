---
title: 为什么首页文章流没有用插件组件
description: 同一套 frontmatter，两条读取路径：插件负责博客页，createContentLoader 负责首页。
blog:
  date: 2026-10-12 08:15
  summary: 博客列表是构建时生成的 Markdown，首页却需要自定义布局。这里解释两者的数据边界，以及为什么它们仍然共享同一套字段约定。
  image: /covers/rss.svg
  imageAlt: 紫色圆环与 RSS 波纹组成的抽象封面
  author: meng
  tags: [VitePress, RSS, 架构]
  category: 工程
  scope: site
license: MIT
---

# 为什么首页文章流没有用插件组件

`@binarynoir/vitepress-blog` 的定位很明确：**无头博客数据与路由层**。它把文章识别、列表生成、分页、筛选、RSS 和 SEO 都处理好了，但不提供可以自由组合的 Vue 列表组件。

## 博客页：交给插件

`docs/blog/index.md` 只声明：

```yaml
blog-index:
  scope: site
  layout: grid
```

构建时，插件会把所有文章写成普通的 Markdown/HTML 卡片列表。没有 JavaScript 也能看，搜索也能收录。

## 首页：自己读 frontmatter

首页是自定义布局 `m3e-home`，需要 Hero、一言、文章流和关于卡片。这里不能直接“调用”插件的列表组件，所以用 `createContentLoader`：

```ts
export default createContentLoader("blog/**/*.md", {
  transform(pages) {
    return pages
      .filter((page) => page.frontmatter.blog)
      .map((page) => ({
        url: page.url,
        title: page.frontmatter.title,
        date: page.frontmatter.blog.date,
        summary: page.frontmatter.blog.summary,
        // ...
      }));
  },
});
```

## 两条路径，一套约定

关键在于字段名保持一致：`title`、`date`、`summary`、`image`、`author`、`tags`、`category`、`pinned`。插件读它们，首页也读它们。新增文章时不需要维护两份内容。

## RSS 不重复造

每个博客页会自动生成独立 feed，并注入 `<link rel="alternate">`。主博客的 feed 是 `/blog/feed.xml`，文章页和首页都会链接它。验证方法：

```bash
pnpm build
Get-Content .vitepress/dist/blog/feed.xml
```

如果构建产物里有这个文件，文章页的 `<head>` 里也有 feed、Open Graph 和 Twitter Card，就说明插件的管线工作正常。

> 自定义的是呈现，不是数据源。把这条边界守住，升级插件时就不会痛苦。
