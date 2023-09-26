import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    server: {
        port: 4321,
        host: "local.benryder.me"
    }
});
