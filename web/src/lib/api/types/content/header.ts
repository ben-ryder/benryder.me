import type {Link} from "@lib/api/types/content/link.ts";
export interface Header {
	id: string,
	messagePromoHtml?: string | null,
	messageNoScriptHtml: string
	navigationLinks: Link[]
}
