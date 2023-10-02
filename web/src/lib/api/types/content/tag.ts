import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";
import type {JColourVariants} from "@ben-ryder/jigsaw-react";


export interface ProjectTag {
	text: string
	slug: string
	colour?: JColourVariants
	projects: Project[]
	order?: number | null
}

export interface BlogPostTag {
	text: string
	slug: string
	colour?: JColourVariants
	blogPosts: BlogPost[]
	order?: number | null
}
