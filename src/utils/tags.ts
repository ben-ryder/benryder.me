import {getCollection} from "astro:content";

export async function getAllProjectTags() {
    const allProjects = await getCollection("projects");
    const projectTags = allProjects
        .filter((project) => {
            return project.data.status === 'published'
        })
        .reduce((tags: Set<string>, project) => {
            if (project.data.tags) {
                for (const tag of project.data.tags) {
                    if (!tags.has(tag)) {
                        tags.add(tag)
                    }
                }
            }

            return tags;
        }, new Set<string>())

    return Array.from(projectTags.keys())
        .sort((a, b) => a.localeCompare(b));
}

export async function getAllPostTags() {
    const allPosts = await getCollection("posts");
    const postTags = allPosts
        .filter((post) => {
            return post.data.status === 'published'
        })
        .reduce((tags: Set<string>, post) => {
            if (post.data.tags) {
                for (const tag of post.data.tags) {
                    if (!tags.has(tag)) {
                        tags.add(tag)
                    }
                }
            }

            return tags;
        }, new Set<string>())

    return Array.from(postTags.keys())
        .sort((a, b) => a.localeCompare(b));
}

export async function getAllTags() {
    const projectTags = await getAllProjectTags()
    const postTags = await getAllPostTags()

    const combinedTags = new Set([...projectTags, ...postTags])
    return Array.from(combinedTags.keys())
        .sort((a, b) => a.localeCompare(b));
}
