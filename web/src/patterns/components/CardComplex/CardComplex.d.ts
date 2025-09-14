export interface CardComplexProps {
	link: string
	title: string
	description: string
	tags: CollectionEntry<'tags'>[]
	publishedAt: Date
	updatedAt?: Date
}
