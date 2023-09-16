import type {
	StrapiContentType,
	StrapiContentTypeAttributesWithWorkflow
} from '@lib/api/types/strapi/strapi-content-type.d.ts'

interface StrapiPageAttributes extends StrapiContentTypeAttributesWithWorkflow {
	title: string
	path: string
	content: string
}

export interface StrapiPage extends StrapiContentType {
	attributes: StrapiPageAttributes
}
