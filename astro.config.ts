import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  prefetch: true,
  site: "https://photos.felixs.dev",
  vite: { ssr: { noExternal: ["smartypants"] } },
});
