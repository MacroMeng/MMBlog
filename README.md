# M33E Blog

> [!WARNING]
>
> 本项目含有**大量未经审查的 AI 生成代码。**

一个基于 VitePress 2 的博客：带有 Material 3 Expressive 视觉层，博客列表、RSS 与 SEO 由插件生成，自定义首页通过 `createContentLoader` 读取同一份 frontmatter。

## 技术栈

- VitePress `2.0.0-alpha.21`、Vue 3、TypeScript、pnpm、Node 22+
- `@binarynoir/vitepress-blog`：文章识别、博客索引、筛选、作者信息、文章导航、RSS、Open Graph / Twitter 卡片
- `verve-tokens` + Material Color Utilities：M3 Expressive token 层（Tonal Spot 配色）
- Fontsource：Google Sans Flex Variable + Noto Sans SC Variable（不使用 Inter）
- `material-symbols`：Material 图标字体
- `markdown-it-mathjax3@4`（VitePress 2 的 peer 依赖范围）用于 LaTeX
- `markdown-it-github-alerts`：`> [!WARNING]` 形式的 GFM alerts
- Shiki `catppuccin-mocha`：代码块
- GFM 由 VitePress 默认 Markdown 管线提供

## 将本仓库作为 GitHub 模板使用

本仓库适合直接复制，而不是作为 npm 包安装。每个由模板创建的博客都拥有独立的内容、主题和部署流程。模板包含完整的 M3E 主题、示例文章、本地一言数据和 GitHub Pages workflow。

本项目使用 **MPL 2.0** 开源，你不需要将你的博客内容也使用 MPL 2.0 开放，除非你引用了主题里的示例文章。

### 模板包含的内容

- VitePress 2 站点配置和完整的 M3E 主题
- 示例博客列表、文章、关于页和自定义首页
- 本地一言 JSON
- `pnpm` 锁文件和 Node 22 引擎声明
- `.github/workflows/deploy.yml`，用于 GitHub Pages 部署
- `scripts/verify.mjs`，构建后冒烟检查
- 项目站点部署所需的 base 路径工具

### 环境要求

发布模板或创建新博客之前：

- Node.js `22` 或更高版本
- pnpm `10` 或更高版本
- Git
- GitHub 账号
- 可选：自定义域名

检查版本：

```bash
node --version
pnpm --version
git --version
```

### 第一部分 — 将本仓库发布为模板

1. 在 GitHub 创建一个空仓库，例如：

   ```text
   vitepress-m3e-blog-template
   ```

2. 在当前项目中完成首次提交并推送：

   ```bash
   git add .
   git commit -m "Initial blog template"
   git branch -M main
   git remote add origin git@github.com:YOUR_NAME/vitepress-m3e-blog-template.git
   git push -u origin main
   ```

   如果仓库已有 `origin`，改为更新地址：

   ```bash
   git remote set-url origin git@github.com:YOUR_NAME/vitepress-m3e-blog-template.git
   ```

3. 在 GitHub 打开：

   ```text
   Settings → General → Template repository
   ```

   勾选 **Template repository**。之后仓库页面会出现 **Use this template** 按钮。

4. 添加仓库描述和 topics，例如：

   ```text
   vitepress, blog, material-design, material-3, m3-expressive
   ```

5. 在公开模板之前添加 `LICENSE` 文件。本仓库有意不替你选择许可证。

6. 在 **Settings → Actions → General** 中确认允许运行 Actions。

### 第二部分 — 从模板创建新博客

1. 在模板仓库页面点击：

   ```text
   Use this template → Create a new repository
   ```

2. 填写仓库名，例如 `my-blog`，然后创建。如果想要干净的历史记录，不要同时初始化 README。

3. 克隆新仓库：

   ```bash
   git clone git@github.com:YOUR_NAME/my-blog.git
   cd my-blog
   ```

