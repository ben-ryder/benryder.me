import {getCollection} from "astro:content";
import {filterPublished} from "./filter-published.ts";

export async function getAllProjects() {
    const allProjects = await getCollection("projects");
    return allProjects
        .filter(filterPublished)
        .sort((a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1)
}

export async function getFeaturedProjects() {
    const posts = await getCollection("projects");
    return posts
        .filter((post) => {
            return post.data.status === 'published' && post.data.featured
        })
        .sort((a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1)
}
