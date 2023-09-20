import type {Page} from "@lib/api/types/content/page.ts";
import {convertMarkdownToHTML} from "@lib/api/utils/convert-markdown.ts";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Link} from "@lib/api/types/content/link.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {
	StrapiBlogPost, StrapiBlogPostTag,
	StrapiFooter,
	StrapiHeader,
	StrapiHomepage,
	StrapiLinkLink,
	StrapiPage, StrapiProject, StrapiProjectTag,
	StrapiSocialSocialLink, StrapiTag
} from "@lib/api/types/strapi";
import type {Homepage} from "@lib/api/types/content/homepage.ts";
import type {SocialLink} from "@lib/api/types/content/social-link.ts";
import type {BlogPostTag} from "@lib/api/types/content/blog-post-tag.ts";
import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";
import type {Tag} from "@lib/api/types/content/tag.ts";

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
	 *
	 * @param contextName
	 * @param context
	 */
	static throwMissingDataError(contextName: string, context?: any) {
		console.log(`========= MISSING DATA - ${contextName} =========`);
		console.log(context);
		throw new Error(`Encountered unexpected null value while querying Strapi data`)
	}

	static convertLinks(strapiLinks: StrapiLinkLink[]): Link[] {
		return strapiLinks.map(strapiLink => {
			if (
				!strapiLink?.url ||
				!strapiLink?.text
			) {
				throw StrapiConverter.throwMissingDataError("Link", strapiLink)
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
			!strapiPage?.attributes.title ||
			!strapiPage?.attributes.path ||
			!strapiPage?.attributes.content
		) {
			throw StrapiConverter.throwMissingDataError("Page", strapiPage)
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
		if (
			!strapiFooter?.attributes.sign_off
		) {
			throw StrapiConverter.throwMissingDataError("Footer", strapiFooter)
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
			!strapiHeader?.attributes.noscript_message
		) {
			throw StrapiConverter.throwMissingDataError("Header", strapiHeader)
		}

		const messageNoScriptHtml = await convertMarkdownToHTML(strapiHeader.attributes.noscript_message);

		let messagePromoHtml = null;
		if (strapiHeader.attributes.promo_message) {
			messagePromoHtml = await convertMarkdownToHTML(strapiHeader.attributes.promo_message);
		}

		return {
			id: strapiHeader.id.toString(),
			messagePromoHtml: messagePromoHtml,
			messageNoScriptHtml: messageNoScriptHtml,
			navigationLinks: StrapiConverter.convertLinks(strapiHeader.attributes.navigation_links),
		}
	}

	static convertSocialLinks(strapiSocialLinks: StrapiSocialSocialLink[]): SocialLink[] {
		return strapiSocialLinks.map(strapiSocialLink => {
			if (
				!strapiSocialLink?.url ||
				!strapiSocialLink?.text ||
				!strapiSocialLink?.icon
			) {
				throw StrapiConverter.throwMissingDataError("Social Link", strapiSocialLink)
			}

			return {
				id: strapiSocialLink.id.toString(),
				text: strapiSocialLink.text,
				url: strapiSocialLink.url,
				icon: strapiSocialLink.icon
			}
		})
	}

	static async convertStrapiHomepage(strapiHomepage: StrapiHomepage): Promise<Homepage> {
		if (
			!strapiHomepage?.attributes.greeter_title ||
			!strapiHomepage?.attributes.greeter_content
		) {
			throw StrapiConverter.throwMissingDataError("Homepage", strapiHomepage)
		}

		const greeterContentHtml = await convertMarkdownToHTML(strapiHomepage.attributes.greeter_content);

		return {
			greeterTitle: strapiHomepage.attributes.greeter_title,
			greeterContentHtml: greeterContentHtml,
			socialLinks: StrapiConverter.convertSocialLinks(strapiHomepage.attributes.social_links),
		}
	}

	static async convertStrapiTag(strapiTag: StrapiProjectTag | StrapiBlogPostTag): Promise<Tag> {
		if (
			!strapiTag?.attributes.text ||
			!strapiTag?.attributes.slug
		) {
			throw StrapiConverter.throwMissingDataError("Tag", strapiTag)
		}

		return {
			id: strapiTag.id.toString(),
			text: strapiTag.attributes.text,
			slug: strapiTag.attributes.slug,
		}
	}

	static async convertStrapiTags(strapiTags: (StrapiProjectTag | StrapiBlogPostTag)[] | null): Promise<Tag[]> {
		if (!strapiTags) {
			return []
		}

		const tags: Tag[] = [];
		for (const strapiTag of strapiTags) {
			const tag = await StrapiConverter.convertStrapiTag(strapiTag);
			tags.push(tag)
		}
		return tags;
	}

	static async convertStrapiProject(strapiProject: StrapiProject): Promise<Project> {
		if (
			!strapiProject?.attributes.name ||
			!strapiProject?.attributes.slug ||
			!strapiProject?.attributes.description ||
			!strapiProject?.attributes.content
		) {
			throw StrapiConverter.throwMissingDataError("Project", strapiProject)
		}

		const contentHtml = await convertMarkdownToHTML(strapiProject.attributes.content);
		const tags = await StrapiConverter.convertStrapiTags(strapiProject.attributes.tags?.data);
		const relatedProjects = await StrapiConverter.convertStrapiProjects(strapiProject.attributes.related_projects?.data);
		const relatedBlogPosts = await StrapiConverter.convertStrapiBlogPosts(strapiProject.attributes.related_blog_posts?.data);

		return {
			id: strapiProject.id.toString(),
			name: strapiProject.attributes.name,
			slug: strapiProject.attributes.slug,
			description: strapiProject.attributes.description,
			contentHtml: contentHtml,
			releaseDate: strapiProject.attributes.release_date,
			productUrl: strapiProject.attributes.product_url,
			repositoryUrl: strapiProject.attributes.repository_url,
			isFeatured: !!strapiProject.attributes.featured,
			tags,
			relatedProjects,
			relatedBlogPosts,
			createdAt: strapiProject.attributes.createdAt,
			updatedAt: strapiProject.attributes.updatedAt,
			publishedAt: strapiProject.attributes.publishedAt
		}
	}

	static async convertStrapiProjects(strapiProjects: StrapiProject[] | null): Promise<Project[]> {
		if (!strapiProjects) {
			return []
		}

		const projects: Project[] = [];
		for (const strapiProject of strapiProjects) {
			const project = await StrapiConverter.convertStrapiProject(strapiProject);
			projects.push(project)
		}
		return projects;
	}

	static async convertStrapiBlogPost(strapiBlogPost: StrapiBlogPost): Promise<BlogPost> {
		if (
			!strapiBlogPost?.attributes.title ||
			!strapiBlogPost?.attributes.slug ||
			!strapiBlogPost?.attributes.description ||
			!strapiBlogPost?.attributes.content
		) {
			throw StrapiConverter.throwMissingDataError("Blog Post", strapiBlogPost)
		}

		const contentHtml = await convertMarkdownToHTML(strapiBlogPost.attributes.content);
		const tags = await StrapiConverter.convertStrapiTags(strapiBlogPost.attributes.tags?.data);
		const relatedProjects = await StrapiConverter.convertStrapiProjects(strapiBlogPost.attributes.related_projects?.data);
		const relatedBlogPosts = await StrapiConverter.convertStrapiBlogPosts(strapiBlogPost.attributes.related_blog_posts?.data);

		return {
			id: strapiBlogPost.id.toString(),
			title: strapiBlogPost.attributes.title,
			slug: strapiBlogPost.attributes.slug,
			description: strapiBlogPost.attributes.description,
			contentHtml: contentHtml,
			isFeatured: !!strapiBlogPost.attributes.featured,
			tags,
			relatedProjects,
			relatedBlogPosts,
			createdAt: strapiBlogPost.attributes.createdAt,
			updatedAt: strapiBlogPost.attributes.updatedAt,
			publishedAt: strapiBlogPost.attributes.publishedAt
		}
	}

	static async convertStrapiBlogPosts(strapiBlogPosts: StrapiBlogPost[] | null): Promise<BlogPost[]> {
		if (!strapiBlogPosts) {
			return []
		}

		const blogPosts: BlogPost[] = [];
		for (const strapiBlogPost of strapiBlogPosts) {
			const blogPost = await StrapiConverter.convertStrapiBlogPost(strapiBlogPost);
			blogPosts.push(blogPost)
		}
		return blogPosts;
	}
}
