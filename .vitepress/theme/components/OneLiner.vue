<script setup lang="ts">
import { onMounted, ref } from "vue";
import { withBase } from "vitepress";
import { useM3EConfig } from "../composables/useM3EConfig";
import type { OneLinerQuote } from "../types/site-config";

const config = useM3EConfig();
const quote = ref<OneLinerQuote>({ ...config.value.oneLiner.fallback });
const quotes = ref<OneLinerQuote[]>([]);
const loading = ref(false);
const usedFallback = ref(true);

function pickQuote() {
  if (!quotes.value.length) return;

  const pool =
    quotes.value.length > 1
      ? quotes.value.filter((item) => item.text !== quote.value.text)
      : quotes.value;

  quote.value =
    pool[Math.floor(Math.random() * pool.length)] ??
    config.value.oneLiner.fallback;
  usedFallback.value = false;
}

async function loadQuotes() {
  if (loading.value || typeof fetch !== "function") return;
  loading.value = true;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(withBase(config.value.oneLiner.source), {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = (await response.json()) as { quotes?: OneLinerQuote[] };
    if (!Array.isArray(data.quotes)) throw new Error("Invalid one-liner file");

    quotes.value = data.quotes.filter(
      (item) =>
        typeof item?.text === "string" &&
        item.text.trim() &&
        typeof item.from === "string",
    );

    if (!quotes.value.length) throw new Error("No one-liners");

    pickQuote();
  } catch {
    // The SSR fallback stays visible if the local file is missing.
  } finally {
    window.clearTimeout(timeout);
    loading.value = false;
  }
}

function refreshQuote() {
  if (loading.value) return;
  if (quotes.value.length) {
    pickQuote();
    return;
  }
  void loadQuotes();
}

onMounted(() => {
  void loadQuotes();
});
</script>

<template>
  <section class="one-liner" aria-labelledby="one-liner-label">
    <span class="material-symbols-outlined one-liner__mark" aria-hidden="true"
      >format_quote</span
    >

    <div class="one-liner__content">
      <p id="one-liner-label" class="one-liner__label">
        {{ config.oneLiner.label }}
      </p>
      <Transition name="quote" mode="out-in">
        <blockquote
          :key="quote.text"
          class="one-liner__quote"
          aria-live="polite"
        >
          <p>{{ quote.text }}</p>
          <footer>
            —— {{ quote.from
            }}<template v-if="quote.fromWho"> · {{ quote.fromWho }}</template>
            <span v-if="usedFallback" class="one-liner__fallback">
              {{ config.oneLiner.offlineLabel }}
            </span>
          </footer>
        </blockquote>
      </Transition>
    </div>

    <button
      class="one-liner__refresh"
      type="button"
      :disabled="loading"
      :aria-label="
        loading ? config.oneLiner.loadingLabel : config.oneLiner.refreshLabel
      "
      :title="config.oneLiner.refreshLabel"
      @click="refreshQuote"
    >
      <span
        class="material-symbols-outlined"
        :class="{ 'is-spinning': loading }"
        aria-hidden="true"
      >
        refresh
      </span>
    </button>
  </section>
</template>

<style scoped>
.one-liner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--md-sys-spacing-200);
  max-inline-size: 620px;
  padding: var(--md-sys-spacing-250) var(--md-sys-spacing-250)
    var(--md-sys-spacing-250) var(--md-sys-spacing-300);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: color-mix(
    in srgb,
    var(--md-sys-color-surface-container) 78%,
    transparent
  );
  box-shadow: var(--md-sys-elevation-level1);
  backdrop-filter: blur(16px);
}

.one-liner__mark {
  align-self: start;
  color: var(--md-sys-color-primary);
  font-size: 28px;
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 28;
}

.one-liner__label {
  margin: 0 0 var(--md-sys-spacing-50);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-medium-size);
  font-weight: var(--md-sys-typescale-emphasized-label-medium-weight);
  letter-spacing: var(--md-sys-typescale-label-medium-tracking);
}

.one-liner__quote {
  margin: 0;
}

.one-liner__quote p {
  margin: 0;
  color: var(--md-sys-color-on-surface);
  font-size: var(--md-sys-typescale-body-large-size);
  line-height: var(--md-sys-typescale-body-large-line-height);
}

.one-liner__quote footer {
  margin-block-start: var(--md-sys-spacing-50);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-small-size);
}

.one-liner__fallback {
  opacity: 0.7;
}

.one-liner__refresh {
  display: grid;
  place-items: center;
  inline-size: 48px;
  block-size: 48px;
  border: 0;
  border-radius: var(--md-sys-shape-corner-full);
  background: transparent;
  color: var(--md-sys-color-primary);
  cursor: pointer;
  transition:
    background-color
      var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    border-radius var(--m3e-shape-morph-duration) var(--m3e-shape-morph-easing);
}

.one-liner__refresh:hover {
  border-radius: var(--md-sys-shape-corner-small);
  background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
}

.one-liner__refresh:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.one-liner__refresh:disabled {
  cursor: progress;
  opacity: 0.6;
}

.one-liner__refresh .material-symbols-outlined {
  font-size: 22px;
}

.is-spinning {
  animation: spin 900ms linear infinite;
}

.quote-enter-active,
.quote-leave-active {
  transition:
    opacity var(--md-sys-motion-spring-expressive-effects-fast-duration)
      var(--md-sys-motion-spring-expressive-effects-fast-easing),
    transform var(--md-sys-motion-spring-expressive-spatial-fast-duration)
      var(--md-sys-motion-spring-expressive-spatial-fast-easing);
}

.quote-enter-from,
.quote-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

@media (max-width: 560px) {
  .one-liner {
    grid-template-columns: auto minmax(0, 1fr);
    padding: var(--md-sys-spacing-200);
  }

  .one-liner__refresh {
    grid-column: 2;
    justify-self: end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .one-liner__refresh,
  .quote-enter-active,
  .quote-leave-active {
    transition-duration: 0.01ms;
  }

  .is-spinning {
    animation: none;
  }
}
</style>
