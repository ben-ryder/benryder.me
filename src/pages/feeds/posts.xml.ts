import rss, {type RSSFeedItem} from '@astrojs/rss';
import type {APIContext} from "astro";
import {getAllPosts} from "../../utils/posts.ts";
import {renderRssContent} from "../../utils/render-rss-content.ts";

export async function GET(context: APIContext) {
    const posts = await getAllPosts()
    const feedItems: RSSFeedItem[] = []
    for (const post of posts) {
        const content = await renderRssContent(post.filePath!, post.body!);
        feedItems.push({
            title: post.data.name,
            description: post.data.description ?? undefined,
            pubDate: post.data.publishedAt,
            link: `/posts/${post.id}`,
            content: content,
            categories: post.data.tags ?? []
        })
    }

    if (!context.site) {
        throw new Error("Unable to generate RSS feed without site URL set in configuration");
    }

    return rss({
        title: 'Ben Ryder - All Posts',
        description: 'All posts from the personal website of Ben Ryder',
        site: context.site,
        trailingSlash: false,
        items: feedItems,
        stylesheet: "/rss-style.xsl",
    });
}
