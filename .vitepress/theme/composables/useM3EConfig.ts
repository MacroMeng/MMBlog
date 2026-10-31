import { computed } from "vue";
import { useData } from "vitepress";
import { resolveM3EConfig } from "../config/defaults.ts";
import type { DeepPartial, M3EConfig } from "../types/site-config.ts";

export function useM3EConfig() {
  const { theme } = useData();

  return computed(() =>
    resolveM3EConfig(
      (theme.value as { m3e?: DeepPartial<M3EConfig> } | undefined)?.m3e,
    ),
  );
}
