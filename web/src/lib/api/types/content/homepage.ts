import type {SocialLink} from "@lib/api/types/content/social-link.ts";

export interface Homepage {
	greeterContentHtml: string,
	socialLinks: SocialLink[]
}
