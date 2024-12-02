import { z, defineCollection, reference } from 'astro:content';

const pagesCollection = defineCollection({
	type: 'content',
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

const blogPostsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		// Basic Data
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		// Blog post data
		isFeatured: z.boolean().optional(),
		// Timestamps
		createdAt: z.date(),
		updatedAt: z.date(),
		// Related content
		relatedBlogPosts: z.array(reference('blog-posts')).optional(),
		relatedProjects: z.array(reference('projects')).optional(),
	}),
});

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		// Basic data
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
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
	}),
});

export const collections = {
	'pages': pagesCollection,
	'projects': projectsCollection,
	'blog-posts': blogPostsCollection,
};