4. 安装依赖：

   ```bash
   pnpm install
   ```

   模板自带 `pnpm-lock.yaml`；日常开发请使用 `pnpm`，不要使用 npm。

5. 修改 `.vitepress/config.ts` 顶部的站点级配置：

   ```ts
   const siteUrl = "https://username.github.io";
   const siteTitle = "My Blog";
   const siteDescription = "Notes on code, design and everything between.";

   // 根站点 / 自定义域名："/"。
   // GitHub Pages 项目站点："/my-blog/"。
   const base = process.env.VP_BASE || "/";
   ```

   `siteUrl` 必须是绝对源地址，不包含仓库路径。博客插件会按 `siteUrl + base + 页面路径` 生成 RSS、sitemap 和社交卡片的地址。

6. 编辑同一文件中的 `m3eConfig`。至少需要替换：
   - `profile`：名称、handle、身份、简介、头像、技能、CTA
   - `socials`：GitHub / Bilibili / Email / RSS 链接和 handle
   - `home.hero`：Hero 文案、按钮，以及右侧三个卡片
   - `home.latest`：文章数量和各区块文案
   - `home.about`：About 区块文案和链接
   - `footer`：版权起始年份、ICP、页脚链接和标签
   - `oneLiner`：本地 JSON 数据源和离线兜底文案

7. 调整 `themeConfig.nav` 和 `themeConfig.socialLinks` 的行为：
   - `nav` 定义导航栏中的页面。
   - 导航栏社交图标由带 `navIcon` 的 `m3eConfig.socials` 条目自动生成。
   - `themeConfig.logo` 指向 favicon 或品牌标识。

8. 替换示例内容：

   ```text
   docs/blog/*.md              替换或删除示例文章
   docs/blog/index.md          保留 blog-index frontmatter，修改简介
   docs/about.md               替换为你的个人介绍
   docs/public/avatar.svg      你的头像
   docs/public/favicon.svg     你的 favicon
   docs/public/covers/*        文章封面
   docs/public/one-liners.json 你的一言数据
   ```

   关于页不能包含 `blog:` 字段，它被有意排除在博客文章之外。

9. 如果使用许可证卡片，为每篇文章添加 license 字段：

   ```yaml
   license: CC-BY-4.0
   # licenseUrl: https://example.com/license
   ```

10. 如果不想使用默认的 Material 蓝紫色，修改主题种子色：

    ```js
    // scripts/generate-theme.mjs
    const seed = "#6750A4";
    ```

    然后重新生成 tokens：

    ```bash
    pnpm theme
    ```

11. 启动开发服务器：

    ```bash
    pnpm dev
    ```

12. 在本地检查站点，至少访问：
    - `/`：自定义首页
    - `/blog/`：生成的列表、筛选和 RSS
    - 任意一篇文章：作者信息、上一篇/下一篇、许可证卡片
    - `/about`：Profile Card 和社交链接
    - `/blog/markdown-and-math`：MathJax、GFM alerts 和代码块

13. 运行生产构建和冒烟检查：

    ```bash
    pnpm build
    pnpm verify
    ```

14. 提交你的站点内容：

    ```bash
    git add .
    git commit -m "Customize blog"
    git push
    ```

### 第三部分 — 部署到 GitHub Pages

1. 在新仓库中打开：

   ```text
   Settings → Pages
   ```

2. 将 **Source** 设为 **GitHub Actions**。

3. 仓库自带的 workflow 会在推送到 `main` 时运行：

   ```text
   .github/workflows/deploy.yml
   ```

   它会安装 pnpm 和 Node 22，执行 `pnpm install --frozen-lockfile`，构建站点，并发布 `.vitepress/dist`。

4. 如果默认分支不是 `main`，修改：

   ```yaml
   on:
     push:
       branches: [main]
   ```

