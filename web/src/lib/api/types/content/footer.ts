import type {Link} from "@lib/api/types/content/link.ts";;

export interface Footer {
	id: string,
	signOffHtml: string,
	navigationLinks: Link[]
}
