<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

interface LicenseInfo {
  name: string;
  short: string;
  url: string;
  icon: string;
}

const licenses: Record<string, LicenseInfo> = {
  "CC-BY-4.0": {
    name: "Creative Commons Attribution 4.0 International",
    short: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
    icon: "copyright",
  },
  "CC-BY-SA-4.0": {
    name: "Creative Commons Attribution-ShareAlike 4.0 International",
    short: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
    icon: "copyright",
  },
  "CC-BY-NC-4.0": {
    name: "Creative Commons Attribution-NonCommercial 4.0 International",
    short: "CC BY-NC 4.0",
    url: "https://creativecommons.org/licenses/by-nc/4.0/",
    icon: "copyright",
  },
  "CC0-1.0": {
    name: "Creative Commons Zero 1.0 Universal",
    short: "CC0 1.0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
    icon: "public",
  },
  MIT: {
    name: "MIT License",
    short: "MIT",
    url: "https://opensource.org/license/mit",
    icon: "code",
  },
  "All-Rights-Reserved": {
    name: "All rights reserved",
    short: "保留所有权利",
    url: "",
    icon: "lock",
  },
};

const { frontmatter } = useData();

const licenseKey = computed(() => {
  const value = frontmatter.value.license;
  return typeof value === "string" ? value.trim() : "";
});

const info = computed<LicenseInfo | null>(() => {
  if (!licenseKey.value) return null;
  const known = licenses[licenseKey.value];
  if (known) {
    const customUrl = frontmatter.value.licenseUrl;
    return typeof customUrl === "string" ? { ...known, url: customUrl } : known;
  }
  return {
    name: licenseKey.value,
    short: licenseKey.value,
    url:
      typeof frontmatter.value.licenseUrl === "string"
        ? frontmatter.value.licenseUrl
        : "",
    icon: "description",
  };
});
</script>

<template>
  <aside v-if="info" class="license-card" aria-labelledby="license-card-title">
    <span
      class="license-card__icon material-symbols-outlined"
      aria-hidden="true"
    >
      {{ info.icon }}
    </span>

    <div class="license-card__body">
      <p id="license-card-title" class="license-card__eyebrow">许可协议</p>
      <p class="license-card__title">{{ info.short }}</p>
      <p class="license-card__name">{{ info.name }}</p>
    </div>

    <a
      v-if="info.url"
      class="license-card__link"
      :href="info.url"
      target="_blank"
      rel="license noreferrer noopener"
      :aria-label="`查看 ${info.short} 协议全文`"
    >
      <span>查看协议</span>
      <span class="material-symbols-outlined" aria-hidden="true"
        >arrow_outward</span
      >
    </a>
  </aside>
</template>

<style scoped>
.license-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--md-sys-spacing-200);
  margin-block: var(--md-sys-spacing-400) var(--md-sys-spacing-100);
  padding: var(--md-sys-spacing-250);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-sys-shape-corner-large);
  background:
    linear-gradient(
      135deg,
      color-mix(
        in srgb,
        var(--md-sys-color-primary-container) 42%,
        transparent
      ),
      transparent 72%
    ),
    var(--md-sys-color-surface-container-low);
}

.license-card__icon {
  display: grid;
  place-items: center;
  inline-size: 48px;
  block-size: 48px;
  border-radius: var(--md-sys-shape-corner-medium);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-size: 24px;
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

.license-card__body {
  min-inline-size: 0;
}

.license-card__eyebrow {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-label-medium-weight);
  letter-spacing: var(--md-sys-typescale-label-medium-tracking);
}

.license-card__title {
  margin: var(--md-sys-spacing-25) 0 0;
  color: var(--md-sys-color-on-surface);
  font-size: var(--md-sys-typescale-title-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-title-medium-weight);
  line-height: var(--md-sys-typescale-title-medium-line-height);
}

.license-card__name {
  margin: var(--md-sys-spacing-25) 0 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-small-size);
  line-height: var(--md-sys-typescale-body-small-line-height);
}

.license-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-50);
  min-block-size: 40px;
  padding-inline: var(--md-sys-spacing-150);
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-primary);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-label-large-weight);
  text-decoration: none;
  transition:
    background-color
      var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    border-radius var(--m3e-shape-morph-duration) var(--m3e-shape-morph-easing);
}

.license-card__link .material-symbols-outlined {
  font-size: 18px;
}

.license-card__link:hover {
  border-radius: var(--md-sys-shape-corner-small);
  background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
}

.license-card__link:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

@media (max-width: 560px) {
  .license-card {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .license-card__link {
    grid-column: 1 / -1;
    justify-self: start;
    padding-inline: 0;
  }
}
</style>
