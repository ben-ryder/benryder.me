import {getEntry} from "astro:content";
import type { CollectionEntry } from 'astro:content';

export async function getRelatedContent(content: CollectionEntry<'projects'> | CollectionEntry<'posts'>) {
    const relatedProjects = []
    if (content.data.relatedProjects) {
        for (const {id} of content.data.relatedProjects) {
            const project = await getEntry("projects", id)
            if (project?.data.status === "published") {
                relatedProjects.push(project)
            }
        }
    }

    const relatedPosts = []
    if (content.data.relatedPosts) {
        for (const {id} of content.data.relatedPosts) {
            const post = await getEntry("posts", id)
            if (post?.data.status === "published") {
                relatedPosts.push(post)
            }
        }
    }

    return {relatedProjects, relatedPosts}
}