5. 选择正确的 URL / base 组合：

   | 部署目标                               | `siteUrl`                    | `base` / `VP_BASE` |
   | -------------------------------------- | ---------------------------- | ------------------ |
   | 用户站点：`username.github.io`         | `https://username.github.io` | `/` 或留空         |
   | 项目站点：`username.github.io/my-blog` | `https://username.github.io` | `/my-blog/`        |
   | 自定义域名：`blog.example.com`         | `https://blog.example.com`   | `/` 或留空         |

6. 如果是项目站点，添加仓库 Actions 变量：

   ```text
   Settings → Secrets and variables → Actions → Variables
   Name:  VP_BASE
   Value: /my-blog/
   ```

   workflow 会把 `VP_BASE` 传入构建。自定义组件中的内部链接和 public 图片通过 `.vitepress/theme/utils/url.ts` 里的 `resolveHref()` / `resolveAsset()` 处理，因此会自动带上相同的 base 路径。

7. 如果使用自定义域名，在 **Settings → Pages → Custom domain** 中设置，并在 `siteUrl` 中使用完整的自定义域名，同时保持 `base: "/"`。如果 GitHub 要求 `CNAME` 文件，在 `docs/public/CNAME` 中只写入域名：

   ```text
   blog.example.com
   ```

8. 首次 workflow 运行成功后，部署地址会出现在：
   - **Actions → Deploy to GitHub Pages**
   - **Settings → Pages**

### 第四部分 — 常见问题

| 现象                                             | 处理方式                                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 部署后 CSS、图片或字体 404                       | `base` 与仓库路径不一致。设置 `VP_BASE=/repo/` 或修改 `base`。                                             |
| 首页正常，但文章链接 404                         | 检查 `siteUrl` 和 `base`；`siteUrl` 是源地址，`base` 包含仓库路径。                                        |
| Feed 或 OG 图片地址指向了错误的主机              | 修改 `siteUrl` 后重新构建。                                                                                |
| Actions 中 `pnpm install --frozen-lockfile` 失败 | 本地修改依赖后执行 `pnpm install`，提交 `pnpm-lock.yaml` 并推送。                                          |
| 部署任务因权限失败                               | 将 Pages 的 Source 设为 **GitHub Actions**，并保留 workflow 中的 `pages: write` / `id-token: write` 权限。 |
| 关于页出现在博客列表中                           | 删除它的 `blog:` frontmatter 字段。                                                                        |
| 首页文章卡片作者显示错误                         | 检查文章 `author` 字段是否匹配 `m3eConfig.authors`，或直接使用显示名称/对象。                              |
| 修改主题后没有生效                               | 执行 `pnpm theme`，然后重启 `pnpm dev`；`tokens.css` 是生成文件。                                          |
| 只显示 VitePress 默认主题                        | 确认新仓库复制了 `.vitepress/theme/`，而不是只复制了 `docs/`。                                             |

### 第五部分 — 与模板保持同步

由模板生成的仓库是独立副本。如果之后改进了模板，并希望把改动同步到已有博客，可以把模板添加为第二个 remote，然后有意地合并：

```bash
git remote add template git@github.com:YOUR_NAME/vitepress-m3e-blog-template.git
git fetch template
git merge template/main --allow-unrelated-histories
```

重点检查 `.vitepress/config.ts`、`m3eConfig`、`docs/` 和静态资源中的冲突。不要把模板的示例内容盲目合并进已经发布的博客。

### 模板清理清单

- [ ] 替换 `siteUrl`、`siteTitle`、`siteDescription` 和 `base`
- [ ] 替换 `m3eConfig.profile`
- [ ] 替换 `m3eConfig.socials`
- [ ] 替换 `m3eConfig.home.hero.stats` 为自己的三个卡片
- [ ] 替换 `m3eConfig.footer` 的链接、ICP 和版权设置
- [ ] 替换 `docs/blog/*.md` 示例文章
- [ ] 替换 `docs/about.md`
- [ ] 替换 `docs/public/avatar.svg`、`favicon.svg`、`covers/` 和 `one-liners.json`
- [ ] 更新 `themeConfig.nav`
- [ ] 选择主题种子色并执行 `pnpm theme`
- [ ] 添加项目许可证
- [ ] 使用 GitHub Actions 启用 Pages
- [ ] 执行 `pnpm build` 和 `pnpm verify`

