export interface CardComplexProps {
	link: string
	title: string
	description: string
	tags: CollectionEntry<'tags'>[]
	createdAt: Date
	updatedAt?: Date
}
