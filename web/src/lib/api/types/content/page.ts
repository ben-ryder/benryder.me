import {EntityWithWorkflow} from "@lib/api/types/content/entity";

export interface Page extends EntityWithWorkflow {
	title: string
	path: string
	contentHtml: string
}
