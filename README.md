# M33E Blog

A VitePress 2 blog with a Material 3 Expressive visual layer, plugin-generated blog lists/RSS/SEO, and a custom home page that reads the same frontmatter through `createContentLoader`.

## Stack

- VitePress `2.0.0-alpha.21`, Vue 3, TypeScript, pnpm, Node 22+
- `@binarynoir/vitepress-blog` for post detection, blog index, filtering, bylines, post navigation, RSS, Open Graph / Twitter cards
- `verve-tokens` + Material Color Utilities for the M3 Expressive token layer (Tonal Spot colour scheme)
- Fontsource: Google Sans Flex Variable + Noto Sans SC Variable (no Inter)
- `material-symbols` for the Material icon font
- `markdown-it-mathjax3@4` (the range VitePress 2 peers with) for LaTeX
- `markdown-it-github-alerts` for `> [!WARNING]`-style GFM alerts
- Shiki `catppuccin-mocha` for code blocks
- GFM is provided by VitePress's default Markdown pipeline

## Use this repository as a GitHub template

This repo is designed to be copied, not consumed as a package. Each generated blog owns its content, theme and deployment workflow.

1. Push this repo to GitHub.
2. Open **Settings → General → Template repository** and enable it.
3. Create a new repo with **Use this template → Create a new repository**.
4. Clone the new repo and install:

   ```bash
   pnpm install
   ```

5. Change the site-level values near the top of `.vitepress/config.ts`:

   ```ts
   const siteUrl = "https://username.github.io";
   const siteTitle = "My Blog";
   const siteDescription = "My notes.";
   const base = process.env.VP_BASE || "/";
   ```

6. Edit `m3eConfig` for profile, socials, home cards, footer and one-liner.
7. Replace the example content in `docs/` and images in `docs/public/`; update `themeConfig.nav`.
8. Run:

   ```bash
   pnpm dev
   pnpm build
   pnpm verify
   ```

9. In **Settings → Pages**, set **Source** to **GitHub Actions**. The included `.github/workflows/deploy.yml` builds and deploys `.vitepress/dist`.

### GitHub Pages URL and base

The blog plugin joins `siteUrl + base + page path`, so use the origin in `siteUrl` and the repository path in `base`:

| Deployment | `siteUrl` | `base` / `VP_BASE` |
| --- | --- | --- |
| User site `username.github.io` | `https://username.github.io` | `/` (unset) |
| Project site `username.github.io/my-blog` | `https://username.github.io` | `/my-blog/` |
| Custom domain `blog.example.com` | `https://blog.example.com` | `/` (unset) |

For project sites, set a repository Actions variable named `VP_BASE` to `/my-blog/` (Settings → Secrets and variables → Actions → Variables). The workflow passes it to the build. Custom internal links and public images in custom components use `resolveHref()` / `resolveAsset()` in `.vitepress/theme/utils/url.ts`, so they follow the same base path.

### Template cleanup checklist

- Replace `docs/blog/*.md` example posts.
- Replace `docs/public/avatar.svg`, `favicon.svg`, `covers/` and `one-liners.json`.
- Update `docs/about.md` and the home content in `m3eConfig`.
- Change `package.json` name/description if desired.
- Add a license of your choice (the repo currently has none).
- Remove or keep the demo screenshots/assets as you prefer.

## File tree

