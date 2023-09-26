export type BlogPostTags = {
	blog_posts: any[] | BlogPostsBlogPostTags[];
	colour?: string | null;
	date_created: string;
	date_updated?: string | null;
	id: string;
	order?: number | null;
	slug: string;
	status: string;
	text: string;
};

export type BlogPosts = {
	content: string;
	date_created: string;
	date_updated?: string | null;
	description: string;
	featured: boolean;
	id: string;
	metadata: string;
	metadata_description?: string | null;
	metadata_tags?: unknown | null;
	related_blog_posts: any[] | BlogPostsRelatedBlogPosts[];
	related_projects: any[] | BlogPostsRelatedProjects[];
	slug: string;
	status: string;
	tags: any[] | BlogPostsBlogPostTags[];
	title: string;
};

export type BlogPostsBlogPostTags = {
	blog_post_tags_id: string | BlogPostTags;
	blog_posts_id: string | BlogPosts;
	id: number;
};

export type BlogPostsRelatedBlogPosts = {
	blog_posts_id: string | BlogPosts;
	id: number;
	related_blog_posts_id: string | BlogPosts;
};

export type BlogPostsRelatedProjects = {
	blog_posts_id: string | BlogPosts;
	id: number;
	related_projects_id: string | Projects;
};

export type DirectusActivity = {
	action: string;
	collection: string;
	comment?: string | null;
	id: number;
	ip?: string | null;
	item: string;
	origin?: string | null;
	revisions: any[] | DirectusRevisions[];
	timestamp: string;
	user?: string | DirectusUsers | null;
	user_agent?: string | null;
};

export type DirectusCollections = {
	accountability?: string | null;
	archive_app_filter: boolean;
	archive_field?: string | null;
	archive_value?: string | null;
	collapse: string;
	collection: string;
	color?: string | null;
	display_template?: string | null;
	group?: string | DirectusCollections | null;
	hidden: boolean;
	icon?: string | null;
	item_duplication_fields?: unknown | null;
	note?: string | null;
	preview_url?: string | null;
	singleton: boolean;
	sort?: number | null;
	sort_field?: string | null;
	translations?: unknown | null;
	unarchive_value?: string | null;
};

export type DirectusDashboards = {
	color?: string | null;
	date_created?: string | null;
	icon: string;
	id: string;
	name: string;
	note?: string | null;
	panels: any[] | DirectusPanels[];
	user_created?: string | DirectusUsers | null;
};

export type DirectusFields = {
	collection: string | DirectusCollections;
	conditions?: unknown | null;
	display?: string | null;
	display_options?: unknown | null;
	field: string;
	group?: string | DirectusFields | null;
	hidden: boolean;
	id: number;
	interface?: string | null;
	note?: string | null;
	options?: unknown | null;
	readonly: boolean;
	required?: boolean | null;
	sort?: number | null;
	special?: unknown | null;
	translations?: unknown | null;
	validation?: unknown | null;
	validation_message?: string | null;
	width?: string | null;
};

export type DirectusFiles = {
	charset?: string | null;
	description?: string | null;
	duration?: number | null;
	embed?: string | null;
	filename_disk?: string | null;
	filename_download: string;
	filesize?: number | null;
	folder?: string | DirectusFolders | null;
	height?: number | null;
	id: string;
	location?: string | null;
	metadata?: unknown | null;
	modified_by?: string | DirectusUsers | null;
	modified_on: string;
	storage: string;
	tags?: unknown | null;
	title?: string | null;
	type?: string | null;
	uploaded_by?: string | DirectusUsers | null;
	uploaded_on: string;
	width?: number | null;
};

export type DirectusFlows = {
	accountability?: string | null;
	color?: string | null;
	date_created?: string | null;
	description?: string | null;
	icon?: string | null;
	id: string;
	name: string;
	operation?: string | DirectusOperations | null;
	operations: any[] | DirectusOperations[];
	options?: unknown | null;
	status: string;
	trigger?: string | null;
	user_created?: string | DirectusUsers | null;
};

export type DirectusFolders = {
	id: string;
	name: string;
	parent?: string | DirectusFolders | null;
};

export type DirectusMigrations = {
	name: string;
	timestamp?: string | null;
	version: string;
};

export type DirectusNotifications = {
	collection?: string | null;
	id: number;
	item?: string | null;
	message?: string | null;
	recipient: string | DirectusUsers;
	sender?: string | DirectusUsers | null;
	status?: string | null;
	subject: string;
	timestamp?: string | null;
};

