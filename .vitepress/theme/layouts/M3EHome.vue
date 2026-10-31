<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from "../data/homePosts.data";
import { useM3EConfig } from "../composables/useM3EConfig";
import { resolveHref } from "../utils/url";
import M3Button from "../components/M3Button.vue";
import OneLiner from "../components/OneLiner.vue";
import PostCard from "../components/PostCard.vue";
import ProfileCard from "../components/ProfileCard.vue";
import SiteFooter from "../components/SiteFooter.vue";

const config = useM3EConfig();
const latest = computed(() => posts.slice(0, config.value.home.latest.limit));

function formatStat(value: string) {
  return value.replaceAll("{postCount}", String(posts.length));
}
</script>

<template>
  <div class="m3e-home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__shapes" aria-hidden="true">
        <span class="hero__shape hero__shape--one"></span>
        <span class="hero__shape hero__shape--two"></span>
        <span class="hero__shape hero__shape--three"></span>
        <span class="hero__dot"></span>
      </div>

      <div class="hero__inner">
        <div class="hero__copy">
          <p class="hero__eyebrow">
            <span class="material-symbols-outlined" aria-hidden="true">
              {{ config.home.hero.eyebrowIcon }}
            </span>
            {{ config.home.hero.eyebrow }}
          </p>

          <h1 id="hero-title" class="hero__title">
            {{ config.home.hero.titleLead }}<br />
            <span class="hero__accent">{{ config.home.hero.titleAccent }}</span>
            {{ config.home.hero.titleTail }}
          </h1>

          <p class="hero__lede">{{ config.home.hero.description }}</p>

          <div class="hero__actions">
            <M3Button
              v-for="action in config.home.hero.actions"
              :key="`${action.label}-${action.href}`"
              :href="action.href"
              :icon="action.icon"
              :variant="action.variant ?? 'filled'"
              :size="action.size ?? 'medium'"
            >
              {{ action.label }}
            </M3Button>
          </div>

          <OneLiner />
        </div>

        <aside class="hero__aside" :aria-label="config.home.hero.asideLabel">
          <div
            v-for="(stat, index) in config.home.hero.stats"
            :key="`${stat.icon}-${index}`"
            class="stat-card"
            :class="[
              `stat-card--${stat.tone ?? 'primary'}`,
              { 'stat-card--horizontal': stat.href },
            ]"
          >
            <template v-if="stat.href">
              <span class="material-symbols-outlined" aria-hidden="true">
                {{ stat.icon }}
              </span>
              <div>
                <strong>{{ formatStat(stat.value) }}</strong>
                <span
                  ><a :href="resolveHref(stat.href)">{{ stat.label }}</a></span
                >
              </div>
            </template>
            <template v-else>
              <span
                class="stat-card__icon material-symbols-outlined"
                aria-hidden="true"
              >
                {{ stat.icon }}
              </span>
              <strong>{{ formatStat(stat.value) }}</strong>
              <span>{{ stat.label }}</span>
            </template>
          </div>
        </aside>
      </div>
    </section>

    <section class="section home-posts" aria-labelledby="latest-title">
      <div class="section__heading">
        <div>
          <p class="section__eyebrow">
            {{ config.home.latest.eyebrow }}
          </p>
          <h2 id="latest-title">{{ config.home.latest.title }}</h2>
        </div>
        <M3Button
          :href="config.home.latest.action.href"
          :icon="config.home.latest.action.icon"
          :variant="config.home.latest.action.variant ?? 'text'"
          :size="config.home.latest.action.size ?? 'small'"
        >
          {{ config.home.latest.action.label }}
        </M3Button>
      </div>

      <div v-if="latest.length" class="post-grid">
        <PostCard
          v-for="(post, index) in latest"
          :key="post.url"
          :post="post"
          :featured="index === 0"
        />
      </div>
      <p v-else class="empty-state">{{ config.home.latest.empty }}</p>
    </section>

    <section class="section home-about" aria-labelledby="about-title">
      <div class="home-about__copy">
        <p class="section__eyebrow">{{ config.home.about.eyebrow }}</p>
        <h2 id="about-title">{{ config.home.about.title }}</h2>
        <p>{{ config.home.about.body }}</p>
        <M3Button
          :href="config.home.about.action.href"
          :icon="config.home.about.action.icon"
          :variant="config.home.about.action.variant ?? 'tonal'"
          :size="config.home.about.action.size ?? 'small'"
        >
          {{ config.home.about.action.label }}
        </M3Button>
      </div>
      <ProfileCard compact />
    </section>

    <SiteFooter />
  </div>
