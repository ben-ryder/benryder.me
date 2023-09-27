import type {Link} from "@lib/api/types/content/link.ts";
export interface Header {
	messagePromoHtml?: string | null,
	navigationLinks: Link[]
}
