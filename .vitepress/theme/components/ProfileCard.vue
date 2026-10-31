<script setup lang="ts">
import { useM3EConfig } from "../composables/useM3EConfig";
import { resolveAsset } from "../utils/url";
import M3Button from "./M3Button.vue";
import SocialLinks from "./SocialLinks.vue";

withDefaults(defineProps<{ compact?: boolean; showSocials?: boolean }>(), {
  compact: false,
  showSocials: true,
});

const config = useM3EConfig();
</script>

<template>
  <article class="profile-card" :class="{ 'is-compact': compact }">
    <div class="profile-card__media">
      <img
        class="profile-card__avatar"
        :src="resolveAsset(config.profile.avatar)"
        :alt="`${config.profile.name} 的头像`"
        width="96"
        height="96"
        loading="lazy"
      />
      <span class="profile-card__status" aria-hidden="true"></span>
    </div>

    <div class="profile-card__body">
      <p class="profile-card__eyebrow">{{ config.profile.handle }}</p>
      <h2 class="profile-card__name">{{ config.profile.name }}</h2>
      <p class="profile-card__role">{{ config.profile.role }}</p>
      <p class="profile-card__bio">{{ config.profile.bio }}</p>

      <ul v-if="!compact" class="profile-card__skills" aria-label="技能">
        <li
          v-for="skill in config.profile.skills"
          :key="skill"
          class="profile-card__skill"
        >
          {{ skill }}
        </li>
      </ul>

      <div v-if="compact" class="profile-card__actions">
        <M3Button :href="config.profile.cta.href" variant="tonal" icon="person">
          {{ config.profile.cta.label }}
        </M3Button>
      </div>
      <SocialLinks v-else-if="showSocials" />
    </div>
  </article>
</template>

<style scoped>
.profile-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--md-sys-spacing-300);
  padding: var(--md-sys-spacing-300);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-sys-shape-corner-large-increased);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

.profile-card__media {
  position: relative;
  align-self: start;
}

.profile-card__avatar {
  display: block;
  inline-size: clamp(72px, 12vw, 104px);
  block-size: clamp(72px, 12vw, 104px);
  border: 4px solid var(--md-sys-color-surface-container-lowest);
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-primary-container);
  object-fit: cover;
  box-shadow: var(--md-sys-elevation-level1);
}

.profile-card__status {
  position: absolute;
  inset-block-end: 4px;
  inset-inline-end: 4px;
  inline-size: 16px;
  block-size: 16px;
  border: 3px solid var(--md-sys-color-surface-container-low);
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-tertiary);
}

.profile-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-100);
  min-inline-size: 0;
}

.profile-card__eyebrow {
  margin: 0;
  color: var(--md-sys-color-primary);
  font-size: var(--md-sys-typescale-label-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-label-medium-weight);
  letter-spacing: var(--md-sys-typescale-label-medium-tracking);
  text-transform: uppercase;
}

.profile-card__name {
  margin: 0;
  font-family: var(--md-sys-typescale-headline-medium-font);
  font-size: var(--md-sys-typescale-headline-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-headline-medium-weight);
  line-height: var(--md-sys-typescale-headline-medium-line-height);
  letter-spacing: var(--md-sys-typescale-headline-medium-tracking);
}

.profile-card__role {
  margin: calc(-1 * var(--md-sys-spacing-50)) 0 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-medium-size);
  line-height: var(--md-sys-typescale-body-medium-line-height);
}

.profile-card__bio {
  margin: var(--md-sys-spacing-100) 0 0;
  max-inline-size: 52ch;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-large-size);
  line-height: var(--md-sys-typescale-body-large-line-height);
  letter-spacing: var(--md-sys-typescale-body-large-tracking);
}

.profile-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-100);
  margin: var(--md-sys-spacing-150) 0 var(--md-sys-spacing-50);
  padding: 0;
  list-style: none;
}

.profile-card__skill {
  margin: 0;
  padding: var(--md-sys-spacing-50) var(--md-sys-spacing-150);
  border-radius: var(--md-sys-shape-corner-small);
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  font-size: var(--md-sys-typescale-label-medium-size);
  font-weight: var(--md-sys-typescale-label-medium-weight);
  letter-spacing: var(--md-sys-typescale-label-medium-tracking);
}

.profile-card__actions {
  margin-block-start: var(--md-sys-spacing-100);
}

.is-compact {
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--md-sys-spacing-250);
  padding: var(--md-sys-spacing-300);
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.is-compact .profile-card__avatar {
  inline-size: 72px;
  block-size: 72px;
  border-color: var(--md-sys-color-secondary-container);
  background: var(--md-sys-color-surface-container-highest);
}

.is-compact .profile-card__status,
.is-compact .profile-card__eyebrow {
  display: none;
}

.is-compact .profile-card__name {
  font-size: var(--md-sys-typescale-title-large-size);
  line-height: var(--md-sys-typescale-title-large-line-height);
}

.is-compact .profile-card__role,
.is-compact .profile-card__bio {
  color: color-mix(
    in srgb,
    var(--md-sys-color-on-secondary-container) 82%,
    transparent
  );
}

.is-compact .profile-card__bio {
  margin-block-start: var(--md-sys-spacing-25);
  font-size: var(--md-sys-typescale-body-medium-size);
  line-height: var(--md-sys-typescale-body-medium-line-height);
}

.is-compact .profile-card__actions :deep(.m3-button--tonal) {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

@media (max-width: 520px) {
  .profile-card {
    grid-template-columns: 1fr;
    padding: var(--md-sys-spacing-250);
  }

  .profile-card__avatar {
    inline-size: 72px;
    block-size: 72px;
  }
}
</style>
