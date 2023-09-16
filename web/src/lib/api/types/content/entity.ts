
export interface Entity {
	id: string
	createdAt: string
	updatedAt: string
}

export interface EntityWithWorkflow extends Entity {
	publishedAt: string
}
