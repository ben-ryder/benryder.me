import type {Link} from "@lib/api/types/content/link.ts";
import {Entity} from "@lib/api/types/content/entity";

export interface Footer extends Entity {
	signOffHtml: string,
	navigationLinks: Link[]
}
