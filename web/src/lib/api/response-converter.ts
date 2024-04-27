import type {Page} from "@lib/api/types/content/page.ts";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {Homepage} from "@lib/api/types/content/homepage.ts";
import type {SocialLink} from "@lib/api/types/content/social-link.ts";
import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";
import type {ProjectTag, BlogPostTag} from "@lib/api/types/content/tag.ts";
import type {Link} from "@lib/api/types/content/link.ts";

import {convertMarkdownToHTML} from "@lib/api/utils/convert-markdown.ts";

import type {
	BlogPosts as DirectusBlogPost,
	Footer as DirectusFooter,
	Header as DirectusHeader,
	PageHome as DirectusHomePage,
	Pages as DirectusPage,
	Projects as DirectusProject,
	ProjectTags as DirectusProjectTag,
	BlogPostTags as DirectusBlogPostTag,
	PageContact as DirectusContactPage
} from "@lib/api/types/directus/generated.ts";
import type {JColourVariants} from "@ben-ryder/jigsaw-react";
import type {ContactPage} from "@lib/api/types/content/contact-page.ts";


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
			dateCreated: new Date(apiPage.date_created),
			datePublished: apiPage.date_published ? new Date(apiPage.date_published): undefined,
			dateUpdated: apiPage.date_updated ? new Date(apiPage.date_updated): undefined
		}
	}

	static async convertFooter(apiFooter: DirectusFooter): Promise<Footer> {
		const signOffHtml = await convertMarkdownToHTML(apiFooter.signoff_content);
		const navigationLinks = await ResponseConverter.convertLinks(apiFooter.navigation_links);

		return {
			signOffHtml,
			navigationLinks
		}
	}

	static async convertHeader(apiHeader: DirectusHeader): Promise<Header> {
		const navigationLinks = await ResponseConverter.convertLinks(apiHeader.navigation_links);

		let messagePromoHtml = null;
		if (apiHeader.message_promo) {
			messagePromoHtml = await convertMarkdownToHTML(apiHeader.message_promo);
		}

		return {
			messagePromoHtml: messagePromoHtml,
			navigationLinks: navigationLinks,
		}
	}

	static async convertSocialLinks(apiSocialLinks: DirectusHomePage['social_links']): Promise<SocialLink[]> {
		return apiSocialLinks
			.sort((a, b) => a.order - b.order)
			.map(apiSocialLink => {
				return {
					text: apiSocialLink.social_links_id.text,
					url: apiSocialLink.social_links_id.url,
					iconCode: apiSocialLink.social_links_id.icon_code
				}
			})
	}

	static async convertLinks(apiLinks: DirectusHeader['navigation_links'] | DirectusFooter['navigation_links']): Promise<Link[]> {
		return apiLinks
			.sort((a, b) => a.order - b.order)
			.map(apiLink => {
				return {
					text: apiLink.links_id.text,
					url: apiLink.links_id.url
				}
			})
	}

	static async convertHomepage(apiHomepage: DirectusHomePage): Promise<Homepage> {
		const greeterContentHtml = await convertMarkdownToHTML(apiHomepage.greeter_content);
		const socialLinks = await ResponseConverter.convertSocialLinks(apiHomepage.social_links);

		return {
			greeterContentHtml,
			socialLinks,
		}
	}

	static async convertContactPage(apiContactPage: DirectusContactPage): Promise<ContactPage> {
		const descriptionHtml = await convertMarkdownToHTML(apiContactPage.form_description);

		return {
			descriptionHtml
		}
	}

	static async convertProjectTag(apiProjectTag: DirectusProjectTag): Promise<ProjectTag> {
		const projects: Project[] = []

		for (const tagProject of apiProjectTag.projects) {
			if (tagProject.projects_id) {
				const project = await ResponseConverter.convertProject(tagProject.projects_id)
				projects.push(project)
			}
		}

		return {
			text: apiProjectTag.text,
			slug: apiProjectTag.slug,
			projects,
			order: apiProjectTag.order,
			colour: apiProjectTag.colour as unknown as JColourVariants
		}
	}

	static async convertProjectsProjectTags(apiProjectTags: DirectusProject['tags']): Promise<ProjectTag[]> {
		let tags: ProjectTag[] = [];

		for (const apiProjectTag of apiProjectTags) {
			if (apiProjectTag?.project_tags_id) {
				const tag = await ResponseConverter.convertProjectTag(apiProjectTag.project_tags_id)
				tags.push(tag)
			}
		}

		// Ensure tags are sorted by the order
		tags = tags.sort((a, b) => a.order - b.order)

		return tags;
	}

	static async convertBlogPostTag(apiBlogPostTag: DirectusBlogPostTag): Promise<BlogPostTag> {
		const blogPosts: BlogPost[] = []

		for (const tagBlogPost of apiBlogPostTag.blog_posts) {
			if (tagBlogPost.blog_posts_id) {
				const blogPost = await ResponseConverter.convertBlogPost(tagBlogPost.blog_posts_id)
				blogPosts.push(blogPost)
			}
		}

		return {
			text: apiBlogPostTag.text,
			slug: apiBlogPostTag.slug,
			blogPosts,
			order: apiBlogPostTag.order,
			colour: apiBlogPostTag.colour as unknown as JColourVariants
		}
	}

	static async convertBlogPostsBlogPostTags(apiBlogPostTags: DirectusBlogPost['tags']): Promise<BlogPostTag[]> {
		let tags: BlogPostTag[] = [];

		for (const apiBlogPostTag of apiBlogPostTags) {
			if (apiBlogPostTag?.blog_post_tags_id) {
				const tag = await ResponseConverter.convertBlogPostTag(apiBlogPostTag.blog_post_tags_id)
				tags.push(tag)
			}
		}

		// Ensure tags are sorted by the order
		tags = tags.sort((a, b) => a.order - b.order)

		return tags;
	}

	static async convertBlogPostTags(apiBlogPostTags: DirectusBlogPostTag[]) {
		let tags: BlogPostTag[] = []

		for (const blogPostTag of apiBlogPostTags) {
			const tag = await ResponseConverter.convertBlogPostTag(blogPostTag)
			tags.push(tag)
		}

		// Ensure tags are sorted by the order
		tags = tags.sort((a, b) => a.order - b.order)

		return tags;
	}

	static async convertProjectTags(apiProjectTags: DirectusProjectTag[]) {
		let tags: ProjectTag[] = []

		for (const projectTag of apiProjectTags) {
			const tag = await ResponseConverter.convertProjectTag(projectTag)
			tags.push(tag)
		}

		// Ensure tags are sorted by the order
		tags = tags.sort((a, b) => a.order - b.order)

		return tags;
	}

	static async convertProject(apiProject: DirectusProject): Promise<Project> {
		const contentHtml = await convertMarkdownToHTML(apiProject.content);
		const tags = await ResponseConverter.convertProjectsProjectTags(apiProject.tags);
		const relatedProjects = await ResponseConverter.convertRelatedProjects(apiProject.related_projects);
		const relatedBlogPosts = await ResponseConverter.convertRelatedBlogPosts(apiProject.related_blog_posts);

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
			relatedProjects,
			relatedBlogPosts,
			dateCreated: new Date(apiProject.date_created),
			datePublished: apiProject.date_published ? new Date(apiProject.date_published): undefined,
			dateUpdated: apiProject.date_updated ? new Date(apiProject.date_updated): undefined
		}
	}

	static async convertProjects(apiProjects: DirectusProject[]): Promise<Project[]> {
		const projects: Project[] = [];
		for (const apiProject of apiProjects) {
			const project = await ResponseConverter.convertProject(apiProject);
			projects.push(project)
		}
		return projects;
	}

	static async convertRelatedProjects(
		apiRelatedProjects: DirectusProject['related_projects'] | DirectusBlogPost['related_projects']
	): Promise<Project[]> {
		const relatedProjects: Project[] = [];

		for (const apiRelatedProject of apiRelatedProjects) {
			if (apiRelatedProject?.related_projects_id) {
				const project = await ResponseConverter.convertProject(apiRelatedProject.related_projects_id);
				relatedProjects.push(project)
			}
		}

		return relatedProjects;
	}

	static async convertBlogPost(apiBlogPost: DirectusBlogPost): Promise<BlogPost> {
		const contentHtml = await convertMarkdownToHTML(apiBlogPost.content);
		const tags = await ResponseConverter.convertBlogPostsBlogPostTags(apiBlogPost.tags);
		const relatedBlogPosts = await ResponseConverter.convertRelatedBlogPosts(apiBlogPost.related_blog_posts);
		const relatedProjects = await ResponseConverter.convertRelatedProjects(apiBlogPost.related_projects);

		return {
			id: apiBlogPost.id,
			title: apiBlogPost.title,
			slug: apiBlogPost.slug,
			description: apiBlogPost.description,
			contentHtml: contentHtml,
			isFeatured: apiBlogPost.featured,
			tags,
			relatedBlogPosts,
			relatedProjects,
			dateCreated: new Date(apiBlogPost.date_created),
			datePublished: apiBlogPost.date_published ? new Date(apiBlogPost.date_published): undefined,
			dateUpdated: apiBlogPost.date_updated ? new Date(apiBlogPost.date_updated): undefined
		}
	}

	static async convertBlogPosts(apiBlogPosts: DirectusBlogPost[]): Promise<BlogPost[]> {
		const blogPosts: BlogPost[] = [];

		for (const apiBlogPost of apiBlogPosts) {
			const blogPost = await ResponseConverter.convertBlogPost(apiBlogPost);
			blogPosts.push(blogPost)
		}

		return blogPosts;
	}

	static async convertRelatedBlogPosts(
		apiRelatedBlogPosts: DirectusProject['related_blog_posts'] | DirectusBlogPost['related_blog_posts']
	): Promise<BlogPost[]> {
		const relatedBlogPosts: BlogPost[] = [];

		for (const apiRelatedBlogPost of apiRelatedBlogPosts) {
			if (apiRelatedBlogPost?.related_blog_posts_id) {
				const blogPost = await ResponseConverter.convertBlogPost(apiRelatedBlogPost.related_blog_posts_id);
				relatedBlogPosts.push(blogPost)
			}
		}

		return relatedBlogPosts;
	}
}
