import {defineCollection, reference} from 'astro:content';
import {z} from "astro/zod";
import {glob, file} from "astro/loaders";
import { JColourVariantsList } from "@ben-ryder/jigsaw-react"

export const ContentMetadata = z.object({
	createdAt: z.string(),
	updatedAt: z.string().nullable(),
	status: z.enum(['draft', 'hidden', 'published', 'archived']),
})
export type ContentMetadata = z.infer<typeof ContentMetadata>;

export const PageSchema = ContentMetadata.extend({
	path: z.string(),
	name: z.string(),
	description: z.string().optional(),
})
export type PageSchema = z.infer<typeof PageSchema>;

export const BlogPostsSchema = ContentMetadata.extend({
	slug: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	featured: z.boolean(),
	relatedProjects: z.array(reference('projects')).nullable(),
	relatedGuides: z.array(reference('guides')).nullable(),
	relatedBlogPosts: z.array(reference('blog-posts')).nullable(),
})
export type BlogPostsSchema = z.infer<typeof BlogPostsSchema>;

export const GuidesSchema = ContentMetadata.extend({
	slug: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	featured: z.boolean(),
	relatedProjects: z.array(reference('projects')).nullable(),
	relatedGuides: z.array(reference('guides')).nullable(),
	relatedBlogPosts: z.array(reference('blog-posts')).nullable(),
})
export type GuidesSchema = z.infer<typeof GuidesSchema>;

export const ProjectsSchema = ContentMetadata.extend({
	slug: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	featured: z.boolean(),
	productUrl: z.url().nullable(),
	repositoryUrl: z.url().nullable(),
	relatedProjects: z.array(reference('projects')).nullable(),
	relatedGuides: z.array(reference('guides')).nullable(),
	relatedBlogPosts: z.array(reference('blog-posts')).nullable(),
})
export type ProjectsSchema = z.infer<typeof ProjectsSchema>;

export const TagColours = z.enum(JColourVariantsList);
export type TagColours = z.infer<typeof TagColours>;
export const TagsSchema = z.object({
	id: z.string(),
	colour: TagColours.optional(),
})
export type TagsSchema = z.infer<typeof TagsSchema>;

const tagsCollection = defineCollection({
	loader: file("../cms/content/tags.json"),
	schema: TagsSchema,
});

const pagesCollection = defineCollection({
	loader: glob({ base: "../cms/content/Pages", pattern: "**/*.md" }),
	schema: PageSchema,
})

const blogPostsCollection = defineCollection({
	loader: glob({ base: "../cms/content/Blog Posts", pattern: "**/*.md" }),
	schema: BlogPostsSchema,
})

const guidesCollection = defineCollection({
	loader: glob({ base: "../cms/content/Guides", pattern: "**/*.md" }),
	schema: GuidesSchema,
})

const projectsCollection = defineCollection({
	loader: glob({ base: "../cms/content/Projects", pattern: "**/*.md" }),
	schema: ProjectsSchema,
})

export const collections = {
	'tags': tagsCollection,
	'pages': pagesCollection,
	'projects': projectsCollection,
	'guides': guidesCollection,
	'blog-posts': blogPostsCollection,
};
