import type { Loader } from 'astro/loaders';
import directus from "@lib/directus.ts";
import {readItems} from "@directus/sdk";
import {reference, z} from "astro:content";

export const PostSchema = z.object({
    // Metadata
    id: z.string().uuid(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
    status: z.enum(['draft', 'published', 'archived']),
    // Basic data
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    featured: z.boolean(),
    content: z.string(),
    // Content data
    related_projects: z.array(reference('projects')).optional(),
    related_posts: z.array(reference('posts')).optional(),
})
export type PostSchema = z.infer<typeof PostSchema>;

export function postsLoader(): Loader {
    return {
        name: 'posts-loader',
        schema: PostSchema,
        async load({renderMarkdown, store}) {
            const posts = await directus.request(readItems("posts"));
            store.clear();

            for (const post of posts) {
                store.set({
                    id: post.slug,
                    data: post,
                    // Assume each entry has a 'content' field with markdown content
                    rendered: await renderMarkdown(post.content ?? ''),
                });
            }
        },
    };
}