import type {StrapiContentType, StrapiContentTypeAttributes} from '@lib/api/types/strapi/strapi-content-type.d.ts'
import type {StrapiLink} from "@lib/api/types/strapi/components/link.d.ts";

interface StrapiHeaderAttributes extends StrapiContentTypeAttributes {
	promo_message: string
	noscript_message: string
	navigation_links: StrapiLink[]
}

export interface StrapiHeader extends StrapiContentType {
	attributes: StrapiHeaderAttributes
}
