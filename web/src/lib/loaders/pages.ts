import type { Loader } from 'astro/loaders';
import directus from "@lib/directus.ts";
import {readItems} from "@directus/sdk";
import {z} from "astro:content";

export const PageSchema = z.object({
    // Metadata
    id: z.string().uuid(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
    status: z.enum(['draft', 'published', 'archived']),
    // Basic data
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
})
export type PageSchema = z.infer<typeof PageSchema>;

export function pagesLoader(): Loader {
    return {
        name: 'pages-loader',
        schema: PageSchema,
        async load({renderMarkdown, store}) {
            const pages = await directus.request(readItems("pages"));
            store.clear();

            for (const page of pages) {
                store.set({
                    id: page.slug,
                    data: page,
                    // Assume each entry has a 'content' field with markdown content
                    rendered: await renderMarkdown(page.content),
                });
            }
        },
    };
}
