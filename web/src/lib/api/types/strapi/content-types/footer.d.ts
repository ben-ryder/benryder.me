import type {StrapiContentType, StrapiContentTypeAttributes} from '@lib/api/types/strapi/strapi-content-type.d.ts'
import type {StrapiLink} from "@lib/api/types/strapi/components/link.d.ts";

interface StrapiFooterAttributes extends StrapiContentTypeAttributes {
	sign_off: string
	navigation_links: StrapiLink[]
}

export interface StrapiFooter extends StrapiContentType {
	attributes: StrapiFooterAttributes
}
