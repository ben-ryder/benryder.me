import type {Link} from "@lib/api/types/content/link.ts";
export interface Header {
	id: string,
	promoMessage?: string | null,
	noScriptMessage: string
	navigationLinks: Link[]
}
