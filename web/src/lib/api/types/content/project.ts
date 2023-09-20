import type {BlogPost} from "@lib/api/types/content/blog-post.ts";
import type {Tag} from "@lib/api/types/content/tag.ts";

export interface Project {
	id: string
	createdAt: string
	updatedAt: string
	publishedAt: string

	name: string
	slug: string
	description: string
	contentHtml: string

	releaseDate?: string
	productUrl?: string | null
	repositoryUrl?: string | null

	isFeatured?: boolean
	tags: Tag[]

	relatedProjects: Project[]
	relatedBlogPosts: BlogPost[]
}
