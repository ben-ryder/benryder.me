import type {Project} from "@lib/api/types/content/project.ts";
import type {Tag} from "@lib/api/types/content/tag.ts";

export interface BlogPost {
	id: string
	createdAt: string
	updatedAt: string
	publishedAt: string

	title: string
	slug: string
	description: string
	contentHtml: string

	isFeatured?: boolean
	tags: Tag[]

	relatedProjects: Project[]
	relatedBlogPosts: BlogPost[]
}
