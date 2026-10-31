import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, ".vitepress/dist");
let failed = 0;

function check(label, condition) {
  if (condition) {
    console.log(`  ✓ ${label}`);
  } else {
    console.error(`  ✗ ${label}`);
    failed += 1;
  }
}

function read(relative) {
  return readFileSync(join(dist, relative), "utf8");
}

function head(html) {
  return html.slice(0, html.indexOf("</head>"));
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

console.log("M33E Blog smoke checks");

const home = read("index.html");
const about = read("about.html");
const blog = read("blog/index.html");
const post = read("blog/hello-m3e.html");
const math = read("blog/markdown-and-math.html");
const feed = read("blog/feed.xml");
const oneLiners = JSON.parse(read("one-liners.json"));
const tokens = readFileSync(
  join(root, ".vitepress/theme/styles/tokens.css"),
  "utf8",
);
const cssSource = walk(join(root, ".vitepress/theme"))
  .filter((file) => /\.(vue|css)$/.test(file) && !file.endsWith("tokens.css"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

check("home uses the custom m3e-home layout", home.includes("M3EHomeLayout"));
check(
  "home renders the hero + one-liner",
  home.includes("hero__title") && home.includes("one-liner"),
);
check(
  "home derives posts from frontmatter (PostCard)",
  home.includes("post-card"),
);
check(
  "home displays the frontmatter author name (Meng)",
  home.includes("Meng"),
);
check(
  "home renders the configured stat cards",
  ["篇公开笔记", "Material 3 Expressive", "RSS 已开启"].every((label) =>
    home.includes(label),
  ),
);
check("home has the about teaser", home.includes("profile-card is-compact"));
check("home has the complex footer", home.includes("site-footer"));
check(
  "navbar is the default VitePress nav (hamburger present)",
  home.includes("VPNavBarHamburger"),
);
check(
  "navbar has three nav items",
  (home.match(/VPNavBarMenuLink/g) ?? []).length >= 3,
);

check("about page has a profile card", about.includes("profile-card"));
check(
  "about page has an independent social row",
  about.includes("social-link"),
);
check(
  "about page is not a blog listing",
  !about.includes("vp-blog-list") && !about.includes("vp-blog-card"),
);
check("about page is absent from the feed", !feed.includes("/about"));

check(
  "blog index uses generated plugin cards",
  blog.includes("vp-blog-list") && blog.includes("vp-blog-card"),
);
check("blog index has the browse panel", blog.includes("vp-blog-browse"));
check("blog index has an RSS link", blog.includes("/blog/feed.xml"));

check(
  "every page links the main feed",
  ["index.html", "about.html", "blog/index.html", "blog/hello-m3e.html"].every(
    (file) => head(read(file)).includes('rel="alternate"'),
  ),
);
check(
  "post head has Open Graph tags",
  head(post).includes("og:title") && head(post).includes("og:image"),
);
check("post head has a Twitter card", head(post).includes("twitter:card"));
check(
  "post has plugin byline + newer/older nav",
  post.includes("vp-blog-byline") && post.includes("vp-blog-post-nav"),
);
check(
  "post renders the M3E licence card",
  post.includes("license-card") && post.includes("CC BY 4.0"),
);
check("math post contains MathJax output", math.includes("mjx-container"));
check(
  "markdown tables use the responsive wrapper",
  math.includes('class="m3e-table-wrapper"'),
);
check(
  "GitHub alerts render with Material icons",
  [
    "markdown-alert-note",
    "markdown-alert-tip",
    "markdown-alert-warning",
    "markdown-alert-caution",
  ].every((name) => math.includes(name)) &&
    math.includes("markdown-alert-title"),
);
check(
  "VitePress custom containers share the callout styling",
  math.includes('class="tip custom-block"'),
);
check(
  "code blocks use Catppuccin Mocha",
  math.includes("catppuccin-mocha") && math.includes("#1e1e2e"),
);
check(
  "generated tokens use the Tonal Spot scheme",
  tokens.includes("color variant: tonalSpot"),
);
check(
  "generated tokens expose the M3 spacing scale",
  tokens.includes("--md-sys-spacing-100: 8px"),
);
check(
  "shape morphs avoid overshooting radius easing",
  cssSource.includes("--m3e-shape-morph-easing") &&
    !cssSource.includes(
      "border-radius var(--md-sys-motion-spring-expressive-spatial",
    ),
);
check(
  "subscribe dialog spacing is token-based",
  cssSource.includes("dialog.vp-blog-subscribe .vp-blog-subscribe__hint") &&
    cssSource.includes("dialog.vp-blog-subscribe .vp-blog-subscribe__links"),
);
check(
  "outline curtain does not paint over the footer",
  cssSource.includes(".VPDoc .aside-curtain"),
);
check(
  "page scrolling does not re-trigger the outline marker",
  cssSource.includes("scroll-behavior: auto"),
);

const jsFiles = walk(join(dist, "assets")).filter((file) =>
  file.endsWith(".js"),
);
const clientJs = jsFiles.map((file) => readFileSync(file, "utf8")).join("\n");
check(
  "one-liner data is local",
  Array.isArray(oneLiners.quotes) && oneLiners.quotes.length > 0,
);
check("no external hitokoto API remains", !clientJs.includes("hitokoto"));

check("a per-blog RSS feed exists", existsSync(join(dist, "blog/feed.xml")));
check(
  "feed contains the three public posts",
  (feed.match(/<item>/g) ?? []).length === 3,
);

const cssFiles = walk(join(dist, "assets")).filter((file) =>
  file.endsWith(".css"),
);
const css = cssFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const fontFaces = [
  ...css.matchAll(/@font-face\s*\{[^}]*font-family:\s*([^;}]+)/g),
].map((match) => match[1].trim());
check(
  "does not declare Inter in @font-face",
  !fontFaces.some((face) => /Inter/i.test(face)),
);
check(
  "declares Google Sans Flex Variable",
  fontFaces.some((face) => face.includes("Google Sans Flex Variable")),
);
check(
  "declares Noto Sans SC Variable",
  fontFaces.some((face) => face.includes("Noto Sans SC Variable")),
);
check(
  "uses the Material Symbols icon font",
  fontFaces.some((face) => face.includes("Material Symbols")),
);

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}

console.log("\nAll checks passed.");
