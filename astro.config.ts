import {defineConfig, envField} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from "vite";

const { SITE_BASE_URL } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
    site: SITE_BASE_URL,
    trailingSlash: "never",
    integrations: [
        // todo: this default sitemap is including "hidden" pages which shouldn't appear
        // These pages don't have anything private/secret, but should still be "unlisted" where possible
        sitemap()
    ],
    vite: {
        css: {
            transformer: "lightningcss"
        }
    }
});
