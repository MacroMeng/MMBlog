<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import VPNav from "vitepress/dist/client/theme-default/components/VPNav.vue";
import LicenseCard from "./components/LicenseCard.vue";
import SiteFooter from "./components/SiteFooter.vue";
import M3EHome from "./layouts/M3EHome.vue";

const { frontmatter } = useData();
const isM3EHome = computed(() => frontmatter.value.layout === "m3e-home");
</script>

<template>
  <div v-if="isM3EHome" class="M3EHomeLayout">
    <a class="skip-link" href="#main">跳到正文</a>
    <VPNav />
    <main id="main" tabindex="-1">
      <M3EHome />
    </main>
  </div>

  <DefaultTheme.Layout v-else>
    <!--
      `doc-footer-before` lives inside VPDocFooter, which VitePress renders
      only when editLink / lastUpdated / prev-next exist. The blog plugin
      replaces prev-next with its own post nav, so that footer (and its slot)
      disappears on posts. `doc-after` is unconditional and keeps the licence
      card at the bottom of every post.
    -->
    <template #doc-after>
      <LicenseCard />
    </template>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.M3EHomeLayout {
  min-block-size: 100vh;
}

.skip-link {
  position: fixed;
  inset-block-start: 8px;
  inset-inline-start: 8px;
  z-index: 100;
  padding: var(--md-sys-spacing-125) var(--md-sys-spacing-200);
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-160%);
  transition: transform
    var(--md-sys-motion-spring-expressive-spatial-fast-duration)
    var(--md-sys-motion-spring-expressive-spatial-fast-easing);
}

.skip-link:focus {
  transform: translateY(0);
}

main:focus {
  outline: none;
}
</style>