</template>

<style scoped>
.m3e-home {
  min-block-size: 100vh;
  background: var(--md-sys-color-surface);
}

.hero {
  position: relative;
  overflow: hidden;
  padding: var(--md-sys-spacing-500) var(--md-sys-spacing-300)
    var(--md-sys-spacing-800);
  border-block-end: 1px solid var(--md-sys-color-outline-variant);
  background:
    radial-gradient(
      circle at 8% 10%,
      color-mix(
        in srgb,
        var(--md-sys-color-primary-container) 60%,
        transparent
      ),
      transparent 40%
    ),
    radial-gradient(
      circle at 92% 0%,
      color-mix(
        in srgb,
        var(--md-sys-color-tertiary-container) 46%,
        transparent
      ),
      transparent 38%
    ),
    var(--md-sys-color-surface);
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
  align-items: center;
  gap: var(--md-sys-spacing-700);
  max-inline-size: 1152px;
  margin-inline: auto;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--md-sys-spacing-250);
}

.hero__eyebrow,
.section__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-100);
  margin: 0;
  color: var(--md-sys-color-primary);
  font-size: var(--md-sys-typescale-label-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-label-medium-weight);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero__eyebrow .material-symbols-outlined {
  font-size: 18px;
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 18;
}

.hero__title {
  max-inline-size: 14ch;
  margin: 0;
  color: var(--md-sys-color-on-surface);
  font-family: var(--md-sys-typescale-display-medium-font);
  font-size: clamp(2.8rem, 7.4vw, 30rem);
  font-weight: 600;
  font-stretch: normal;
  font-optical-sizing: auto;
  line-height: 1.06;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.hero__accent {
  position: relative;
  display: inline-block;
  color: var(--md-sys-color-primary);
  font-size: clamp(3rem, 7.8vw, 40rem);
  font-weight: 900;
  font-stretch: 120%;
  font-optical-sizing: auto;
  letter-spacing: -0.05em;
}

.hero__accent::after {
  position: absolute;
  z-index: -1;
  inset-inline: -0.04em;
  inset-block-end: 0.06em;
  block-size: 0.22em;
  border-radius: var(--md-sys-shape-corner-full);
  background: color-mix(
    in srgb,
    var(--md-sys-color-tertiary-container) 68%,
    transparent
  );
  content: "";
}

.hero__lede {
  max-inline-size: 54ch;
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-large-size);
  line-height: 1.75;
  letter-spacing: var(--md-sys-typescale-body-large-tracking);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-150);
  margin-block: var(--md-sys-spacing-50) var(--md-sys-spacing-100);
}

.hero__aside {
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-150);
}

.stat-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--md-sys-spacing-25) var(--md-sys-spacing-200);
  padding: var(--md-sys-spacing-250) var(--md-sys-spacing-300);
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  transform: rotate(-1.2deg);
}

.stat-card__icon {
  grid-row: span 2;
  font-size: 28px;
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 28;
}

.stat-card strong {
  font-family: var(--md-sys-typescale-headline-medium-font);
  font-size: var(--md-sys-typescale-headline-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-headline-medium-weight);
  line-height: 1;
}

.stat-card span:last-child {
  color: color-mix(
    in srgb,
    var(--md-sys-color-on-primary-container) 78%,
    transparent
  );
  font-size: var(--md-sys-typescale-body-small-size);
}

.stat-card--tertiary {
  margin-inline-start: var(--md-sys-spacing-300);
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  transform: rotate(1.4deg);
}

.stat-card--tertiary span:last-child {
  color: color-mix(
    in srgb,
    var(--md-sys-color-on-tertiary-container) 78%,
    transparent
  );
}

.stat-card--surface {
  border-radius: var(--md-sys-shape-corner-large-increased);
  background: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
  transform: none;
}

.stat-card--surface span:last-child {
  color: var(--md-sys-color-on-surface-variant);
}

.stat-card--horizontal {
  display: flex;
  gap: var(--md-sys-spacing-150);
}

.stat-card--horizontal .material-symbols-outlined {
  color: var(--md-sys-color-primary);
  font-size: 24px;
}

.stat-card--horizontal div {
  display: flex;
  flex-direction: column;
}

.stat-card--horizontal strong {
  font-family: var(--md-sys-typescale-title-small-font);
  font-size: var(--md-sys-typescale-title-small-size);
  font-weight: var(--md-sys-typescale-emphasized-title-small-weight);
}

.stat-card--horizontal span,
.stat-card--horizontal a {
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-small-size);
}

