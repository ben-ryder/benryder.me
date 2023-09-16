import type {StrapiComponent} from '@lib/api/types/strapi/strapi-component.d.ts'

export interface StrapiLink extends StrapiComponent {
	text: string
	url: string
}
