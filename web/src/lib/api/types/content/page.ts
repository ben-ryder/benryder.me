
export interface Page {
	id: string
	createdAt: string
	updatedAt?: string | null
	title: string
	path: string
	contentHtml: string
}
