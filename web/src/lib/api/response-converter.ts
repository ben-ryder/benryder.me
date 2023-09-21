import type {Page} from "@lib/api/types/content/page.ts";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {Homepage} from "@lib/api/types/content/homepage.ts";
import type {SocialLink} from "@lib/api/types/content/social-link.ts";
import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";
import type {Tag} from "@lib/api/types/content/tag.ts";

import {convertMarkdownToHTML} from "@lib/api/utils/convert-markdown.ts";
import type {
	DirectusBlogPostTag,
	DirectusFooter,
	DirectusHeader, DirectusHome,
	DirectusLink,
	DirectusPage, DirectusProject, DirectusProjectProjectTags, DirectusProjectTag, DirectusProjectTags,
	DirectusSocialLink
} from "@lib/api/types/directus/types.ts";
import type {Link} from "@lib/api/types/content/link.ts";


/**
 * A helper to convert between raw API data and generalised typed content for the website.
 * This creates a separation between the API and the website, with the goal of making
 * it easier to switch out the CMS in the future if required.
 */
export class ResponseConverter {

	static async convertPage(apiPage: DirectusPage): Promise<Page> {
		const contentHtml = await convertMarkdownToHTML(apiPage.content);

		return {
			id: apiPage.id,
			title: apiPage.title,
			path: apiPage.path,
			contentHtml,
			createdAt: apiPage.date_created,
			updatedAt: apiPage.date_updated
		}
	}

	static async convertFooter(apiFooter: DirectusFooter): Promise<Footer> {
		const signOffHtml = await convertMarkdownToHTML(apiFooter.signoff_content);

		return {
			signOffHtml,
			navigationLinks: ResponseConverter.convertLinks(apiFooter.navigation_links)
		}
	}

	static async convertHeader(apiHeader: DirectusHeader): Promise<Header> {
		const messageNoScriptHtml = await convertMarkdownToHTML(apiHeader.message_noscript);

		let messagePromoHtml = null;
		if (apiHeader.message_promo) {
			messagePromoHtml = await convertMarkdownToHTML(apiHeader.message_promo);
		}

		return {
			messagePromoHtml: messagePromoHtml,
			messageNoScriptHtml: messageNoScriptHtml,
			navigationLinks: ResponseConverter.convertLinks(apiHeader.navigation_links),
		}
	}

	static convertSocialLinks(apiSocialLinks: { social_link_id: DirectusSocialLink }[]): SocialLink[] {
		return apiSocialLinks.map(apiSocialLink => {
			return {
				text: apiSocialLink.social_link_id.text,
				url: apiSocialLink.social_link_id.url,
				iconSvg: apiSocialLink.social_link_id.icon
			}
		})
	}

	static convertLinks(apiLinks: { link_id: DirectusLink }[]): Link[] {
		return apiLinks.map(apiLink => {
			return {
				text: apiLink.link_id.text,
				url: apiLink.link_id.url
			}
		})
	}

	static async convertHomepage(apiHomepage: DirectusHome): Promise<Homepage> {
		const greeterContentHtml = await convertMarkdownToHTML(apiHomepage.greeter_content);

		return {
			greeterTitle: apiHomepage.greeter_title,
			greeterContentHtml: greeterContentHtml,
			socialLinks: ResponseConverter.convertSocialLinks(apiHomepage.social_links),
		}
	}

	static convertProjectTags(projectTags: { project_tags_id: DirectusProjectTag }[]): Tag[] {
		return projectTags.map(projectTag => {
			return {
				text: projectTag.project_tags_id.text,
				slug: projectTag.project_tags_id.slug,
			}
		})
	}

	static convertBlogPostTags(projectTags: { blog_post_tags_id: DirectusBlogPostTag }[]): Tag[] {
		return projectTags.map(projectTag => {
			return {
				text: projectTag.blog_post_tags_id.text,
				slug: projectTag.blog_post_tags_id.slug,
			}
		})
	}

	static async convertProject(apiProject: DirectusProject): Promise<Project> {
		const contentHtml = await convertMarkdownToHTML(apiProject.content);
		const tags = await ResponseConverter.convertProjectTags(apiProject.tags);

		return {
			id: apiProject.id,
			name: apiProject.name,
			slug: apiProject.slug,
			description: apiProject.description,
			contentHtml: contentHtml,
			releaseDate: apiProject.release_date,
			productUrl: apiProject.product_url,
			repositoryUrl: apiProject.repository_url,
			isFeatured: apiProject.featured,
			tags,
			relatedProjects: [],
			relatedBlogPosts: [],
			createdAt: apiProject.date_created,
			updatedAt: apiProject.date_updated,
		}
	}

	static async convertProjects(apiProjects: Project[] | null): Promise<Project[]> {
		if (!apiProjects) {
			return []
		}

		const projects: Project[] = [];
		for (const apiProject of apiProjects) {
			const project = await ResponseConverter.convertProject(apiProject);
			projects.push(project)
		}
		return projects;
	}

	static async convertBlogPost(apiBlogPost: BlogPost): Promise<BlogPost> {
		if (
			!apiBlogPost?.attributes.title ||
			!apiBlogPost?.attributes.slug ||
			!apiBlogPost?.attributes.description ||
			!apiBlogPost?.attributes.content
		) {
			throw ResponseConverter.throwMissingDataError("Blog Post", apiBlogPost)
		}

		const contentHtml = await convertMarkdownToHTML(apiBlogPost.attributes.content);
		const tags = await ResponseConverter.convertTags(apiBlogPost.attributes.tags?.data);
		const relatedProjects = await ResponseConverter.convertProjects(apiBlogPost.attributes.related_projects?.data);
		const relatedBlogPosts = await ResponseConverter.convertBlogPosts(apiBlogPost.attributes.related_blog_posts?.data);

		return {
			id: apiBlogPost.id.toString(),
			title: apiBlogPost.attributes.title,
			slug: apiBlogPost.attributes.slug,
			description: apiBlogPost.attributes.description,
			contentHtml: contentHtml,
			isFeatured: !!apiBlogPost.attributes.featured,
			tags,
			relatedProjects,
			relatedBlogPosts,
			createdAt: apiBlogPost.attributes.createdAt,
			updatedAt: apiBlogPost.attributes.updatedAt,
			publishedAt: apiBlogPost.attributes.publishedAt
		}
	}

	static async convertBlogPosts(apiBlogPosts: BlogPost[] | null): Promise<BlogPost[]> {
		if (!apiBlogPosts) {
			return []
		}

		const blogPosts: BlogPost[] = [];
		for (const apiBlogPost of apiBlogPosts) {
			const blogPost = await ResponseConverter.convertBlogPost(apiBlogPost);
			blogPosts.push(blogPost)
		}
		return blogPosts;
	}
}
