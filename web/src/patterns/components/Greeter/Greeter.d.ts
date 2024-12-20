export interface SocialLink {
	text: string
	url: string
	iconCode: string
}

export interface GreeterProps {
	heading: string
	contentHtml: string;
	socialLinks: SocialLink[]
}
