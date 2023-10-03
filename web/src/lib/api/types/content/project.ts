import type {BlogPost} from "@lib/api/types/content/blog-post.ts";
import type {ProjectTag} from "@lib/api/types/content/tag.ts";

export interface Project {
	id: string
	createdAt: string
	updatedAt?: string | null

	name: string
	slug: string
	description: string
	contentHtml: string

	releaseDate?: string | null
	productUrl?: string | null
	repositoryUrl?: string | null

	isFeatured?: boolean
	tags: ProjectTag[]

	relatedProjects: Project[]
	relatedBlogPosts: BlogPost[]
}
