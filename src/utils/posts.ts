import {getCollection} from "astro:content";
import {filterPublished} from "./filter-published.ts";

export async function getAllPosts() {
    const posts = await getCollection("posts");
    return posts
        .filter(filterPublished)
        .sort((a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1)
}

export async function getFeaturedPosts() {
    const posts = await getCollection("posts");
    return posts
        .filter((post) => {
            return post.data.status === 'published' && post.data.featured
        })
        .sort((a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1)
}
