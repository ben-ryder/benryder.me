import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    host: "local.benryder.me"
  },
  integrations: [react()]
});