.stat-card--horizontal a {
  text-decoration: underline;
  text-decoration-color: color-mix(
    in srgb,
    var(--md-sys-color-primary) 50%,
    transparent
  );
  text-underline-offset: 3px;
}

.hero__shapes {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero__shape {
  position: absolute;
  display: block;
  opacity: 0.5;
}

.hero__shape--one {
  inset-block-start: 18%;
  inset-inline-end: 4%;
  inline-size: 190px;
  block-size: 190px;
  border-radius: var(--md-sys-shape-corner-extra-extra-large);
  background: color-mix(
    in srgb,
    var(--md-sys-color-secondary-container) 65%,
    transparent
  );
  transform: rotate(18deg);
}

.hero__shape--two {
  inset-block-end: 4%;
  inset-inline-start: 38%;
  inline-size: 120px;
  block-size: 120px;
  border-radius: var(--md-sys-shape-corner-full);
  background: color-mix(
    in srgb,
    var(--md-sys-color-primary-container) 46%,
    transparent
  );
}

.hero__shape--three {
  inset-block-start: 12%;
  inset-inline-start: -42px;
  inline-size: 110px;
  block-size: 220px;
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: color-mix(
    in srgb,
    var(--md-sys-color-tertiary-container) 50%,
    transparent
  );
  transform: rotate(28deg);
}

.hero__dot {
  position: absolute;
  inset-block-start: 54%;
  inset-inline-end: 33%;
  inline-size: 14px;
  block-size: 14px;
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-primary);
  opacity: 0.6;
}

.section {
  max-inline-size: 1152px;
  margin-inline: auto;
  padding: var(--md-sys-spacing-900) var(--md-sys-spacing-300) 0;
}

.section__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--md-sys-spacing-300);
  margin-block-end: var(--md-sys-spacing-300);
}

.section__heading h2,
.home-about h2 {
  margin: var(--md-sys-spacing-50) 0 0;
  color: var(--md-sys-color-on-surface);
  font-family: var(--md-sys-typescale-headline-large-font);
  font-size: clamp(1.7rem, 4vw, var(--md-sys-typescale-headline-large-size));
  font-weight: var(--md-sys-typescale-emphasized-headline-large-weight);
  line-height: var(--md-sys-typescale-headline-large-line-height);
  letter-spacing: var(--md-sys-typescale-headline-large-tracking);
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--md-sys-spacing-200);
}

.empty-state {
  padding: var(--md-sys-spacing-300);
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface-variant);
}

.home-about {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: center;
  gap: var(--md-sys-spacing-600);
  margin-block-start: var(--md-sys-spacing-900);
  padding-block: var(--md-sys-spacing-700);
  border-block: 1px solid var(--md-sys-color-outline-variant);
}

.home-about__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--md-sys-spacing-150);
}

.home-about__copy p:not(.section__eyebrow) {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-large-size);
  line-height: var(--md-sys-typescale-body-large-line-height);
}

.home-about__copy code {
  padding: var(--md-sys-spacing-25) var(--md-sys-spacing-75);
  border-radius: var(--md-sys-shape-corner-extra-small);
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
  font-size: 0.9em;
}

@media (min-width: 960px) {
  .hero {
    padding-block-start: calc(var(--vp-nav-height) + var(--md-sys-spacing-800));
  }
}

@media (max-width: 980px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: var(--md-sys-spacing-500);
  }

  .hero__aside {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-inline-size: 640px;
  }

  .stat-card--horizontal {
    grid-column: span 2;
  }

  .home-about {
    grid-template-columns: 1fr;
    gap: var(--md-sys-spacing-300);
  }
}

@media (max-width: 760px) {
  .post-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .hero {
    padding: var(--md-sys-spacing-500) var(--md-sys-spacing-250)
      var(--md-sys-spacing-600);
  }

  .hero__title {
    font-size: clamp(2.25rem, 12vw, 3rem);
  }

  .hero__aside {
    grid-template-columns: 1fr;
  }

  .stat-card--horizontal {
    grid-column: auto;
  }

  .stat-card--tertiary {
    margin-inline-start: 0;
  }

  .section {
    padding: var(--md-sys-spacing-700) var(--md-sys-spacing-250) 0;
  }

  .section__heading {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--md-sys-spacing-100);
  }

  .home-about {
    margin-block-start: var(--md-sys-spacing-700);
    padding-block: var(--md-sys-spacing-500);
  }

  .hero__shape--one {
    inline-size: 120px;
    block-size: 120px;
  }

  .hero__shape--three {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card,
  .stat-card--tertiary {
    transform: none;
  }
}
</style>