export type DirectusOperations = {
	date_created?: string | null;
	flow: string | DirectusFlows;
	id: string;
	key: string;
	name?: string | null;
	options?: unknown | null;
	position_x: number;
	position_y: number;
	reject?: string | DirectusOperations | null;
	resolve?: string | DirectusOperations | null;
	type: string;
	user_created?: string | DirectusUsers | null;
};

export type DirectusPanels = {
	color?: string | null;
	dashboard: string | DirectusDashboards;
	date_created?: string | null;
	height: number;
	icon?: string | null;
	id: string;
	name?: string | null;
	note?: string | null;
	options?: unknown | null;
	position_x: number;
	position_y: number;
	show_header: boolean;
	type: string;
	user_created?: string | DirectusUsers | null;
	width: number;
};

export type DirectusPermissions = {
	action: string;
	collection: string;
	fields?: unknown | null;
	id: number;
	permissions?: unknown | null;
	presets?: unknown | null;
	role?: string | DirectusRoles | null;
	validation?: unknown | null;
};

export type DirectusPresets = {
	bookmark?: string | null;
	collection?: string | null;
	color?: string | null;
	filter?: unknown | null;
	icon?: string | null;
	id: number;
	layout?: string | null;
	layout_options?: unknown | null;
	layout_query?: unknown | null;
	refresh_interval?: number | null;
	role?: string | DirectusRoles | null;
	search?: string | null;
	user?: string | DirectusUsers | null;
};

export type DirectusRelations = {
	id: number;
	junction_field?: string | null;
	many_collection: string;
	many_field: string;
	one_allowed_collections?: unknown | null;
	one_collection?: string | null;
	one_collection_field?: string | null;
	one_deselect_action: string;
	one_field?: string | null;
	sort_field?: string | null;
};

export type DirectusRevisions = {
	activity: number | DirectusActivity;
	collection: string;
	data?: unknown | null;
	delta?: unknown | null;
	id: number;
	item: string;
	parent?: number | DirectusRevisions | null;
};

export type DirectusRoles = {
	admin_access: boolean;
	app_access: boolean;
	description?: string | null;
	enforce_tfa: boolean;
	icon: string;
	id: string;
	ip_access?: unknown | null;
	name: string;
	users: any[] | DirectusUsers[];
};

export type DirectusSessions = {
	expires: string;
	ip?: string | null;
	origin?: string | null;
	share?: string | DirectusShares | null;
	token: string;
	user?: string | DirectusUsers | null;
	user_agent?: string | null;
};

export type DirectusSettings = {
	auth_login_attempts?: number | null;
	auth_password_policy?: string | null;
	basemaps?: unknown | null;
	custom_aspect_ratios?: unknown | null;
	custom_css?: string | null;
	default_language: string;
	id: number;
	mapbox_key?: string | null;
	module_bar?: unknown | null;
	project_color?: string | null;
	project_descriptor?: string | null;
	project_logo?: string | DirectusFiles | null;
	project_name: string;
	project_url?: string | null;
	public_background?: string | DirectusFiles | null;
	public_foreground?: string | DirectusFiles | null;
	public_note?: string | null;
	storage_asset_presets?: unknown | null;
	storage_asset_transform?: string | null;
	storage_default_folder?: string | DirectusFolders | null;
};

export type DirectusShares = {
	collection: string | DirectusCollections;
	date_created?: string | null;
	date_end?: string | null;
	date_start?: string | null;
	id: string;
	item: string;
	max_uses?: number | null;
	name?: string | null;
	password?: string | null;
	role?: string | DirectusRoles | null;
	times_used?: number | null;
	user_created?: string | DirectusUsers | null;
};

export type DirectusTranslations = {
	id: string;
	key: string;
	language: string;
	value: string;
};

export type DirectusUsers = {
	auth_data?: unknown | null;
	avatar?: string | DirectusFiles | null;
	description?: string | null;
	email?: string | null;
	email_notifications?: boolean | null;
	external_identifier?: string | null;
	first_name?: string | null;
	id: string;
	language?: string | null;
	last_access?: string | null;
	last_name?: string | null;
	last_page?: string | null;
	location?: string | null;
	password?: string | null;
	provider: string;
	role?: string | DirectusRoles | null;
	status: string;
	tags?: unknown | null;
	tfa_secret?: string | null;
	theme?: string | null;
	title?: string | null;
	token?: string | null;
};

export type DirectusWebhooks = {
	actions: unknown;
	collections: unknown;
	data: boolean;
	headers?: unknown | null;
	id: number;
	method: string;
	name: string;
	status: string;
	url: string;
};

export type Footer = {
	date_created: string;
	date_updated?: string | null;
	id: string;
	navigation_links: any[] | FooterLinks[];
	signoff_content: string;
};