## 目录结构

```text
M33EBlog/
├─ docs/
│  ├─ index.md                         # layout: m3e-home
│  ├─ about.md                         # 无 `blog:` 字段 —— 不是文章
│  ├─ blog/
│  │  ├─ index.md                      # blog-index: { scope: site }
│  │  ├─ hello-m3e.md
│  │  ├─ markdown-and-math.md
│  │  └─ content-pipeline.md
│  └─ public/
│     ├─ avatar.svg
│     ├─ favicon.svg
│     ├─ one-liners.json               # 本地一言数据源
│     └─ covers/{m3e,math,rss}.svg
├─ .vitepress/
│  ├─ config.ts                        # withBlog + markdown + MathJax + nav
│  └─ theme/
│     ├─ index.ts                      # theme-without-fonts、字体、图标、useBlog()
│     ├─ Layout.vue                    # m3e-home 切换 + LicenseCard/SiteFooter 插槽
│     ├─ layouts/M3EHome.vue           # hero + 一言 + 文章流 + about 卡片
│     ├─ components/
│     │  ├─ M3Button.vue
│     │  ├─ PostCard.vue
│     │  ├─ ProfileCard.vue
│     │  ├─ SocialLinks.vue
│     │  ├─ OneLiner.vue
│     │  ├─ LicenseCard.vue
│     │  └─ SiteFooter.vue
│     ├─ composables/
│     │  └─ useM3EConfig.ts            # 读取 themeConfig.m3e 并合并默认值
│     ├─ config/
│     │  └─ defaults.ts                # 默认内容 + 深度合并
│     ├─ data/
│     │  └─ homePosts.data.ts          # createContentLoader('blog/**/*.md')
│     ├─ types/
│     │  ├─ post.ts
│     │  └─ site-config.ts             # M3EConfig + DeepPartial
│     ├─ utils/
│     │  ├─ date.ts
│     │  └─ url.ts                     # 感知 base 的 resolveHref/resolveAsset
│     └─ styles/
│        ├─ tokens.css                 # 生成文件，不要手动编辑
│        ├─ theme.css                  # M3 ↔ VitePress 桥接、排版、导航
│        └─ blog.css                   # 插件 CSS 变量/类名皮肤
├─ .github/workflows/
│  └─ deploy.yml                       # GitHub Pages 部署
├─ scripts/
│  ├─ generate-theme.mjs               # seed #6750A4 → tokens.css
│  └─ verify.mjs                       # 构建后冒烟检查
├─ package.json
└─ pnpm-lock.yaml
```

## 架构决策

### 1. 扩展默认主题，而不是替换它

`theme/index.ts` 引入 `vitepress/theme-without-fonts`。这是默认主题不会打包 Inter 的原因。字体由 Fontsource 自托管，并在 `theme.css` 中指定：

```css
--vp-font-family-base:
  "Google Sans Flex Variable", "Noto Sans SC Variable", "Noto Sans SC",
  "PingFang SC", "Microsoft YaHei", sans-serif;
```

### 2. 博客插件负责博客数据与路由

`withBlog()` 包装 VitePress 配置，并与 `markdown.config`、`transformHead`、`transformPageData`、`buildEnd` 和 Vite 插件组合。我们不重新实现其中任何一项。生成的博客列表是普通 Markdown/HTML，因此 `blog.css` 只重映射其公开的 `--vp-blog-*` 变量，并为文档化的 `vp-blog-*` 类名换肤。

### 3. 首页是同一份 frontmatter 的另一条数据路径

