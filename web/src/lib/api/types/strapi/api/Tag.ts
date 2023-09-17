import { StrapiProject } from "./Project";
import { StrapiBlogPost } from "./BlogPost";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiTag<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      name: string | null;
      projects?: { data: StrapiProject<ExtractNested<Populate, "projects">>[] };
      blog_posts?: {
        data: StrapiBlogPost<ExtractNested<Populate, "blog_posts">>[];
      };
      slug: string | null;
    },
    ExtractFlat<Populate>
  >;
}