```text
M33EBlog/
├─ docs/
│  ├─ index.md                         # layout: m3e-home
│  ├─ about.md                         # no `blog:` field — not a post
│  ├─ blog/
│  │  ├─ index.md                      # blog-index: { scope: site }
│  │  ├─ hello-m3e.md
│  │  ├─ markdown-and-math.md
│  │  └─ content-pipeline.md
│  └─ public/
│     ├─ avatar.svg
│     ├─ favicon.svg
│     ├─ one-liners.json               # local one-liner source
│     └─ covers/{m3e,math,rss}.svg
├─ .vitepress/
│  ├─ config.ts                        # withBlog + markdown + MathJax + nav
│  └─ theme/
│     ├─ index.ts                      # theme-without-fonts, fonts, icons, useBlog()
│     ├─ Layout.vue                    # m3e-home switch + LicenseCard/SiteFooter slots
│     ├─ layouts/M3EHome.vue           # hero + one-liner + post stream + about card
│     ├─ components/
│     │  ├─ M3Button.vue
│     │  ├─ PostCard.vue
│     │  ├─ ProfileCard.vue
│     │  ├─ SocialLinks.vue
│     │  ├─ OneLiner.vue
│     │  ├─ LicenseCard.vue
│     │  └─ SiteFooter.vue
│     ├─ composables/
│     │  └─ useM3EConfig.ts            # reads themeConfig.m3e + merges defaults
│     ├─ config/
│     │  └─ defaults.ts                # default content + deep merge
│     ├─ data/
│     │  └─ homePosts.data.ts          # createContentLoader('blog/**/*.md')
│     ├─ types/
│     │  ├─ post.ts
│     │  └─ site-config.ts             # M3EConfig + DeepPartial
│     ├─ utils/
│     │  ├─ date.ts
│     │  └─ url.ts                     # base-aware resolveHref/resolveAsset
│     └─ styles/
│        ├─ tokens.css                 # generated, do not edit
│        ├─ theme.css                  # M3 ↔ VitePress bridge, typography, nav
│        └─ blog.css                   # plugin CSS-variable/class skin
├─ .github/workflows/
│  └─ deploy.yml                       # GitHub Pages deployment
├─ scripts/
│  ├─ generate-theme.mjs               # seed #6750A4 → tokens.css
│  └─ verify.mjs                       # post-build smoke checks
├─ package.json
└─ pnpm-lock.yaml
```

## Architecture decisions

### 1. Extend the default theme, not replace it

`theme/index.ts` imports `vitepress/theme-without-fonts`. This is what keeps the default theme from bundling Inter. Fonts are self-hosted by Fontsource and assigned in `theme.css`:

```css
--vp-font-family-base:
  "Google Sans Flex Variable", "Noto Sans SC Variable", "Noto Sans SC",
  "PingFang SC", "Microsoft YaHei", sans-serif;
```

### 2. The blog plugin owns blog data and routing

`withBlog()` wraps VitePress config and composes with `markdown.config`, `transformHead`, `transformPageData`, `buildEnd` and the Vite plugin. We do not reimplement any of those. The generated blog list is plain Markdown/HTML, so `blog.css` only remaps its public `--vp-blog-*` variables and skins its documented `vp-blog-*` classes.

### 3. Home is a separate data path over the same frontmatter

`docs/index.md` uses `layout: m3e-home`. `Layout.vue` switches to `layouts/M3EHome.vue`. There, `data/homePosts.data.ts` calls:

```ts
createContentLoader("blog/**/*.md", { transform });
```

It normalises `title`, `date`, `summary`, `image`, `author`, `tags`, `category` and `pinned` — the same field names the plugin reads. Author keys are resolved against `m3e.authors` in `PostCard` at render time, so both the home feed and the plugin cards display the configured author name. Images used on the home page should be public paths (`/covers/foo.svg`) or absolute URLs: the plugin can copy relative frontmatter images, but a custom loader cannot know Vite's hashed asset name at build time.

### 4. Default navbar is reused as-is

The custom home must still have the real VitePress navbar, including its mobile screen, overflow menu, search and appearance switch. `Layout.vue` reuses the internal `VPNav` component and the whole default `DefaultTheme.Layout` for every other page. No navigation logic is rewritten. The CSS only maps navbar surface/height/backdrop variables and adjusts visual states.

**Risk / assumption:** importing `vitepress/dist/client/theme-default/components/VPNav.vue` is an internal path. The VitePress version is pinned in `package.json`; re-check this import when upgrading VitePress.