`docs/index.md` 使用 `layout: m3e-home`，`Layout.vue` 切换到 `layouts/M3EHome.vue`。其中 `data/homePosts.data.ts` 调用：

```ts
createContentLoader("blog/**/*.md", { transform });
```

它会规范化 `title`、`date`、`summary`、`image`、`author`、`tags`、`category` 和 `pinned`，字段名与插件读取的一致。作者 key 在渲染时由 `PostCard` 通过 `m3e.authors` 解析，因此首页文章流和插件卡片都会显示配置中的作者名。首页使用的图片应写成 public 路径（`/covers/foo.svg`）或绝对 URL：插件可以复制相对路径的 frontmatter 图片，但自定义 loader 在构建时无法得知 Vite 生成的哈希文件名。

### 4. 直接复用默认导航栏

自定义首页仍然需要真实的 VitePress 导航栏，包括移动端全屏菜单、溢出菜单、搜索和外观切换。`Layout.vue` 复用内部的 `VPNav` 组件，其他页面使用完整的默认 `DefaultTheme.Layout`。没有重写任何导航逻辑。CSS 只映射导航栏的表面色、高度、背景模糊变量，并调整视觉状态。

**风险 / 假设：** 引入 `vitepress/dist/client/theme-default/components/VPNav.vue` 属于内部路径。VitePress 版本在 `package.json` 中固定；升级 VitePress 时需要重新检查该引入。

### 5. 许可证卡片使用 `doc-after`，而不是 `doc-footer-before`

原计划使用 `doc-footer-before`，但 VitePress 会把该插槽包在 `VPDocFooter` 里，而 `VPDocFooter` **只有**在存在 `editLink`、`lastUpdated` 或 VitePress 上一篇/下一篇时才会渲染。博客插件用自己的 `.vp-blog-post-nav` 替换了 VitePress 的上一篇/下一篇，因此文章页上的页脚（以及其中的许可证插槽）会消失。这一结论已对照已安装的 VitePress 源码验证。

因此许可证卡片通过无条件渲染的 `doc-after` 插槽注入。它仍然位于每篇文章底部、插件的新旧文章导航之后。这是对最初方案的刻意调整，并不表示插件提供了新的插槽。

### 6. 关于页是普通文档页，不是文章

`about.md` 没有 `blog:` 字段。它使用文档布局，设置 `aside: false` / `outline: false`，渲染 `ProfileCard` 和独立的 `SocialLinks` 行，永远不会出现在 feed 或生成的博客列表中。

### 7. RSS、OG 和 Twitter 由插件负责

博客页和文章页会获得每博客一份的 RSS feed（`/blog/feed.xml`）、`<link rel="alternate">`、Open Graph 和 Twitter 卡片标签。不存在第二套 feed 实现。

## Material 3 Expressive 说明

- 配色：种子色 `#6750A4`（Material 蓝紫色），由 Material Color Utilities 通过 `verve-tokens` 生成，使用 **Tonal Spot** 方案。它比早期的 expressive 方案彩度更低；secondary/tertiary 角色是柔和的紫色/粉色，而不是绿色。
- 所有组件颜色使用 `--md-sys-color-*`；圆角使用 `--md-sys-shape-corner-*`；间距使用生成的 `--md-sys-spacing-*` 比例（`space100 = 8dp`，并包含 2/4/6/10 与 12/20 的嵌套步进）。
- 动效使用 `--md-sys-motion-*` token。形状变形使用 **effects** 弹簧（`damping 1.0`，无回弹），因为圆角插值低于零时会被钳制成直角；空间弹簧仍用于 transform。别名为 `--m3e-shape-morph-duration` / `--m3e-shape-morph-easing`。
- 卡片基础圆角为 12dp（`medium`），首页特色卡片使用 expressive 的 20dp；按钮触控目标为 40/48/56px，默认全圆角，按下时变为 8/12/16dp。
- 图标使用 Material Symbols（outlined），通过 `material-symbols` 自托管。
- 生成的 `tokens.css` 会提交到仓库。`pnpm theme` 会重新生成它。`verve-tokens@0.1.0` 依赖的 Material Color Utilities ESM 构建使用了无扩展名 import，因此生成脚本通过 `tsx` 运行（Node 原生 ESM loader 会拒绝这种写法）。

