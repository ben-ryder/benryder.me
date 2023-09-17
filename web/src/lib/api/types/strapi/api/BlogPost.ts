import { StrapiTag } from "./Tag";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiBlogPost<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      content: string | null;
      tags?: { data: StrapiTag<ExtractNested<Populate, "tags">>[] };
      slug: string | null;
      description: string | null;
      featured: boolean | null;
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
