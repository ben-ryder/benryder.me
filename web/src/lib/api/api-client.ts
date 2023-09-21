import type {Page} from "@lib/api/types/content/page.ts";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {Homepage} from "@lib/api/types/content/homepage.ts";
import type {Project} from "@lib/api/types/content/project.ts";
import type {BlogPost} from "@lib/api/types/content/blog-post.ts";

import type {
  Pages as DirectusPage
} from "@lib/api/types/directus/types.ts"

import {ResponseConverter} from "@lib/api/response-converter.ts";
import {Logger} from "@lib/logger.ts";
import type {DirectusFooter} from "@lib/api/types/directus/types.ts";

export interface APIClientRequest {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export interface APIClientConfig {
  baseUrl: string,
  token: string
}

/**
 * An API client for communicating with the Strapi REST API.
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
    const url = new URL(`${this.config.baseUrl}/api/${request.endpoint}`);

    if (request.query) {
      Object.entries(request.query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const res = await fetch(
      url.toString(),
      {
        headers: {
          'Authorization': `bearer ${this.config.token}`
        }
      }
    );
    let data = await res.json();

    Logger.log('------------------')
    Logger.log(`API Request - ${url.toString()}`)
    Logger.log(`Response: ${res.status}`)
    Logger.log(`Data:`)
    Logger.log(data)
    Logger.log('------------------')

    return data as T;
  }

  async getPages(): Promise<Page[]> {
    const apiPages = await this._request<{data: DirectusPage[]}>({
      endpoint: '/items/pages'
    });

    const pages: Page[] = [];
    for (const apiPage of apiPages) {
      const page = await ResponseConverter.convertPage(apiPage);
      pages.push(page)
    }

    return pages
  }

  async getFooter(): Promise<Footer> {
    const apiFooter = await this._request<{data: DirectusFooter}>({
      endpoint: '/items/footer',
      query: {
        'fields': 'signoff_content,navigation_links.link_id.text,navigation_links.link_id.url'
      },
    });

    return ResponseConverter.convertStrapiFooter(apiFooter);
  }

  async getHeader(): Promise<Header> {
    const apiHeader = await this._request<StrapiHeader>({
      endpoint: 'header',
      wrappedByKey: 'data',
    });

    return ResponseConverter.convertStrapiHeader(apiHeader);
  }

  async getHomepage(): Promise<Homepage> {
    const apiHomepage = await this._request<StrapiHomepage>({
      endpoint: 'homepage',
      wrappedByKey: 'data',
    });

    return ResponseConverter.convertStrapiHomepage(apiHomepage);
  }

  async getProjects(): Promise<Project[]> {
    const apiProjects = await this._request<StrapiProject[]>({
      endpoint: 'projects',
      wrappedByKey: 'data',
      query: {
        sort: 'publishedAt'
      }
    });

    return ResponseConverter.convertStrapiProjects(apiProjects);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const apiProjects = await this._request<StrapiProject[]>({
      endpoint: 'projects',
      wrappedByKey: 'data',
      query: {
        'filters[featured][$eq]': 'true',
        sort: 'publishedAt'
      }
    });

    return ResponseConverter.convertStrapiProjects(apiProjects);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const apiBlogPosts = await this._request<StrapiBlogPost[]>({
      endpoint: 'blog-posts',
      wrappedByKey: 'data',
      query: {
        sort: 'publishedAt'
      }
    });

    return ResponseConverter.convertStrapiBlogPosts(apiBlogPosts);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    const apiBlogPosts = await this._request<StrapiBlogPost[]>({
      endpoint: 'blog-posts',
      wrappedByKey: 'data',
      query: {
        'filters[featured][$eq]': 'true',
        sort: 'publishedAt'
      }
    });

    return ResponseConverter.convertStrapiBlogPosts(apiBlogPosts);
  }
}

export const apiClient = new APIClient();
