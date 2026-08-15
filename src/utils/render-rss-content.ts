import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { parse as htmlParser } from "node-html-parser";
import { join as path_join, parse as path_parse } from "node:path"
import { site } from "astro:config/client"
import {getImage} from "astro:assets";

// Loading dynamic import of images, used to lookup image paths to load via Astro
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
    "/content/**/*.{jpeg,jpg,png,gif}"
);


/**
 * Render markdown content into an RSS friendly format.
 * This includes processing links and image to point to the website rather than being relative.
 *
 * Thanks to https://billyle.dev/posts/adding-rss-feed-content-and-fixing-markdown-image-paths-in-astro
 * for some helpful details on this approach of processing the HTML and images.
 *
 * @param sourceFile
 * @param markdown
 */
export async function renderRssContent(sourceFile: string, markdown: string): Promise<string> {
    if (!site) {
        throw new Error("Unable to generate RSS feed without site URL set in configuration");
    }

    const markdownParser = new MarkdownIt();
    const html = markdownParser.render(markdown ?? "")

    const htmlDom = htmlParser.parse(html);

    // Convert relative images to add full website path and use Astro's processed image path
    const images = htmlDom.querySelectorAll("img");
    for (const image of images) {
        const src = image.getAttribute("src")!;
        if (src.startsWith("./")) {
            const filePath = path_join("/", path_parse(sourceFile).dir, src);
            const imagePath = await imagesGlob[filePath]?.()?.then(
                (res) => res.default,
            );
            if (imagePath) {
                const astroAsset = await getImage({ src: imagePath });
                // In dev mode the src will be "_image?href=...." but for production builds it will be "/_astro/<file>.<hash>.webp" as expected.
                image.setAttribute("src", site + astroAsset.src);
            }
            else {
                console.error(`[rss] Unable to convert image to Astro path during RSS content generation (${sourceFile})`);
            }
        }
    }

    // Convert relative links to add full website path
    const anchors = htmlDom.querySelectorAll("a");
    for (const anchor of anchors) {
        const href = anchor.getAttribute("href")!;
        if (href.startsWith("/")) {
            anchor.setAttribute("href", site + href);
        }
    }

    return sanitizeHtml(htmlDom.toString(), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    })
}
