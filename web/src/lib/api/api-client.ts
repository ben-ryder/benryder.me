import type {Page} from "@lib/api/types/content/page.ts";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {Homepage} from "@lib/api/types/content/homepage.ts";
import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";

import type {
  BlogPosts as DirectusBlogPost,
  Header as DirectusHeader,
  PageHome as DirectusHomePage,
  Projects as DirectusProject,
  Pages as DirectusPage,
  Footer as DirectusFooter,
  ProjectTags as DirectusProjectTag,
  BlogPostTags as DirectusBlogPostTag
} from "@lib/api/types/directus/generated.ts"

import {ResponseConverter} from "@lib/api/response-converter.ts";
import {Logger} from "@lib/logger.ts";
import type {ProjectTag, BlogPostTag} from "@lib/api/types/content/tag.ts";

export interface APIClientRequest {
  endpoint: string;
  query?: Record<string, string>;
}

export interface APIClientConfig {
  baseUrl: string,
  token: string
}

/**
 * An API client for communicating with the CMS API.
 */
export class APIClient {
  private config: APIClientConfig

  constructor() {
    this.config = {
      baseUrl: import.meta.env.API_BASE_URL,
      token: import.meta.env.API_TOKEN,
    }

    if (!this.config.baseUrl || !this.config.token) {
      throw new Error('API environment variables missing.')
    }
  }

  /**
   * A generic request method.
   * Based on the API wrapper found here: https://docs.astro.build/en/guides/cms/strapi/.
   *
   * @param request
   */
  async _request<T>(request: APIClientRequest): Promise<T> {
    const url = new URL(`${this.config.baseUrl}${request.endpoint}`);

    if (request.query) {
      Object.entries(request.query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    Logger.log('------------------')
    Logger.log(`API Request - ${url.toString()}`)

    try {
      const res = await fetch(
        url.toString(),
        {
          headers: {
            'Authorization': `bearer ${this.config.token}`
          }
        }
      )

      let data = await res.json();

      Logger.log(`Response: ${res.status}`)
      Logger.log(`Data:`)
      Logger.log(data)
      Logger.log('------------------')

      return data as T;
    }
    catch (e) {
      Logger.log(`FETCH ERROR`)
      Logger.log(e)
      throw e;
    }
  }

  async getPages(): Promise<Page[]> {
    const res = await this._request<{data: DirectusPage[]}>({
      endpoint: '/items/pages'
    });

    const pages: Page[] = [];
    for (const apiPage of res.data) {
      const page = await ResponseConverter.convertPage(apiPage);
      pages.push(page)
    }

    return pages
  }

  async getFooter(): Promise<Footer> {
    const res = await this._request<{data: DirectusFooter}>({
      endpoint: '/items/footer',
      query: {
        'fields': 'signoff_content,navigation_links.links_id.text,navigation_links.links_id.url'
      },
    });

    return ResponseConverter.convertFooter(res.data);
  }

  async getHeader(): Promise<Header> {
    const res = await this._request<{ data: DirectusHeader }>({
      endpoint: '/items/header',
      query: {
        'fields': 'message_noscript,message_promo,navigation_links.links_id.text,navigation_links.links_id.url'
      }
    });

    return ResponseConverter.convertHeader(res.data);
  }

  async getHomepage(): Promise<Homepage> {
    const res = await this._request<{ data: DirectusHomePage }>({
      endpoint: '/items/page_home',
      query: {
        fields: "greeter_title,greeter_content,social_links.social_links_id.*"
      }
    });

    return ResponseConverter.convertHomepage(res.data);
  }

  async getProjects(): Promise<Project[]> {
    const res = await this._request<{ data: DirectusProject[] }>({
      endpoint: '/items/projects',
      query: {
        fields: "*,tags.project_tags_id.*,related_projects.related_projects_id.*,related_blog_posts.related_blog_posts_id.*"
      }
    });

    return ResponseConverter.convertProjects(res.data);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const res = await this._request<{ data: DirectusProject[] }>({
      endpoint: '/items/projects',
      query: {
        fields: "*,tags.project_tags_id.*,related_projects.related_projects_id.*,related_blog_posts.related_blog_posts_id.*",
        filter: "{ \"featured\": { \"_eq\": true }}"
      }
    });

    return ResponseConverter.convertProjects(res.data);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const res = await this._request<{ data: DirectusBlogPost[] }>({
      endpoint: '/items/blog_posts',
      query: {
        fields: "*,tags.blog_post_tags_id.*,related_projects.related_projects_id.*,related_blog_posts.related_blog_posts_id.*"
      }
    });

    return ResponseConverter.convertBlogPosts(res.data);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    const res = await this._request<{ data: DirectusBlogPost[] }>({
      endpoint: '/items/blog_posts',
      query: {
        fields: "*,tags.blog_post_tags_id.*,related_projects.related_projects_id.*,related_blog_posts.related_blog_posts_id.*",
        filter: "{ \"featured\": { \"_eq\": true }}"
      }
    });

    return ResponseConverter.convertBlogPosts(res.data);
  }

  async getProjectTags(): Promise<ProjectTag[]> {
    const res = await this._request<{ data: DirectusProjectTag[] }>({
      endpoint: '/items/project_tags',
      query: {
        fields: '*,projects.projects_id.*'
      }
    });

    return ResponseConverter.convertProjectTags(res.data)
  }

  async getBlogPostTags(): Promise<BlogPostTag[]> {
    const res = await this._request<{ data: DirectusBlogPostTag[] }>({
      endpoint: '/items/blog_post_tags',
      query: {
        fields: '*,blog_posts.blog_posts_id.*'
      }
    });

    return ResponseConverter.convertBlogPostTags(res.data)
  }
}

export const apiClient = new APIClient();
