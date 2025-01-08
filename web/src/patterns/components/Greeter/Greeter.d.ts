export interface SocialLink {
	text: string
	url: string
	iconCode: string
}

export interface GreeterProps {
	contentHtml: string;
	socialLinks: SocialLink[]
}
