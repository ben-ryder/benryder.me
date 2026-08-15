import type { CollectionEntry } from 'astro:content';

type ContentCollections = CollectionEntry<'pages'> | CollectionEntry<'projects'> | CollectionEntry<'posts'>;

export function filterPublished(content: ContentCollections) {
    return content.data.status === "published"
}

export function filterPublishedOrHidden(content: ContentCollections) {
    return content.data.status === "published" || content.data.status === "hidden";
}
