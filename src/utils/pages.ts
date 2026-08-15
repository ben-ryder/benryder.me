import { site } from "astro:config/client";
import { getCollection } from "astro:content";

export async function getHiddenPageUrls() {
    const allPages = await getCollection('pages');
    return allPages
        .filter((page) => page.data.status === 'hidden')
        .map((page) => site + page.id)
}