## 添加或编辑文章

创建 `docs/blog/my-post.md`：

```yaml
---
title: My post
description: 显示在文档 head 中，并作为 summary 的兜底值。
blog:
  date: 2026-11-01 10:00
  summary: 用于卡片、feed 和社交卡片的一两句话。
  image: /covers/my-cover.svg # public 路径或绝对 URL
  imageAlt: 封面描述
  author: meng # m3e.authors 中的 key，也可以是显示名称/对象
  tags: [VitePress, Design]
  category: Engineering
  scope: site # 同时出现在主博客列表
  pinned: false
  cover: false # 在作者信息下方显示封面
license: CC-BY-4.0
---
```

首页会自动收录。插件列表也会自动收录。只有当 `license` 是 `LicenseCard.vue` 中映射的 key（或任意自定义字符串并附带 `licenseUrl`）时，许可证卡片才会显示。

## 自定义

### 站点内容配置

所有**自定义**站点内容都放在 `.vitepress/config.ts` 的 `m3eConfig` 对象中。它的类型是 `DeepPartial<M3EConfig>`，因此只需覆盖需要的字段；`resolveM3EConfig()` 会把它与 `.vitepress/theme/config/defaults.ts` 中的默认值深度合并。VitePress 已经拥有的值（标题、描述、站点 URL、logo、导航、社交链接）不在这里重复。

```ts
const m3eConfig = {
  profile: {
    name: "Meng",
    handle: "M33E",
    avatar: "/avatar.svg",
    skills: ["VitePress", "Vue"],
    cta: { label: "认识我", href: "/about" },
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: "code", // 关于页/页脚使用 Material Symbols
      navIcon: "github", // 可选：导航栏使用 Simple Icons
    },
  ],
  home: {
    hero: {
      eyebrow: "M33E · NOTES ON CRAFT",
      titleLead: "把想法写成",
      titleAccent: "可以运行的东西",
      titleTail: "。",
      description: "前端工程、设计系统与 Material 3 Expressive。",
      actions: [...],
      stats: [
        { icon: "edit_note", value: "{postCount}", label: "篇公开笔记" },
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
    latest: { limit: 7, ... },
    about: { ... },
  },
  footer: {
    since: 2024,
    icp: "",
    links: [...],
  },
  oneLiner: {
    source: "/one-liners.json",
    fallback: { text: "慢慢来，比较快。", from: "M33E" },
  },
} satisfies DeepPartial<M3EConfig>;
```

- `profile`：头像、名称、身份、简介、技能和紧凑卡片 CTA
- `socials`：关于页和页脚数据；同时生成导航栏使用的 `themeConfig.socialLinks`
- `authors`：供博客插件和首页卡片作者解析使用
- `home.hero`：文案、CTA 按钮和右侧三个卡片。`{postCount}` 会在运行时替换
- `home.latest`：eyebrow、标题、文章数量、操作按钮、空状态
- `home.about`：eyebrow、标题、正文、操作按钮
- `footer`：起始年份、ICP、链接、社交标签、built-with 文案和版权后缀
- `oneLiner`：本地文件路径、标签和离线兜底

#### 已有 VitePress 配置时优先使用 VitePress

以下值有意**不**在 `m3eConfig` 中重复：