### 5. Licence card uses `doc-after`, not `doc-footer-before`

The intended slot was `doc-footer-before`, but VitePress wraps that slot in `VPDocFooter`, and `VPDocFooter` renders **only** when `editLink`, `lastUpdated` or VitePress prev/next exists. The blog plugin replaces VitePress prev/next with its own `.vp-blog-post-nav`, so the footer (and the licence slot inside it) disappears on posts. This was verified against the installed VitePress source.

The licence card is therefore injected through the unconditional `doc-after` slot. It still sits at the bottom of every post, after the plugin's newer/older navigation. This is a deliberate deviation from the initial plan, not a claim that the plugin exposes a new slot.

### 6. About is a normal doc page, not a post

`about.md` has no `blog:` key. It uses the doc layout with `aside: false` / `outline: false`, renders `ProfileCard` and a dedicated `SocialLinks` row, and never appears in the feed or generated blog list.

### 7. RSS, OG and Twitter are plugin-owned

The blog page and posts get a per-blog RSS feed (`/blog/feed.xml`), `<link rel="alternate">`, Open Graph and Twitter card tags from the plugin. No second feed implementation exists.

## Material 3 Expressive notes

- Palette: seed `#6750A4` (Material blue-purple), generated by Material Color Utilities via `verve-tokens`, using the **Tonal Spot** scheme. It is lower-chroma than the earlier expressive scheme; secondary/tertiary roles are muted purple/pink, not green.
- All component colours use `--md-sys-color-*`; radii use `--md-sys-shape-corner-*`; spacing uses the generated `--md-sys-spacing-*` scale (`space100 = 8dp`, plus nested 2/4/6/10 and 12/20 steps).
- Motion uses `--md-sys-motion-*` tokens. Shape morphs use the **effects** spring (`damping 1.0`, no overshoot) because radius interpolation below zero is clamped to a square corner; spatial springs remain on transforms. The aliases are `--m3e-shape-morph-duration` / `--m3e-shape-morph-easing`.
- Cards use a 12dp base radius (`medium`), expressive 20dp for the featured home card; button targets are 40/48/56px with a full-round resting shape and an 8/12/16dp pressed shape.
- Icons are Material Symbols (outlined), self-hosted through `material-symbols`.
- The generated `tokens.css` is committed. `pnpm theme` regenerates it. `verve-tokens@0.1.0` pulls a Material Color Utilities ESM build with extensionless imports, so generation runs through `tsx` (Node's native ESM loader rejects it).

## Add or edit a post

Create `docs/blog/my-post.md`:

```yaml
---
title: My post
description: Shown in the document head and used as the summary fallback.
blog:
  date: 2026-11-01 10:00
  summary: One or two sentences for cards, feeds and social cards.
  image: /covers/my-cover.svg # public path or absolute URL
  imageAlt: Description of the cover
  author: meng # key from m3e.authors, or a display name/object
  tags: [VitePress, Design]
  category: Engineering
  scope: site # also list on the main blog
  pinned: false
  cover: false # show the image below the byline
license: CC-BY-4.0
---
```

The homepage will pick it up automatically. The plugin list does the same. The licence card is shown only when `license` is one of the mapped keys in `LicenseCard.vue` (or any custom string with `licenseUrl`).

## Customisation

### Site content config

All **custom** site content lives in the `m3eConfig` object in `.vitepress/config.ts`. It is a `DeepPartial<M3EConfig>`, so you can override only the fields you need; `resolveM3EConfig()` deep-merges it with the defaults in `.vitepress/theme/config/defaults.ts`. Values that VitePress already owns (title, description, site URL, logo, nav, social links) are not duplicated here.

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
      icon: "code", // Material Symbols in about/footer
      navIcon: "github", // optional Simple Icons in the navbar
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
        { icon: "interests", value: "M3E", label: "Material 3 Expressive", tone: "tertiary" },
        { icon: "rss_feed", value: "RSS 已开启", label: "订阅全部文章", href: "/blog/feed.xml", tone: "surface" },
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

- `profile`: avatar, name, role, bio, skills and compact-card CTA
- `socials`: about page and footer data; also generates `themeConfig.socialLinks` for the navbar
- `authors`: available to the blog plugin and the home card author resolver
- `home.hero`: text, CTA buttons, and the three right-side cards. `{postCount}` is replaced at runtime
- `home.latest`: eyebrow, title, number of posts, action button, empty state
- `home.about`: eyebrow, title, body, action button
- `footer`: since, ICP, links, social label, built-with text and copyright suffix
- `oneLiner`: local file path, labels and offline fallback

#### Use VitePress config where it already exists

These values are intentionally **not** duplicated in `m3eConfig`:

| Value                                   | VitePress source                                                 |
| --------------------------------------- | ---------------------------------------------------------------- |
| Site title / description                | `title`, `description`                                           |
| Site URL                                | `sitemap.hostname` (the same value is passed to the blog plugin) |
| Footer brand name / description         | `site.title`, `site.description`                                 |
| Footer logo                             | `themeConfig.logo`                                               |
| Navbar links                            | `themeConfig.nav`                                                |
| Navbar social icons                     | derived from `m3e.socials` into `themeConfig.socialLinks`        |
| Outline, search, appearance, doc footer | native `themeConfig` options                                     |

The rich `socials` array is kept because VitePress's `socialLinks` only supports `icon` / `link` / `ariaLabel`; the about page and footer also need a display label, handle and Material Symbols icon. `themeConfig.socialLinks` is generated from it, so the navbar data is not configured twice.

### Colours

Change `seed` or `variant` in `scripts/generate-theme.mjs` (currently `tonalSpot`), then:

```bash
pnpm theme
```

The generated `tokens.css` contains both light and dark M3 roles plus the M3 spacing scale. No component file needs editing. Use the [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) to preview a seed first.

### Code blocks

`markdown.theme` is set to Shiki's `catppuccin-mocha` in `.vitepress/config.ts`. The official Mocha values for the block chrome live in `theme.css` as `--m3e-code-*` (the only non-M3 colour constants, because a syntax theme is an external palette).

### GFM alerts

`markdown-it-github-alerts` is enabled with Chinese titles and Material Symbols icons:

```md
> [!NOTE]
> Information to keep in mind.

> [!TIP]
> A helpful suggestion.

> [!WARNING]
> Something risky.

> [!CAUTION]
> A destructive action.
```

VitePress's `::: tip` / `::: warning` / `::: danger` / `::: details` containers use the same callout CSS. Warning/caution map to the M3 error pair because M3 has no dedicated warning role.

### Content width

The doc layout uses narrower gutters and a wider column than VitePress defaults:

- `--m3e-doc-container-max: 76rem`
- `--m3e-doc-content-max: 56rem`
- desktop inline padding: 24px; mobile: 20px

Edit these in `.vitepress/theme/styles/theme.css` if you want a wider or narrower reading measure. Tables and code blocks scroll horizontally on narrow screens instead of widening the page.

### Fonts

Fontsource imports live in `.vitepress/theme/index.ts`. Update the imports and the `--vp-font-family-base` / `--vp-font-family-mono` stacks in `styles/theme.css`. Keep `vitepress/theme-without-fonts` so Inter is never bundled.

### Homepage

- Hero copy, both CTA buttons and the three right-side cards: `m3eConfig.home.hero` in `.vitepress/config.ts`
- Number of posts: `m3eConfig.home.latest.limit`
- Latest/about section headings and actions: `m3eConfig.home.latest` / `m3eConfig.home.about`
- About teaser: `<ProfileCard compact />`, fed by `m3eConfig.profile`
- One-liner data: `m3eConfig.oneLiner.source`, default `docs/public/one-liners.json`; the component fetches this local file and keeps a built-in fallback. There is no external quote API.

### One-liner

Edit `docs/public/one-liners.json`:

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

`OneLiner.vue` fetches `m3eConfig.oneLiner.source` with `withBase()`, picks a random quote, and avoids repeating the current one when the refresh button is used. The configured fallback stays visible if the file is missing. No external API is contacted.

### Footer: simple vs complex

The implemented footer is the complex `SiteFooter` injected through `layout-bottom` in `Layout.vue`. To use VitePress's simple footer instead:

1. Remove the `#layout-bottom` `<SiteFooter />` from `Layout.vue` (and the `<SiteFooter />` inside `M3EHome.vue`).
2. Add to `themeConfig`:

```ts
footer: {
  message: 'Released under the MIT License.',
  copyright: 'Copyright © 2024–2026 M33E Blog'
}
```

Do not keep both enabled or the page will show two footers.

### Navigation

The desktop nav/mobile nav are the default theme. Add/remove items in `themeConfig.nav`; overflow into the `⋯` menu, the hamburger screen, search, appearance and social links are all handled by VitePress. `theme.css` only changes surface, height, backdrop filter, hover/active pills and mobile row shapes.

### Blog list and post navigation

Only CSS is used. Edit `styles/blog.css`:

- plugin variables: `--vp-blog-card-*`, `--vp-blog-tag-*`, `--vp-blog-accent`
- classes: `.vp-blog-list`, `.vp-blog-card`, `.vp-blog-browse`, `.vp-blog-byline`, `.vp-blog-post-nav`

The newer/older widget's DOM is plugin-owned. It can be visually restyled, not replaced by a Vue component without forking the plugin. The "all posts" link comes from the plugin too.

## Verification

```bash
pnpm build
pnpm verify
npm run build        # also works; the scripts call pnpm
pnpm preview --port 4173
```

`pnpm verify` checks:

- home uses `m3e-home`, renders hero/one-liner/PostCard/about teaser/footer
- default navbar/hamburger is present
- about page is not in the feed and has no generated blog list
- blog index contains plugin cards, browse panel and RSS link
- every page links the main feed
- post head has OG/Twitter tags
- post has byline + plugin post nav + licence card
- MathJax output exists
- GitHub alerts render with Material Symbols and Catppuccin Mocha code blocks are present
- the one-liner is served by the local `one-liners.json` file, with no hitokoto request
- `/blog/feed.xml` exists with the three posts
- CSS `@font-face` declares Google Sans Flex Variable, Noto Sans SC Variable and Material Symbols, and **no Inter**
- the generated token file uses Tonal Spot and exposes the spacing scale

Manual checks:

- 390px viewport: hamburger opens the full-screen nav; Escape/close returns focus; the three nav items are visible.
- 1440px: nav items stay on the bar; the desktop navbar is frosted; no horizontal overflow in the hero or post grid.
- Toggle appearance: `.dark` swaps the M3 roles; `--md-sys-color-primary` becomes the dark-scheme value.
- Open `/blog/markdown-and-math`: inline and display formulas render, with no `Failed to resolve component: mjx-*` warning in the build output or browser console.
- Open `/about`: profile card + one social row; no blog cards.

## Explicit non-goals

- No invented plugin APIs or slots.
- No claim that the plugin's generated list or newer/older DOM can be replaced by a Vue component. It is CSS-skinned only.
- The home page does not call a plugin list component; it reads the same frontmatter with `createContentLoader`.
- No hard-coded colours, radii, spacing or spring durations in component styles. Palette values live only in the generated token file; spacing uses `--md-sys-spacing-*`. The only external palette constants are the Catppuccin Mocha code-block values. Artwork SVGs use palette values because external SVG cannot read page CSS variables.
- No Fork of `@binarynoir/vitepress-blog`. A fork is only warranted if the post-nav DOM must change structurally or the home must share the plugin's internal data pipeline.
