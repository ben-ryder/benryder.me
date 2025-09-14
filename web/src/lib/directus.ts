import {createDirectus, rest, staticToken,} from '@directus/sdk';
import type {PageSchema} from "@lib/loaders/pages.ts";
import type {ProjectSchema} from "@lib/loaders/projects.ts";
import type {PostSchema} from "@lib/loaders/posts.ts";

export interface Home {
    greeter: string;
}

export interface Schema {
    home: Home;
    pages: PageSchema[];
    projects: ProjectSchema[];
    posts: PostSchema[];
}

const CMS_API_URL = import.meta.env.CMS_API_URL
const CMS_API_TOKEN = import.meta.env.CMS_API_TOKEN

const directus = createDirectus<Schema>(CMS_API_URL)
    .with(staticToken(CMS_API_TOKEN))
    .with(rest());
export default directus;
