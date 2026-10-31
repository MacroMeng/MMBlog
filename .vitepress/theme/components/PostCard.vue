<script setup lang="ts">
import { computed } from "vue";
import { useM3EConfig } from "../composables/useM3EConfig";
import type { HomePost } from "../types/post";
import { formatPostDate } from "../utils/date";
import { resolveAsset, resolveHref } from "../utils/url";

const props = withDefaults(
  defineProps<{
    post: HomePost;
    featured?: boolean;
  }>(),
  { featured: false },
);

const config = useM3EConfig();

function resolveAuthor(name: string) {
  const author = config.value.authors[name];
  if (!author) return name;
  return typeof author === "string" ? author : author.name;
}

const authorLine = computed(() =>
  props.post.author.map((author) => resolveAuthor(author.name)).join("、"),
);
const dateLine = computed(() => formatPostDate(props.post.date));
</script>

<template>
  <a
    class="post-card"
    :class="{ 'is-featured': featured, 'has-image': post.image }"
    :href="resolveHref(post.url)"
    :aria-label="`阅读《${post.title}》`"
  >
    <div v-if="post.image" class="post-card__media">
      <img
        :src="resolveAsset(post.image.src)"
        :alt="post.image.alt"
        :style="{
          objectFit: post.image.fit ?? 'cover',
          objectPosition: post.image.position,
        }"
        loading="lazy"
        decoding="async"
      />
      <span v-if="post.pinned" class="post-card__pin">
        <span class="material-symbols-outlined" aria-hidden="true"
          >push_pin</span
        >
        置顶
      </span>
    </div>

    <div class="post-card__body">
      <div class="post-card__meta">
        <span v-if="post.category" class="post-card__category">{{
          post.category
        }}</span>
        <time v-if="dateLine" :datetime="post.date">{{ dateLine }}</time>
        <span v-if="authorLine" class="post-card__author">{{
          authorLine
        }}</span>
      </div>

      <h3 class="post-card__title">{{ post.title }}</h3>
      <p class="post-card__summary">{{ post.summary }}</p>

      <ul v-if="post.tags.length" class="post-card__tags" aria-label="标签">
        <li v-for="tag in post.tags" :key="tag">#{{ tag }}</li>
      </ul>

      <span class="post-card__more" aria-hidden="true">
        阅读文章
        <span class="material-symbols-outlined">arrow_forward</span>
      </span>
    </div>
  </a>
</template>

<style scoped>
.post-card {
  --post-radius: var(--md-sys-shape-corner-medium);

  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: var(--post-radius);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  text-decoration: none;
  transition:
    transform var(--md-sys-motion-spring-expressive-spatial-fast-duration)
      var(--md-sys-motion-spring-expressive-spatial-fast-easing),
    border-radius var(--m3e-shape-morph-duration) var(--m3e-shape-morph-easing),
    background-color
      var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    box-shadow var(--md-sys-motion-spring-expressive-spatial-fast-duration)
      var(--md-sys-motion-spring-expressive-spatial-fast-easing);
}

.post-card:hover {
  transform: translateY(-3px);
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-surface-container);
  box-shadow: var(--md-sys-elevation-level2);
}

.post-card:focus-visible {
  outline: 3px solid var(--md-sys-color-primary);
  outline-offset: 3px;
}

.post-card__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin: var(--md-sys-spacing-100) var(--md-sys-spacing-100) 0;
  border-radius: calc(var(--post-radius) - var(--md-sys-shape-corner-small));
  background: var(--md-sys-color-surface-container-high);
}

.post-card__media img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  transition: transform
    var(--md-sys-motion-spring-expressive-spatial-slow-duration)
    var(--md-sys-motion-spring-expressive-spatial-slow-easing);
}

.post-card:hover .post-card__media img {
  transform: scale(1.025);
}

.post-card__pin {
  position: absolute;
  inset-block-start: 12px;
  inset-inline-start: 12px;
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-50);
  padding: var(--md-sys-spacing-50) var(--md-sys-spacing-125);
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  font-size: var(--md-sys-typescale-label-small-size);
  font-weight: var(--md-sys-typescale-emphasized-label-small-weight);
}

.post-card__pin .material-symbols-outlined {
  font-size: 14px;
}

.post-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--md-sys-spacing-100);
  padding: var(--md-sys-spacing-200);
}

.post-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--md-sys-spacing-50) var(--md-sys-spacing-150);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-medium-size);
  letter-spacing: var(--md-sys-typescale-label-medium-tracking);
}

.post-card__category {
  padding: var(--md-sys-spacing-25) var(--md-sys-spacing-100);
  border-radius: var(--md-sys-shape-corner-extra-small);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-weight: var(--md-sys-typescale-emphasized-label-medium-weight);
}

.post-card__author::before {
  margin-inline-end: var(--md-sys-spacing-150);
  color: var(--md-sys-color-outline);
  content: "·";
}

.post-card__title {
  margin: 0;
  font-family: var(--md-sys-typescale-title-large-font);
  font-size: var(--md-sys-typescale-title-large-size);
  font-weight: var(--md-sys-typescale-emphasized-title-large-weight);
  line-height: var(--md-sys-typescale-title-large-line-height);
  letter-spacing: var(--md-sys-typescale-title-large-tracking);
  text-wrap: balance;
}

.post-card__summary {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-medium-size);
  line-height: var(--md-sys-typescale-body-medium-line-height);
  letter-spacing: var(--md-sys-typescale-body-medium-tracking);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.post-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-75);
  margin: auto 0 0;
  padding: var(--md-sys-spacing-50) 0 0;
  list-style: none;
}

.post-card__tags li {
  color: var(--md-sys-color-secondary);
  font-size: var(--md-sys-typescale-label-medium-size);
  font-weight: var(--md-sys-typescale-label-medium-weight);
}

.post-card__more {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-50);
  margin-block-start: var(--md-sys-spacing-25);
  color: var(--md-sys-color-primary);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-emphasized-label-large-weight);
}

.post-card__more .material-symbols-outlined {
  font-size: 18px;
  transition: transform
    var(--md-sys-motion-spring-expressive-spatial-fast-duration)
    var(--md-sys-motion-spring-expressive-spatial-fast-easing);
}

.post-card:hover .post-card__more .material-symbols-outlined {
  transform: translateX(4px);
}

.is-featured {
  --post-radius: var(--md-sys-shape-corner-large-increased);
}

.is-featured .post-card__title {
  font-size: var(--md-sys-typescale-headline-small-size);
  line-height: var(--md-sys-typescale-headline-small-line-height);
}

@media (min-width: 900px) {
  .is-featured {
    grid-column: span 2;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  }

  .is-featured .post-card__media {
    block-size: 100%;
    aspect-ratio: auto;
    margin: var(--md-sys-spacing-100) 0 var(--md-sys-spacing-100)
      var(--md-sys-spacing-100);
  }

  .is-featured .post-card__body {
    justify-content: center;
    padding: var(--md-sys-spacing-400);
  }

  .is-featured .post-card__summary {
    -webkit-line-clamp: 4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .post-card,
  .post-card__media img,
  .post-card__more .material-symbols-outlined {
    transition-duration: 0.01ms;
  }

  .post-card:hover {
    transform: none;
  }

  .post-card:hover .post-card__media img,
  .post-card:hover .post-card__more .material-symbols-outlined {
    transform: none;
  }
}
</style>
