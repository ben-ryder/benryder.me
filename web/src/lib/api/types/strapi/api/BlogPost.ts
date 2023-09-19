import { StrapiProject } from "./Project";
import { StrapiBlogPostTag } from "./BlogPostTag";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiBlogPost<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      content: string | null;
      slug: string | null;
      description: string | null;
      featured: boolean | null;
      related_blog_posts?: {
        data: StrapiBlogPost<ExtractNested<Populate, "related_blog_posts">>[];
      };
      related_projects?: {
        data: StrapiProject<ExtractNested<Populate, "related_projects">>[];
      };
      tags?: { data: StrapiBlogPostTag<ExtractNested<Populate, "tags">>[] };
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