| 值                         | VitePress 来源                                    |
| -------------------------- | ------------------------------------------------- |
| 站点标题 / 描述            | `title`、`description`                            |
| 站点 URL                   | `sitemap.hostname`（同一个值会传给博客插件）      |
| 页脚品牌名 / 描述          | `site.title`、`site.description`                  |
| 页脚 Logo                  | `themeConfig.logo`                                |
| 导航栏链接                 | `themeConfig.nav`                                 |
| 导航栏社交图标             | 由 `m3e.socials` 派生到 `themeConfig.socialLinks` |
| 目录、搜索、外观、文档页脚 | 原生 `themeConfig` 选项                           |

保留完整的 `socials` 数组，是因为 VitePress 的 `socialLinks` 只支持 `icon` / `link` / `ariaLabel`；关于页和页脚还需要显示名称、handle 和 Material Symbols 图标。`themeConfig.socialLinks` 由它生成，因此导航栏数据没有被配置两次。

### 颜色

修改 `scripts/generate-theme.mjs` 中的 `seed` 或 `variant`（当前为 `tonalSpot`），然后执行：

```bash
pnpm theme
```

生成的 `tokens.css` 同时包含亮色和暗色 M3 角色，以及 M3 间距比例。无需编辑任何组件文件。可以先用 [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) 预览种子色效果。

### 代码块

`.vitepress/config.ts` 中把 `markdown.theme` 设为 Shiki 的 `catppuccin-mocha`。代码块外框的官方 Mocha 颜色值以 `--m3e-code-*` 的形式放在 `theme.css` 中（这是唯一的非 M3 颜色常量，因为语法主题是外部调色板）。

### GFM alerts

`markdown-it-github-alerts` 已启用，使用中文标题和 Material Symbols 图标：

```md
> [!NOTE]
> 需要记住的信息。

> [!TIP]
> 有用的建议。

> [!WARNING]
> 有风险的操作。

> [!CAUTION]
> 破坏性操作。
```

VitePress 的 `::: tip` / `::: warning` / `::: danger` / `::: details` 容器使用同一套 callout 样式。warning/caution 映射到 M3 的 error 配色，因为 M3 没有专门的 warning 角色。

### 内容宽度

文档布局使用比 VitePress 默认更窄的边距和更宽的正文列：

- `--m3e-doc-container-max: 76rem`
- `--m3e-doc-content-max: 56rem`
- 桌面端行内 padding：24px；移动端：20px

如果希望阅读宽度更宽或更窄，在 `.vitepress/theme/styles/theme.css` 中修改这些变量。表格和代码块在窄屏上横向滚动，而不是撑宽页面。

### 字体

Fontsource 的引入位于 `.vitepress/theme/index.ts`。更新引入语句以及 `styles/theme.css` 中的 `--vp-font-family-base` / `--vp-font-family-mono` 字体栈。保持使用 `vitepress/theme-without-fonts`，确保 Inter 永远不会被打包。

### 首页

- Hero 文案、两个 CTA 按钮和右侧三个卡片：`.vitepress/config.ts` 中的 `m3eConfig.home.hero`
- 文章数量：`m3eConfig.home.latest.limit`
- Latest/About 区块标题和操作按钮：`m3eConfig.home.latest` / `m3eConfig.home.about`
- About 简介：`<ProfileCard compact />`，数据来自 `m3eConfig.profile`
- 一言数据：`m3eConfig.oneLiner.source`，默认 `docs/public/one-liners.json`；组件会请求这个本地文件，并保留内置兜底。没有外部 quote API。

### 一言

编辑 `docs/public/one-liners.json`：

```json
{
  "quotes": [
    {
      "text": "慢慢来，比较快。",
      "from": "M33E"
    }
  ]
}
```

`OneLiner.vue` 通过 `withBase()` 请求 `m3eConfig.oneLiner.source`，随机选择一条，并在点击刷新按钮时避免重复当前内容。如果文件缺失，配置的兜底文案会一直显示。不会请求任何外部 API。

### 页脚：简单与复杂

当前实现的是复杂页脚 `SiteFooter`，通过 `Layout.vue` 的 `layout-bottom` 注入。若要改用 VitePress 的简单页脚：

