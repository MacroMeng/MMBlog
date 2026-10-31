import { withBase } from "vitepress";

const EXTERNAL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

/** Prefix internal paths with VitePress's configured base. */
export function resolveHref(href: string) {
  if (!href || EXTERNAL.test(href)) return href;
  return withBase(href);
}

/** Same as resolveHref, for public assets used in custom components. */
export function resolveAsset(src: string) {
  if (!src || EXTERNAL.test(src)) return src;
  return withBase(src);
}
