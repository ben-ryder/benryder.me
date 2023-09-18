import type {SocialLink} from "@lib/api/types/content/social-link.ts";

export interface Homepage {
	greeterTitle: string,
	greeterContentHtml: string,
	socialLinks: SocialLink[]
}