1. 从 `Layout.vue` 中移除 `#layout-bottom` 下的 `<SiteFooter />`（以及 `M3EHome.vue` 中的 `<SiteFooter />`）。
2. 在 `themeConfig` 中添加：

```ts
footer: {
  message: 'Released under the MIT License.',
  copyright: 'Copyright © 2024–2026 M33E Blog'
}
```

不要同时启用两者，否则页面会显示两个页脚。

### 导航

桌面端导航和移动端导航都是默认主题。在 `themeConfig.nav` 中增删项目；溢出到 `⋯` 菜单、全屏汉堡菜单、搜索、外观和社交链接都由 VitePress 处理。`theme.css` 只修改表面色、高度、背景模糊、悬停/按下胶囊形状和移动端行形状。

### 博客列表与文章导航

只使用 CSS。编辑 `styles/blog.css`：

- 插件变量：`--vp-blog-card-*`、`--vp-blog-tag-*`、`--vp-blog-accent`
- 类名：`.vp-blog-list`、`.vp-blog-card`、`.vp-blog-browse`、`.vp-blog-byline`、`.vp-blog-post-nav`

新旧文章组件的 DOM 由插件负责。可以重新设计视觉样式，但不能在不 fork 插件的情况下用 Vue 组件替换它。“全部文章”链接同样来自插件。

## 验证

```bash
pnpm build
pnpm verify
npm run build        # 同样可用；脚本内部调用 pnpm
pnpm preview --port 4173
```

`pnpm verify` 检查：

- 首页使用 `m3e-home`，渲染 hero/一言/PostCard/about 简介/页脚
- 默认导航栏/汉堡菜单存在
- 关于页不在 feed 中，也没有生成的博客列表
- 博客索引包含插件卡片、browse 面板和 RSS 链接
- 每个页面都链接主 feed
- 文章 head 包含 OG/Twitter 标签
- 文章包含作者信息 + 插件文章导航 + 许可证卡片
- MathJax 输出存在
- GitHub alerts 使用 Material Symbols 渲染，代码块使用 Catppuccin Mocha
- 一言由本地 `one-liners.json` 提供，没有 hitokoto 请求
- `/blog/feed.xml` 存在，并包含三篇文章
- CSS `@font-face` 声明了 Google Sans Flex Variable、Noto Sans SC Variable 和 Material Symbols，且**没有 Inter**
- 生成的 token 文件使用 Tonal Spot，并暴露间距比例

手动检查：

- 390px 视口：汉堡菜单打开全屏导航；Escape/关闭后焦点返回；三个导航项可见。
- 1440px：导航项保持在导航栏上；桌面导航栏有磨砂效果；hero 和文章网格没有横向溢出。
- 切换外观：`.dark` 会替换 M3 角色；`--md-sys-color-primary` 变为暗色方案的值。
- 打开 `/blog/markdown-and-math`：行内公式和块级公式正常渲染，构建输出和浏览器控制台没有 `Failed to resolve component: mjx-*` 警告。
- 打开 `/about`：Profile Card + 一行社交链接；没有博客卡片。

## 明确的非目标

- 不虚构插件 API 或插槽。
- 不声称插件的生成列表或新旧文章 DOM 可以被 Vue 组件替换。只做 CSS 换肤。
- 首页不调用插件列表组件；它通过 `createContentLoader` 读取同一份 frontmatter。
- 组件样式中没有硬编码颜色、圆角、间距或弹簧时长。调色板值只存在于生成的 token 文件中；间距使用 `--md-sys-spacing-*`。唯一的外部调色板常量是 Catppuccin Mocha 代码块颜色。插画 SVG 使用调色板值，因为外部 SVG 无法读取页面 CSS 变量。
- 不 fork `@binarynoir/vitepress-blog`。只有在必须结构性修改文章导航 DOM，或首页必须共享插件内部数据管线时，才值得 fork。
