import rss, {type RSSFeedItem} from '@astrojs/rss';
import type {APIContext} from "astro";
import {getAllProjects} from "../../utils/projects.ts";
import {renderRssContent} from "../../utils/render-rss-content.ts";

export async function GET(context: APIContext) {
    const projects = await getAllProjects()

    const feedItems: RSSFeedItem[] = []
    for (const project of projects) {
        // Fallback to name as RSS feed breaks if content is empty. This should never happen for production, but may impact testing etc.
        let body: string
        if (project.body) {
            body = project.body
        } else {
            console.warn(`[Projects RSS] Project '${project.id}' missing body, falling back to name to prevent invalid XML and parsing issues.`)
            body = project.data.name;
        }

        const content = await renderRssContent(project.filePath!, body);
        feedItems.push({
            title: project.data.name,
            description: project.data.description ?? undefined,
            pubDate: project.data.publishedAt,
            link: `/projects/${project.id}`,
            content: content,
            categories: project.data.tags ?? []
        })
    }

    if (!context.site) {
        throw new Error("Unable to generate RSS feed without site URL set in configuration");
    }

    return rss({
        title: 'Ben Ryder - All Projects',
        description: 'All projects from personal website of Ben Ryder',
        site: context.site,
        trailingSlash: false,
        items: feedItems,
    });
}
