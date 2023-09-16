export interface StrapiContentType {
	id: string
}

export interface StrapiContentTypeAttributes {
	createdAt: string
	updatedAt: string
}

export interface StrapiContentTypeAttributesWithWorkflow extends StrapiContentTypeAttributes{
	publishedAt: string
}
