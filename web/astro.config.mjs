import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.benryder.me',
  server: {
    port: 42101,
    host: "local.benryder.me"
  },
  integrations: [react(), sitemap()],
});