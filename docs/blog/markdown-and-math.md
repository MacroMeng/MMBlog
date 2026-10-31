---
title: GFM、LaTeX 与一条能用的内容管线
description: 表格、任务列表、自动链接和 MathJax 公式如何在 VitePress 里一起工作。
blog:
  date: 2026-10-20 14:30
  summary: 记录博客的内容渲染配置：GFM 默认能力、markdown-it-mathjax3，以及避免 Vue 未知组件警告的几个细节。
  image: /covers/math.svg
  imageAlt: 深紫色背景上的数学符号与网格
  author: meng
  tags: [Markdown, LaTeX, VitePress]
  category: 工程
  scope: site
license: CC-BY-4.0
---

# GFM、LaTeX 与一条能用的内容管线

写博客最怕的不是没灵感，而是灵感来了，渲染器不支持。VitePress 的 Markdown 默认已经覆盖了 GFM 的大部分能力，数学公式只需要再接一层 MathJax。

## GFM 默认可用

| 能力     | 语法                    | 结果                  |
| -------- | ----------------------- | --------------------- |
| 表格     | `\| A \| B \|`          | 正常渲染              |
| 删除线   | `~~text~~`              | ~~text~~              |
| 任务列表 | `- [x]`                 | 复选框                |
| 自动链接 | `https://vitepress.dev` | https://vitepress.dev |

- [x] 表格
- [x] 任务列表
- [x] 删除线
- [x] 自动链接

## GFM 引用框

GitHub 风格的 alert 也能直接用，样式由 M3E 的 callout token 接管：

> [!NOTE]
> 这条提示需要被扫读时看见，但不必打断阅读。

> [!TIP]
> 用 `> [!TIP]` 写一条顺手的建议。

> [!WARNING]
> 这里的操作会覆盖已有内容，请先确认。

> [!CAUTION]
> 破坏性操作请在执行前做好备份。

VitePress 自带的容器也使用同一套视觉：

::: tip 小提示
`::: tip` 与 `> [!TIP]` 共享同一套 callout 造型，只是语法不同。
:::

## 行内公式

质能方程 $E = mc^2$ 应该和正文在同一行里，不打断阅读节奏。

## 块级公式

$$
\int_{-\infty}^{\infty} e^{-x^2}\,\mathrm{d}x = \sqrt{\pi}
$$

矩阵也没问题：

$$
\mathbf{A} =
\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix},
\qquad
\det(\mathbf{A}) = a_{11}a_{22} - a_{12}a_{21}
$$

## 配置只有两段

```ts
import mathjax3 from 'markdown-it-mathjax3'

markdown: {
  config(md) {
    md.use(mathjax3)
  },
}
```

然后在 Vue 编译器里把 MathJax 生成的标签声明为自定义元素，构建时就不会再出现 `Failed to resolve component: mjx-container` 这类警告。

> 公式是内容的一部分，不是装饰。它应该和正文共享同一套字体、行高与颜色。
