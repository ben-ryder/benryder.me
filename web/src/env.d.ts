/// <reference types="astro/client" />
interface ImportMetaEnv {
	readonly API_BASE_URL: string;
	readonly API_TOKEN: string;
	readonly PUBLIC_CONTACT_FORM_ENDPOINT: string;
	readonly PUBLIC_CAPTCHA_SITE_KEY: string;
	readonly LOGGER_ENABLED: string;
}
