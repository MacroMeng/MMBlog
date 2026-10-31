<script setup lang="ts">
import { computed } from "vue";
import { resolveHref } from "../utils/url";

type Variant = "filled" | "tonal" | "outlined" | "text";
type Size = "small" | "medium" | "large";

const props = withDefaults(
  defineProps<{
    href?: string;
    variant?: Variant;
    size?: Size;
    icon?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: "filled",
    size: "small",
    type: "button",
    disabled: false,
  },
);

const tag = computed(() => (props.href ? "a" : "button"));
const classes = computed(() => [
  "m3-button",
  `m3-button--${props.variant}`,
  `m3-button--${props.size}`,
  { "is-disabled": props.disabled },
]);
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :href="disabled || !href ? undefined : resolveHref(href)"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :tabindex="disabled ? -1 : undefined"
  >
    <span
      v-if="icon"
      class="material-symbols-outlined m3-button__icon"
      aria-hidden="true"
    >
      {{ icon }}
    </span>
    <span class="m3-button__label"><slot /></span>
  </component>
</template>

<style scoped>
.m3-button {
  --button-height: 40px;
  --button-padding: var(--md-sys-spacing-200);
  --button-radius: var(--md-sys-shape-corner-full);
  --button-pressed-radius: var(--md-sys-shape-corner-small);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--md-sys-spacing-100);
  min-block-size: var(--button-height);
  max-inline-size: 100%;
  padding-inline: var(--button-padding);
  border: 1px solid transparent;
  border-radius: var(--button-radius);
  font-family: var(--md-sys-typescale-label-large-font);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-emphasized-label-large-weight);
  line-height: var(--md-sys-typescale-label-large-line-height);
  letter-spacing: var(--md-sys-typescale-label-large-tracking);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  isolation: isolate;
  transition:
    border-radius var(--m3e-shape-morph-duration) var(--m3e-shape-morph-easing),
    background-color
      var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    color var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    border-color var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing);
}

.m3-button::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: currentcolor;
  content: "";
  opacity: 0;
  transition: opacity
    var(--md-sys-motion-spring-expressive-effects-fast-duration)
    var(--md-sys-motion-spring-expressive-effects-fast-easing);
}

.m3-button:hover::before {
  opacity: var(--md-sys-state-hover-state-layer-opacity);
}

.m3-button:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.m3-button:focus-visible::before {
  opacity: var(--md-sys-state-focus-state-layer-opacity);
}

.m3-button:active {
  border-radius: var(--button-pressed-radius);
}

.m3-button:active::before {
  opacity: var(--md-sys-state-pressed-state-layer-opacity);
}

.m3-button--medium {
  --button-height: 48px;
  --button-padding: var(--md-sys-spacing-250);
  --button-pressed-radius: var(--md-sys-shape-corner-medium);
}

.m3-button--large {
  --button-height: 56px;
  --button-padding: var(--md-sys-spacing-300);
  --button-pressed-radius: var(--md-sys-shape-corner-large);
}

.m3-button--filled {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}

.m3-button--tonal {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.m3-button--outlined {
  border-color: var(--md-sys-color-outline);
  background: transparent;
  color: var(--md-sys-color-primary);
}

.m3-button--outlined:hover {
  background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
}

.m3-button--text {
  padding-inline: var(--md-sys-spacing-150);
  background: transparent;
  color: var(--md-sys-color-primary);
}

.m3-button__icon {
  font-size: 20px;
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 20;
}

.m3-button.is-disabled {
  pointer-events: none;
  opacity: 0.38;
}

@media (prefers-reduced-motion: reduce) {
  .m3-button,
  .m3-button::before {
    transition-duration: 0.01ms;
  }
}
</style>
