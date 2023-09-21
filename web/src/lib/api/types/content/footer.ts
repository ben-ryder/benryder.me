import type {Link} from "@lib/api/types/content/link.ts";;

export interface Footer {
	signOffHtml: string,
	navigationLinks: Link[]
}
