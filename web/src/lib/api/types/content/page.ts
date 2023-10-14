
export interface Page {
	id: string
	title: string
	path: string
	contentHtml: string

	dateCreated: Date
	datePublished?: Date | null
	dateUpdated?: Date | null
}
