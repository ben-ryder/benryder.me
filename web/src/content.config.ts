import { JColourVariantsList } from '@ben-ryder/jigsaw-react';
import { z, defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

const tagColours = z.enum(JColourVariantsList)
type tagColours = z.infer<typeof tagColours>

const tagsCollection = defineCollection({
	loader: file("./src/content/tags.json"),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		colour: tagColours
	}),
});

// Ignore all markdown files that start with "_".
const markdownFilePattern = "**/[^_]*.md"

const pagesCollection = defineCollection({
	loader: glob({ pattern: markdownFilePattern, base: "./src/content/pages/" }),
	schema: z.object({
		// Metadata
		path: z.string(), // todo: ensure valid relative path
		// Basic Data
		title: z.string(),
		description: z.string(),
		// Timestamps
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: markdownFilePattern, base: "./src/content/projects/" }),
	schema: z.object({
		// Basic data
		title: z.string(),
		description: z.string(),
		tags: z.array(reference('tags')),
		// Project data
		isFeatured: z.boolean().optional(),
		productUrl: z.string().url().optional(),
		repositoryUrl: z.string().url().optional(),
		// Timestamps
		createdAt: z.date(),
		updatedAt: z.date(),
		// Related content
		relatedProjects: z.array(reference('projects')).optional(),
		relatedBlogPosts: z.array(reference('blog-posts')).optional(),
		relatedGuides: z.array(reference('guides')).optional(),
	}),
});

const blogPostsCollection = defineCollection({
	loader: glob({ pattern: markdownFilePattern, base: "./src/content/blog-posts/" }),
	schema: z.object({
		// Basic Data
		title: z.string(),
		description: z.string(),
		tags: z.array(reference('tags')),
		// Blog post data
		isFeatured: z.boolean().optional(),
		// Timestamps
		createdAt: z.date(),
		updatedAt: z.date(),
		// Related content
		relatedProjects: z.array(reference('projects')).optional(),
		relatedBlogPosts: z.array(reference('blog-posts')).optional(),
		relatedGuides: z.array(reference('guides')).optional(),
	}),
});

const guidesCollection = defineCollection({
	loader: glob({ pattern: markdownFilePattern, base: "./src/content/guides/" }),
	schema: z.object({
		// Basic Data
		title: z.string(),
		description: z.string(),
		tags: z.array(reference('tags')),
		// Blog post data
		isFeatured: z.boolean().optional(),
		// Timestamps
		createdAt: z.date(),
		updatedAt: z.date(),
		// Related content
		relatedProjects: z.array(reference('projects')).optional(),
		relatedBlogPosts: z.array(reference('blog-posts')).optional(),
		relatedGuides: z.array(reference('guides')).optional(),
	}),
});

export const collections = {
	'tags': tagsCollection,
	'pages': pagesCollection,
	'projects': projectsCollection,
	'blog-posts': blogPostsCollection,
	'guides': guidesCollection,
};
