import type { Loader } from 'astro/loaders';
import directus from "@lib/directus.ts";
import {readItems} from "@directus/sdk";
import {reference, z} from "astro:content";

export const ProjectSchema = z.object({
    // Metadata
    id: z.string().uuid(),
    published_at: z.string().nullable(),
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
    related_projects: z.array(reference('projects')),
    related_posts: z.array(reference('posts')),
})
export type ProjectSchema = z.infer<typeof ProjectSchema>;

export function projectsLoader(): Loader {
    return {
        name: 'projects-loader',
        schema: ProjectSchema,
        async load({renderMarkdown, store}) {
            const projects = await directus.request(readItems("projects", {
                filter: {status: {_eq: "published"}},
                sort: ['-published_at'],
                fields: ["*", "related_projects.related_projects_id.*", "related_posts.posts_id.*"]
            }));
            store.clear();

            for (const cmsProject of projects) {
                const project = preProcessProject(cmsProject)
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

// todo: improve typing/conversion layer between raw CMS and processed data.
// todo: add computed fields like reading time here?
function preProcessProject(project: any): ProjectSchema {
    return {
        ...project,
        related_projects: project.related_projects.map((p: any) => (p.related_projects_id)),
        related_posts: project.related_posts.map((p: any) => (p.posts_id)),
    }
}
