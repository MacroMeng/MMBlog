<script setup lang="ts">
import { useM3EConfig } from "../composables/useM3EConfig";
import { resolveHref } from "../utils/url";

withDefaults(
  defineProps<{
    compact?: boolean;
    label?: string;
  }>(),
  { compact: false, label: "社交链接" },
);

const config = useM3EConfig();
const isExternal = (href: string) => /^https?:\/\//.test(href);
</script>

<template>
  <nav
    v-if="config.socials.length"
    class="social-links"
    :class="{ 'is-compact': compact }"
    :aria-label="label"
  >
    <a
      v-for="link in config.socials"
      :key="link.label"
      class="social-link"
      :href="resolveHref(link.href)"
      :target="isExternal(link.href) ? '_blank' : undefined"
      :rel="isExternal(link.href) ? 'noreferrer noopener' : undefined"
    >
      <span
        class="material-symbols-outlined social-link__icon"
        aria-hidden="true"
      >
        {{ link.icon }}
      </span>
      <span class="social-link__text">
        <span class="social-link__label">{{ link.label }}</span>
        <span v-if="!compact && link.handle" class="social-link__handle">{{
          link.handle
        }}</span>
      </span>
      <span
        class="material-symbols-outlined social-link__arrow"
        aria-hidden="true"
      >
        arrow_outward
      </span>
    </a>
  </nav>
</template>

<style scoped>
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-100);
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-125);
  min-block-size: 48px;
  padding: var(--md-sys-spacing-100) var(--md-sys-spacing-150);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface-variant);
  text-decoration: none;
  transition:
    background-color
      var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    border-color var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    color var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    border-radius var(--m3e-shape-morph-duration) var(--m3e-shape-morph-easing);
}

.social-link:hover {
  border-color: transparent;
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.social-link:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.social-link__icon {
  font-size: 20px;
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 20;
}

.social-link__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.social-link__label {
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-emphasized-label-large-weight);
  letter-spacing: var(--md-sys-typescale-label-large-tracking);
}

.social-link__handle {
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-small-size);
  letter-spacing: var(--md-sys-typescale-body-small-tracking);
}

.social-link__arrow {
  margin-inline-start: var(--md-sys-spacing-50);
  font-size: 16px;
  opacity: 0.55;
}

.is-compact .social-link {
  inline-size: 48px;
  justify-content: center;
  padding: 0;
  border-color: transparent;
  background: var(--md-sys-color-surface-container);
}

.is-compact .social-link__text,
.is-compact .social-link__arrow {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .social-link {
    transition-duration: 0.01ms;
  }
}
</style>
