---
title: 关于
pageClass: about-page
aside: false
outline: false
description: 关于我以及这个用 VitePress 和 Material 3 Expressive 搭起来的博客。
---

<div class="about-intro">
  <div class="about-intro__copy">
    <p class="about-eyebrow">README · M33E</p>
    <h1>表达，自有声 | M<sup>3</sup>3E</h1>
    <p class="about-lede">
      Material 3 Design Expressive，加上 VitePress。不过度设计，不提供过多自定义选项，开箱即用。这便是 <strong>M</strong>acros<strong>M</strong>eng's <strong>M</strong>aterial <strong>3</strong> <strong>E</strong>xpressive <strong>Blog</strong>。
    </p>
    <p class="about-lede">
      市面上 M3E 博客数不胜数，怎么才能设计一款好的主题，关键便是取舍与平衡。M33E 不提供过多配置选项，开箱即用，同时保持开放与新手友好，这便是它的最大优势。
    </p>
  </div>

  <ProfileCard :show-socials="false" />
</div>

<SocialLinks />

## 这个站是怎么搭的

- **框架**：VitePress 2 + Vue 3 + TypeScript。
- **博客数据**：`@binarynoir/vitepress-blog` 负责 frontmatter、列表、RSS、byline 与上下篇。
- **首页**：自定义 `m3e-home` 布局，用 `createContentLoader` 读取同一套 frontmatter。
- **视觉**：Material 3 Expressive token（色彩、形状、排版、spring motion），种子色为 Material 蓝紫 `#6750A4`。
- **字体**：Google Sans Flex Variable 与 Noto Sans SC，Fontsource 自托管。
- **数学**：`markdown-it-mathjax3` 渲染行内与块级公式。

## 直接开始

> 这个博客不追求“内容最多”，只追求每篇文章都能把一个想法讲清楚。

参见项目的 README，开始搭建属于你的 M33E 风格博客网站。
