export interface CardComplexProps {
	link: string
	title: string
	description: string | null
	tags: CollectionEntry<'tags'>[]
	createdAt: string
	updatedAt: string | null
}
