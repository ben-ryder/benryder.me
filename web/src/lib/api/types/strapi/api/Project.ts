import { StrapiTag } from "./Tag";
import { StrapiBlogPost } from "./BlogPost";
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
      tags?: { data: StrapiTag<ExtractNested<Populate, "tags">>[] };
      slug: string | null;
      featured: boolean | null;
      related_projects?: {
        data: StrapiProject<ExtractNested<Populate, "related_projects">>[];
      };
      related_blog_posts?: {
        data: StrapiBlogPost<ExtractNested<Populate, "related_blog_posts">>[];
      };
      content: string | null;
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
