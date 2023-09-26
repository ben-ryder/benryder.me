import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";


export interface ProjectTag {
	text: string
	slug: string
	projects: Project[]
}

export interface BlogPostTag {
	text: string
	slug: string
	blogPosts: BlogPost[]
}
