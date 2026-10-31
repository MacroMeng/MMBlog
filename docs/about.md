---
title: 关于
pageClass: about-page
aside: false
outline: false
description: 关于 Meng，以及这个用 VitePress 和 Material 3 Expressive 搭起来的博客。
---

<div class="about-intro">
  <div class="about-intro__copy">
    <p class="about-eyebrow">README · M33E</p>
    <h1>你好，我是 Meng。</h1>
    <p class="about-lede">
      白天写界面，晚上拆界面。这个站点是我的公开笔记本：把设计系统的想法、
      前端工程的取舍，以及一些还没想清楚的草稿放在一起。
    </p>
    <p class="about-lede">
      我相信好的界面不是“加一点动效”，而是让信息、形状、颜色和节奏一起工作。
      这里的所有组件都按 Material 3 Expressive 的 token 体系实现。
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

## Readme

> 这个博客不追求“内容最多”，只追求每篇文章都能把一个想法讲清楚。
> 如果某篇文章对你有帮助，欢迎通过上面的方式告诉我。

### 常驻项目

| 项目         | 状态     | 说明                        |
| ------------ | -------- | --------------------------- |
| M33E Blog    | 持续更新 | 你正在看的这个站点          |
| 设计系统笔记 | 进行中   | 把 M3E token 落到真实产品里 |
| 前端工程     | 随时     | 构建、性能、可维护性        |

### 最近想做的事

- [x] 用自定义布局重做首页
- [x] 把博客列表皮肤化，而不是 Fork 插件
- [ ] 给文章加更多交互式示例
- [ ] 写一篇关于 spring motion 的实测

---

_这个页面没有 `blog:` frontmatter，因此不会被博客插件收录。_
