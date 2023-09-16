import type {Link} from "@lib/api/types/content/link.ts";
import {Entity} from "@lib/api/types/content/entity";

export interface Header extends Entity {
	promoMessage?: string | null,
	noScriptMessage: string
	navigationLinks: Link[]
}
