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
    related_projects: z.array(reference('projects')),
    related_posts: z.array(reference('posts')),
})
export type PostSchema = z.infer<typeof PostSchema>;

export function postsLoader(): Loader {
    return {
        name: 'posts-loader',
        schema: PostSchema,
        async load({renderMarkdown, store}) {
            const posts = await directus.request(readItems("posts", {
                filter: {status: {_eq: "published"}},
                sort: ['-created_at'],
                fields: ["*", "related_projects.projects_id.*", "related_posts.related_posts_id.*"]
            }));
            store.clear();

            for (const cmsPost of posts) {
                const post = preProcessPost(cmsPost)
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

// todo: improve typing/conversion layer between raw CMS and processed data.
// todo: add computed fields like reading time here?
function preProcessPost(post: any): PostSchema {
    return {
        ...post,
        related_posts: post.related_posts.map((p: any) => (p.related_posts_id)),
        related_projects: post.related_projects.map((p: any) => (p.projects_id))
    }
}
