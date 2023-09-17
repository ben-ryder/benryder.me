import type {Page} from "@lib/api/types/content/page.ts";
import {convertMarkdownToHTML} from "@lib/api/utils/convert-markdown.ts";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Link} from "@lib/api/types/content/link.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {StrapiFooter, StrapiHeader, StrapiLinkLink, StrapiPage} from "@lib/api/types/strapi";

/**
 * A helper to convert between raw Strapi data and generalised typed content for the website.
 * This creates a separation between Strapi and the website, with the goal of making
 * it easier to switch out the CMS in the future if required.
 */
export class StrapiConverter {

	/**
	 * Strapi's required fields are only required when content is published, so generated types
	 * always have 'string | null' as the data may not exist when querying draft content.
	 * This method can be used to defend against null values, and ensure types are as expected at runtime.
	 * @param context
	 */
	static throwMissingDataError(context: any) {
		console.log(context);
		throw new Error("Encountered unexpected null value while querying Strapi data.")
	}

	static convertLinks(strapiLinks: StrapiLinkLink[]): Link[] {
		return strapiLinks.map(strapiLink => {
			if (!strapiLink.url || !strapiLink.text) {
				throw StrapiConverter.throwMissingDataError(strapiLink)
			}

			return {
				id: strapiLink.id.toString(),
				text: strapiLink.text,
				url: strapiLink.url
			}
		})
	}

	static async convertStrapiPage(strapiPage: StrapiPage): Promise<Page> {
		if (
			!strapiPage.attributes.title ||
			!strapiPage.attributes.path ||
			!strapiPage.attributes.content
		) {
			throw StrapiConverter.throwMissingDataError(strapiPage)
		}

		const contentHtml = await convertMarkdownToHTML(strapiPage.attributes.content);

		return {
			id: strapiPage.id.toString(),
			title: strapiPage.attributes.title,
			path: strapiPage.attributes.path,
			contentHtml,
			createdAt: strapiPage.attributes.createdAt,
			updatedAt: strapiPage.attributes.updatedAt,
			publishedAt: strapiPage.attributes.publishedAt
		}
	}

	static async convertStrapiFooter(strapiFooter: StrapiFooter): Promise<Footer> {
		if (!strapiFooter.attributes.sign_off) {
			throw StrapiConverter.throwMissingDataError(strapiFooter)
		}

		const signOffHtml = await convertMarkdownToHTML(strapiFooter.attributes.sign_off);

		return {
			id: strapiFooter.id.toString(),
			signOffHtml,
			navigationLinks: StrapiConverter.convertLinks(strapiFooter.attributes.navigation_links),
		}
	}

	static async convertStrapiHeader(strapiHeader: StrapiHeader): Promise<Header> {
		if (
			!strapiHeader.attributes.promo_message ||
			!strapiHeader.attributes.noscript_message
		) {
			throw StrapiConverter.throwMissingDataError(strapiHeader)
		}

		return {
			id: strapiHeader.id.toString(),
			promoMessage: strapiHeader.attributes.promo_message,
			noScriptMessage: strapiHeader.attributes.noscript_message,
			navigationLinks: StrapiConverter.convertLinks(strapiHeader.attributes.navigation_links),
		}
	}
}
