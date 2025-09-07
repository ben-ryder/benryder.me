import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.benryder.me',
    server: {
        port: 42101,
        host: "local.benryder.me"
    },
    integrations: [react(), sitemap()],
    adapter: netlify(),
    markdown: {
        remarkPlugins: [
            [remarkToc, {heading: 'Contents', maxDepth: 3}]
        ]
    }
});
