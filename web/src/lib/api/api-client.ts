import type {Page} from "@lib/api/types/content/page.ts";
import {StrapiConverter} from "@lib/api/strapi-converter.ts";
import type {StrapiFooter} from "@lib/api/types/strapi/content-types/footer";
import type {Footer} from "@lib/api/types/content/footer.ts";
import type {Header} from "@lib/api/types/content/header.ts";
import type {StrapiHeader} from "@lib/api/types/strapi/content-types/header";
import type {StrapiPage} from "@lib/api/types/strapi/content-types/page";
import type {Homepage} from "@lib/api/types/content/homepage.ts";
import type {StrapiHomepage} from "@lib/api/types/strapi";

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
      baseUrl: import.meta.env.STRAPI_URL,
      token: import.meta.env.STRAPI_TOKEN,
    }

    if (!this.config.baseUrl || !this.config.token) {
      throw new Error('Strapi environment variables missing!')
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

    // Ensure relationships are always loaded
    url.searchParams.append('populate', '*')

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

    if (request.wrappedByKey) {
      data = data[request.wrappedByKey];
    }

    if (request.wrappedByList) {
      data = data[0];
    }

    return data as T;
  }

  /**
   * =======================================================================================
   */

  async getPages(): Promise<Page[]> {
    const strapiPages = await this._request<StrapiPage[]>({
      endpoint: 'pages',
      wrappedByKey: 'data',
    });

    const pages: Page[] = [];
    for (const strapiPage of strapiPages) {
      const basicPage = await StrapiConverter.convertStrapiPage(strapiPage);
      pages.push(basicPage)
    }

    return pages
  }

  async getFooter(): Promise<Footer> {
    const strapiFooter = await this._request<StrapiFooter>({
      endpoint: 'footer',
      wrappedByKey: 'data',
    });

    return StrapiConverter.convertStrapiFooter(strapiFooter);
  }

  async getHeader(): Promise<Header> {
    const strapiHeader = await this._request<StrapiHeader>({
      endpoint: 'header',
      wrappedByKey: 'data',
    });

    return StrapiConverter.convertStrapiHeader(strapiHeader);
  }

  async getHomepage(): Promise<Homepage> {
    const strapiHomepage = await this._request<StrapiHomepage>({
      endpoint: 'homepage',
      wrappedByKey: 'data',
    });

    return StrapiConverter.convertStrapiHomepage(strapiHomepage);
  }
}

export const apiClient = new APIClient();
