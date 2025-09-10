import type { Loader } from 'astro/loaders';
import directus from "@lib/directus.ts";
import {readItems} from "@directus/sdk";
import {reference, z} from "astro:content";

export const ProjectSchema = z.object({
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
    product_url: z.string().url().optional(),
    repository_url: z.string().url().optional(),
    related_projects: z.array(reference('projects')).optional(),
    related_posts: z.array(reference('posts')).optional(),
})
export type ProjectSchema = z.infer<typeof ProjectSchema>;

export function projectsLoader(): Loader {
    return {
        name: 'projects-loader',
        schema: ProjectSchema,
        async load({renderMarkdown, store}) {
            const projects = await directus.request(readItems("projects"));
            store.clear();

            for (const project of projects) {
                store.set({
                    id: project.slug,
                    data: project,
                    // Assume each entry has a 'content' field with markdown content
                    rendered: await renderMarkdown(project.content ?? ''),
                });
            }
        },
    };
}