import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import { useBlog } from "@binarynoir/vitepress-blog/client";

// Self-hosted fonts (Fontsource). No Inter is imported anywhere.
// import "@fontsource-variable/google-sans-flex"; // Use custom CSS import instead for more axises
import "@fontsource-variable/noto-sans-sc";

// Material Symbols (outlined) — the Material icon library.
import "material-symbols/outlined.css";

// Plugin base styles first; our M3E skin overrides its CSS variables and classes.
import "@binarynoir/vitepress-blog/style.css";
import "./styles/tokens.css";
import "./styles/theme.css";
import "./styles/blog.css";

import Layout from "./Layout.vue";
import LicenseCard from "./components/LicenseCard.vue";
import M3Button from "./components/M3Button.vue";
import OneLiner from "./components/OneLiner.vue";
import PostCard from "./components/PostCard.vue";
import ProfileCard from "./components/ProfileCard.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SocialLinks from "./components/SocialLinks.vue";

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

export default {
  extends: DefaultTheme,
  Layout,
  setup() {
    // Client-side ?page=, ?category=, ?tag=, ?year= and ?month= filtering,
    // plus the feed subscribe dialog, for plugin-generated blog pages.
    useBlog();
  },
  enhanceApp({ app }) {
    app.component("M3Button", M3Button);
    app.component("PostCard", PostCard);
    app.component("ProfileCard", ProfileCard);
    app.component("SocialLinks", SocialLinks);
    app.component("LicenseCard", LicenseCard);
    app.component("SiteFooter", SiteFooter);
    app.component("OneLiner", OneLiner);

    // Belt and braces for any MathJax element emitted at runtime.
    app.config.compilerOptions.isCustomElement = isMathElement;
  },
} satisfies Theme;
