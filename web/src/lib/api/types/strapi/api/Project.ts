import { StrapiBlogPost } from "./BlogPost";
import { StrapiProjectTag } from "./ProjectTag";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiProject<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      name: string | null;
      description: string | null;
      product_url: string | null;
      repository_url: string | null;
      slug: string | null;
      featured: boolean | null;
      related_projects?: {
        data: StrapiProject<ExtractNested<Populate, "related_projects">>[];
      };
      related_blog_posts?: {
        data: StrapiBlogPost<ExtractNested<Populate, "related_blog_posts">>[];
      };
      content: string | null;
      release_date: string | null;
      tags?: { data: StrapiProjectTag<ExtractNested<Populate, "tags">>[] };
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
