import {defineConfig, envField, fontProviders} from 'astro/config';
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
    },
    fonts: [{
        provider: fontProviders.local(),
        name: "Lora",
        cssVariable: "--font-lora",
        fallbacks: ["serif"],
        options: {
            variants: [
                {
                    src: ["./src/assets/fonts/Lora/Variable.ttf"],
                    weight: "400 700",
                    style: "normal"
                },
                {
                    src: ["./src/assets/fonts/Lora/Variable-Italic.ttf"],
                    weight: "400 700",
                    style: "italic"
                }
            ]
        }
    }]
});
