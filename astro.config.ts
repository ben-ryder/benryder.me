import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");
const SITE = env.SITE_BASE_URL ?? "https://www.benryder.me"

// https://astro.build/config
export default defineConfig({
    site: SITE,
    trailingSlash: "never",
    integrations: [
        // todo: this default sitemap is including "hidden" pages which shouldn't appear
        // These pages don't have anything private/secret, but should still be "unlisted" where possible
        sitemap()
    ]
});