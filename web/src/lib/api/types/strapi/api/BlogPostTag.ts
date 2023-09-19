import { StrapiBlogPost } from "./BlogPost";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiBlogPostTag<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      text: string | null;
      slug: string | null;
      blog_posts?: {
        data: StrapiBlogPost<ExtractNested<Populate, "blog_posts">>[];
      };
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
