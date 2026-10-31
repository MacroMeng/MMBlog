---
title: 用 Material 3 Expressive 重新设计博客
description: 从 token、形状到 spring motion，记录这个博客视觉层的搭建过程。
blog:
  date: 2026-10-28 09:30
  summary: 不换框架、不 Fork 插件，只用一层 token 和组件把 VitePress 默认主题变成 Material 3 Expressive。
  image: /covers/m3e.svg
  imageAlt: 紫、绿、粉三色圆角形状组成的抽象封面
  author: meng
  tags: [Material 3, 设计系统, VitePress]
  category: 设计
  scope: site
  pinned: true
  cover: true
license: CC-BY-4.0
---

# 用 Material 3 Expressive 重新设计博客

Material 3 Expressive 最吸引我的地方，不是“更活泼”，而是它把**注意力**当成一种可以设计的资源。形状、颜色、排版和动效都在回答同一个问题：这个屏幕上，什么最重要？

## 先定 token，再写组件

这个站点没有在组件里写任何十六进制颜色。所有颜色都来自 `--md-sys-color-*`，圆角来自 `--md-sys-shape-corner-*`，动效来自 `--md-sys-motion-spring-*`。

```css
.card {
  border-radius: var(--md-sys-shape-corner-medium);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  transition:
    border-radius var(--md-sys-motion-spring-expressive-spatial-fast-duration)
      var(--md-sys-motion-spring-expressive-spatial-fast-easing),
    background-color
      var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing);
}
```

这样做的好处很实际：换种子色只需要重新生成 token，组件一行都不用改。

## 形状要有层级

M3E 的圆角不是“随便圆一点”。容器和子元素的圆角需要满足：

```text
inner radius = outer radius − padding
```

否则嵌套会看起来不平衡。比如外卡片 28px、内边距 12px，内部元素就不该继续用 28px。

## 动效只留给该动的东西

- 位置、大小、圆角变化 → **spatial spring**，可以有一点回弹。
- 颜色、透明度变化 → **effects spring**，绝不 overshoot。
- 所有动效都尊重 `prefers-reduced-motion`。

按钮按下时从 full 圆角收窄到 8px，就是一个很小的 expressive 细节。

> 表达不是把每样东西都放大，而是让重要的东西被看见。

## 接下来的事

下一篇会聊这个博客的内容管线：GFM、LaTeX、RSS，以及为什么首页文章流要单独用 `createContentLoader`。
