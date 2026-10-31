<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { useM3EConfig } from "../composables/useM3EConfig";
import { resolveHref } from "../utils/url";
import SocialLinks from "./SocialLinks.vue";

const config = useM3EConfig();
const { site, theme } = useData();

const brandName = computed(() => theme.value.siteTitle || site.value.title);
const brandDescription = computed(() => site.value.description);
const brandLogo = computed(() => {
  const logo = theme.value.logo;
  if (typeof logo === "string") return withBase(logo);
  if (logo && typeof logo === "object") {
    return withBase(logo.light ?? logo.dark ?? "");
  }
  return "";
});

const year = new Date().getFullYear();
const copyright = computed(() =>
  year > config.value.footer.since
    ? `${config.value.footer.since}–${year} ${brandName.value}`
    : `${config.value.footer.since} ${brandName.value}`,
);
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <a
          class="site-footer__logo"
          :href="resolveHref('/')"
          aria-label="返回首页"
        >
          <img
            v-if="brandLogo"
            class="site-footer__logo-image"
            :src="brandLogo"
            alt=""
            width="32"
            height="32"
          />
          <span v-else class="material-symbols-outlined" aria-hidden="true">
            deployed_code
          </span>
          <span>{{ brandName }}</span>
        </a>
        <p class="site-footer__description">{{ brandDescription }}</p>
      </div>

      <nav class="site-footer__links" aria-label="页脚导航">
        <a
          v-for="link in config.footer.links"
          :key="link.href"
          :href="resolveHref(link.href)"
        >
          {{ link.label }}
        </a>
      </nav>

      <SocialLinks compact :label="config.footer.socialsLabel" />
    </div>

    <div class="site-footer__bottom">
      <p>© {{ copyright }} · {{ config.footer.copyrightSuffix }}</p>
      <p v-if="config.footer.icp" class="site-footer__icp">
        {{ config.footer.icp }}
      </p>
      <p class="site-footer__built">{{ config.footer.builtWith }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-block-start: var(--md-sys-spacing-900);
  border-block-start: 1px solid var(--md-sys-color-outline-variant);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface-variant);
}

.site-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: start;
  gap: var(--md-sys-spacing-400);
  max-inline-size: 1152px;
  margin-inline: auto;
  padding: var(--md-sys-spacing-500) var(--md-sys-spacing-300)
    var(--md-sys-spacing-300);
}

.site-footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-100);
}

.site-footer__logo {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-100);
  align-self: start;
  color: var(--md-sys-color-on-surface);
  font-size: var(--md-sys-typescale-title-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-title-medium-weight);
  text-decoration: none;
}

.site-footer__logo .material-symbols-outlined,
.site-footer__logo-image {
  display: grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--md-sys-shape-corner-small);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-size: 20px;
  font-variation-settings:
    "FILL" 1,
    "wght" 500,
    "GRAD" 0,
    "opsz" 20;
}

.site-footer__logo-image {
  object-fit: cover;
}

.site-footer__description {
  max-inline-size: 36ch;
  margin: 0;
  font-size: var(--md-sys-typescale-body-small-size);
  line-height: var(--md-sys-typescale-body-small-line-height);
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-50) var(--md-sys-spacing-250);
  padding-block-start: var(--md-sys-spacing-50);
}

.site-footer__links a {
  position: relative;
  padding-block: var(--md-sys-spacing-100);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-label-large-weight);
  text-decoration: none;
}

.site-footer__links a::after {
  position: absolute;
  inset-inline: 0;
  inset-block-end: 4px;
  block-size: 2px;
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-primary);
  content: "";
  opacity: 0;
  transform: scaleX(0.4);
  transition:
    opacity var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    transform var(--md-sys-motion-spring-expressive-spatial-fast-duration)
      var(--md-sys-motion-spring-expressive-spatial-fast-easing);
}

.site-footer__links a:hover {
  color: var(--md-sys-color-primary);
}

.site-footer__links a:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.site-footer__links a:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
  border-radius: var(--md-sys-shape-corner-extra-small);
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-100) var(--md-sys-spacing-300);
  align-items: center;
  max-inline-size: 1152px;
  margin-inline: auto;
  padding: var(--md-sys-spacing-200) var(--md-sys-spacing-300)
    var(--md-sys-spacing-400);
  border-block-start: 1px solid
    color-mix(in srgb, var(--md-sys-color-outline-variant) 64%, transparent);
  font-size: var(--md-sys-typescale-body-small-size);
  line-height: var(--md-sys-typescale-body-small-line-height);
}

.site-footer__bottom p {
  margin: 0;
}

.site-footer__built {
  margin-inline-start: auto;
}

@media (max-width: 900px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: var(--md-sys-spacing-250);
  }
}

@media (max-width: 560px) {
  .site-footer {
    margin-block-start: var(--md-sys-spacing-700);
  }

  .site-footer__inner {
    padding: var(--md-sys-spacing-400) var(--md-sys-spacing-250)
      var(--md-sys-spacing-200);
  }

  .site-footer__bottom {
    padding: var(--md-sys-spacing-200) var(--md-sys-spacing-250)
      var(--md-sys-spacing-300);
  }

  .site-footer__built {
    margin-inline-start: 0;
  }
}
</style>
