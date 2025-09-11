import { defineCollection } from 'astro:content';
import {projectsLoader} from "@lib/loaders/projects.ts";
import {pagesLoader} from "@lib/loaders/pages.ts";
import {postsLoader} from "@lib/loaders/posts.ts";

const pagesCollection = defineCollection({
	loader: pagesLoader(),
});

const projectsCollection = defineCollection({
	loader: projectsLoader(),
});

const postsCollection = defineCollection({
	loader: postsLoader(),
});

export const collections = {
	'pages': pagesCollection,
	'projects': projectsCollection,
	'posts': postsCollection,
};
