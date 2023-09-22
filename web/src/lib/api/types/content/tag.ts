import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";

export interface Tag {
	text: string
	slug: string
}

export interface TagWithProjects {
	text: string
	slug: string
	projects: Project[]
}

export interface TagWithBlogPosts {
	text: string
	slug: string
	blogPosts: BlogPost[]
}
