import {defineCollection, reference} from 'astro:content';
import {z} from "astro/zod";
import {glob} from "astro/loaders";

/**
 * Global Types
 */
export const ContentMetadata = z.object({
	publishedAt: z.date()
})
export type ContentMetadata = z.infer<typeof ContentMetadata>;

export const TagsSchema = z.array(z.string())
export type TagsSchema = z.infer<typeof TagsSchema>;

/**
 * "Config" Content
 * Singleton content loaded for specific pages such as the homepage, contact, header/footer etc.
 */
export const ConfigSchema = z.object({})
export type ConfigSchema = z.infer<typeof ConfigSchema>;

const configCollection = defineCollection({
	loader: glob({ base: "./content/Config", pattern: "**/*.md" }),
	schema: ConfigSchema,
})

/**
 * Pages
 */
export const PageSchema = ContentMetadata.extend({
	path: z.string(),
	name: z.string(),
	description: z.string().nullish(),
	status: z.enum(['draft', 'hidden', 'published', 'archived']),
})
export type PageSchema = z.infer<typeof PageSchema>;

const pagesCollection = defineCollection({
	loader: glob({ base: "./content/Pages", pattern: "**/*.md" }),
	schema: PageSchema,
})

/**
 * Posts
 */
export const PostsSchema = ContentMetadata.extend({
	slug: z.string(),
	name: z.string(),
	description: z.string().nullish(),
	featured: z.boolean(),
	tags: TagsSchema.nullish(),
	status: z.enum(['draft', 'published', 'archived']),
	relatedProjects: z.array(reference('projects')).nullish(),
	relatedPosts: z.array(reference('posts')).nullish(),
})
export type PostsSchema = z.infer<typeof PostsSchema>;

const postsCollection = defineCollection({
	loader: glob({ base: "./content/Posts", pattern: "**/*.md" }),
	schema: PostsSchema,
})

/**
 * Projects
 */
export const ProjectsSchema = ContentMetadata.extend({
	slug: z.string(),
	name: z.string(),
	description: z.string().nullish(),
	featured: z.boolean(),
	productUrl: z.url().nullish(),
	repositoryUrl: z.url().nullish(),
	tags: TagsSchema.nullish(),
	status: z.enum(['draft', 'published', 'archived']),
	relatedProjects: z.array(reference('projects')).nullish(),
	relatedPosts: z.array(reference('posts')).nullish(),
})
export type ProjectsSchema = z.infer<typeof ProjectsSchema>;

const projectsCollection = defineCollection({
	loader: glob({ base: "./content/Projects", pattern: "**/*.md" }),
	schema: ProjectsSchema,
})

export const collections = {
	'config': configCollection,
	'pages': pagesCollection,
	'projects': projectsCollection,
	'posts': postsCollection,
};
