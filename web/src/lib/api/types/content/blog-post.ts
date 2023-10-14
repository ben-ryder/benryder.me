import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPostTag} from "@lib/api/types/content/tag.ts";

export interface BlogPost {
	id: string
	dateCreated: Date
	datePublished?: Date | null
	dateUpdated?: Date | null

	title: string
	slug: string
	description: string
	contentHtml: string

	isFeatured?: boolean
	tags: BlogPostTag[]

	relatedProjects: Project[]
	relatedBlogPosts: BlogPost[]
}