export type FooterLinks = {
	footer_id: string | Footer;
	id: number;
	links_id: string | Links;
	order: number;
};

export type FormContact = {
	date_created: string;
	email: string;
	id: string;
	message: string;
	name: string;
	subject: string;
};

export type Header = {
	date_created: string;
	date_updated?: string | null;
	id: string;
	message_noscript: string;
	message_promo?: string | null;
	navigation_links: any[] | HeaderLinks[];
};

export type HeaderLinks = {
	header_id: string | Header;
	id: number;
	links_id: string | Links;
	order: number;
};

export type Links = {
	date_created: string;
	date_updated?: string | null;
	id: string;
	status: string;
	text: string;
	url: string;
};

export type PageContact = {
	content: string;
	id: string;
};

export type PageHome = {
	greeter_content: string;
	greeter_title: string;
	id: string;
	social_links: any[] | PageHomeSocialLinks[];
};

export type PageHomeSocialLinks = {
	id: number;
	order: number;
	page_home_id: string | PageHome;
	social_links_id: string | SocialLinks;
};

export type Pages = {
	content: string;
	date_created: string;
	date_updated?: string | null;
	id: string;
	metadata: string;
	metadata_description?: string | null;
	metadata_tags?: unknown | null;
	path: string;
	status: string;
	title: string;
};

export type ProjectTags = {
	colour?: string | null;
	date_created: string;
	date_updated?: string | null;
	id: string;
	order?: number | null;
	projects: any[] | ProjectsProjectTags[];
	slug: string;
	status: string;
	text: string;
};

export type Projects = {
	content: string;
	date_created: string;
	date_updated?: string | null;
	description: string;
	featured: boolean;
	id: string;
	metadata: string;
	metadata_description?: string | null;
	metadata_tags?: unknown | null;
	name: string;
	product_url?: string | null;
	related_blog_posts: any[] | ProjectsRelatedBlogPosts[];
	related_projects: any[] | ProjectsRelatedProjects[];
	release_date?: string | null;
	repository_url?: string | null;
	slug: string;
	status: string;
	tags: any[] | ProjectsProjectTags[];
};

export type ProjectsProjectTags = {
	id: number;
	project_tags_id: string | ProjectTags;
	projects_id: string | Projects;
};

export type ProjectsRelatedBlogPosts = {
	id: number;
	projects_id: string | Projects;
	related_blog_posts_id: string | BlogPosts;
};

export type ProjectsRelatedProjects = {
	id: number;
	projects_id: string | Projects;
	related_projects_id: string | Projects;
};

export type SocialLinks = {
	date_created: string;
	date_updated?: string | null;
	icon: string;
	id: string;
	status: string;
	text?: string | null;
	url?: string | null;
};

export type CustomDirectusTypes = {
	blog_post_tags: BlogPostTags[];
	blog_posts: BlogPosts[];
	blog_posts_blog_post_tags: BlogPostsBlogPostTags[];
	blog_posts_related_blog_posts: BlogPostsRelatedBlogPosts[];
	blog_posts_related_projects: BlogPostsRelatedProjects[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollections[];
	directus_dashboards: DirectusDashboards[];
	directus_fields: DirectusFields[];
	directus_files: DirectusFiles[];
	directus_flows: DirectusFlows[];
	directus_folders: DirectusFolders[];
	directus_migrations: DirectusMigrations[];
	directus_notifications: DirectusNotifications[];
	directus_operations: DirectusOperations[];
	directus_panels: DirectusPanels[];
	directus_permissions: DirectusPermissions[];
	directus_presets: DirectusPresets[];
	directus_relations: DirectusRelations[];
	directus_revisions: DirectusRevisions[];
	directus_roles: DirectusRoles[];
	directus_sessions: DirectusSessions[];
	directus_settings: DirectusSettings;
	directus_shares: DirectusShares[];
	directus_translations: DirectusTranslations[];
	directus_users: DirectusUsers[];
	directus_webhooks: DirectusWebhooks[];
	footer: Footer;
	footer_links: FooterLinks[];
	form_contact: FormContact[];
	header: Header;
	header_links: HeaderLinks[];
	links: Links[];
	page_contact: PageContact;
	page_home: PageHome;
	page_home_social_links: PageHomeSocialLinks[];
	pages: Pages[];
	project_tags: ProjectTags[];
	projects: Projects[];
	projects_project_tags: ProjectsProjectTags[];
	projects_related_blog_posts: ProjectsRelatedBlogPosts[];
	projects_related_projects: ProjectsRelatedProjects[];
	social_links: SocialLinks[];
};
