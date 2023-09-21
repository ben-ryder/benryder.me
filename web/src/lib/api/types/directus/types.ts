export type DirectusBlogPostTag = {
  blog_posts: DirectusBlogPostBlogPostTag[];
  date_created: string;
  date_updated?: string | null;
  id: string;
  slug: string;
  status: string;
  text: string;
};

export type DirectusBlogPost = {
  content: string;
  date_created: string;
  date_updated?: string | null;
  description: string;
  featured: boolean;
  id: string;
  metadata: string;
  metadata_description?: string | null;
  metadata_tags?: unknown | null;
  related_blog_posts: DirectusBlogPostRelatedBlogPosts[];
  related_projects: DirectusBlogPostRelatedProjects[];
  slug: string;
  status: string;
  tags: DirectusBlogPostBlogPostTag[];
  title: string;
};

export type DirectusBlogPostBlogPostTag = {
  blog_post_tags_id: DirectusBlogPostTag;
  blog_posts_id: DirectusBlogPost;
  id: number;
};

export type DirectusBlogPostRelatedBlogPosts = {
  blog_post: DirectusBlogPost;
  id: number;
  related_blog_post: DirectusBlogPost;
};

export type DirectusBlogPostRelatedProjects = {
  blog_post: DirectusBlogPost;
  id: number;
  project: DirectusProject;
};

export type DirectusFooter = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  navigation_links: DirectusFooterLink[];
  signoff_content: string;
};

export type DirectusFooterLink = {
  footer_id: DirectusFooter;
  id: number;
  link_id: DirectusLink;
  order?: number | null;
};

export type DirectusHeader = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  message_noscript: string;
  message_promo?: string | null;
  navigation_links: DirectusHeaderLink[];
};

export type DirectusHeaderLink = {
  header_id: DirectusHeader;
  id: number;
  link_id: DirectusLink;
  order?: number | null;
};

export type DirectusHome = {
  date_created: string;
  date_updated?: string | null;
  greeter_content: string;
  greeter_title: string;
  id: string;
  social_links: DirectusHomeSocialLink[];
};

export type DirectusHomeSocialLink = {
  home_id: DirectusHome;
  id: number;
  order?: number | null;
  social_link_id: DirectusSocialLink;
};

export type DirectusLink = {
  date_created: string;
  date_updated?: string | null;
  id: string;
  status?: string | null;
  text: string;
  url: string;
};

export type DirectusPage = {
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

export type DirectusProjectTag = {
  date_created: string;
  date_updated?: string | null;
  id: string;
  projects: DirectusProjectProjectTag[];
  slug: string;
  status: string;
  text: string;
};

export type DirectusProject = {
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
  related_blog_posts: DirectusProjectRelatedBlogPosts[];
  related_projects: DirectusProjectRelatedProjects[];
  release_date?: string | null;
  repository_url?: string | null;
  slug: string;
  status: string;
  tags: DirectusProjectProjectTag[];
};

export type DirectusProjectProjectTag = {
  id: number;
  project_tags_id: DirectusProjectTag;
  projects_id: DirectusProject;
};

export type DirectusProjectRelatedBlogPosts = {
  blog_post: DirectusBlogPost;
  id: number;
  project: DirectusProject;
};

export type DirectusProjectRelatedProjects = {
  id: number;
  project: DirectusProject;
  related_project: DirectusProject;
};

export type DirectusSocialLink = {
  date_created: string;
  date_updated?: string | null;
  icon: string;
  id: string;
  status: string;
  text: string;
  url: string;
};
