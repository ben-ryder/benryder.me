import type {StrapiPage} from "@lib/api/types/strapi/content-types/page";
import type {Page} from "@lib/api/types/content/page.ts";
import {convertMarkdownToHTML} from "@lib/api/utils/convert-markdown.ts";
import type {StrapiFooter} from "@lib/api/types/strapi/content-types/footer";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {StrapiLink} from "@lib/api/types/strapi/components/link";
import type {Link} from "@lib/api/types/content/link.ts";
import type {StrapiHeader} from "@lib/api/types/strapi/content-types/header";
import type {Header} from "@lib/api/types/content/header.ts";

/**
 * A helper to convert between raw Strapi data and generalised typed content for the website.
 * This creates a separation between Strapi and the website, with the goal of making
 * it easier to switch out the CMS used in the future if required.
 */
export class StrapiConverter {
	static convertLinks(strapiLinks: StrapiLink[]): Link[] {
		return strapiLinks.map(strapiLink => {
			return {
				text: strapiLink.text,
				url: strapiLink.url
			}
		})
	}

	static async convertStrapiPage(strapiPage: StrapiPage): Promise<Page> {
		const contentHtml = await convertMarkdownToHTML(strapiPage.attributes.content);

		return {
			id: strapiPage.id,
			title: strapiPage.attributes.title,
			path: strapiPage.attributes.path,
			contentHtml,
			createdAt: strapiPage.attributes.createdAt,
			updatedAt: strapiPage.attributes.updatedAt,
			publishedAt: strapiPage.attributes.publishedAt
		}
	}

	static async convertStrapiFooter(strapiFooter: StrapiFooter): Promise<Footer> {
		const signOffHtml = await convertMarkdownToHTML(strapiFooter.attributes.sign_off);

		return {
			id: strapiFooter.id,
			signOffHtml,
			navigationLinks: StrapiConverter.convertLinks(strapiFooter.attributes.navigation_links),
			createdAt: strapiFooter.attributes.createdAt,
			updatedAt: strapiFooter.attributes.updatedAt,
		}
	}

	static async convertStrapiHeader(strapiHeader: StrapiHeader): Promise<Header> {
		return {
			id: strapiHeader.id,
			promoMessage: strapiHeader.attributes.promo_message,
			noScriptMessage: strapiHeader.attributes.noscript_message,
			navigationLinks: StrapiConverter.convertLinks(strapiHeader.attributes.navigation_links),
			createdAt: strapiHeader.attributes.createdAt,
			updatedAt: strapiHeader.attributes.updatedAt,
		}
	}
}
