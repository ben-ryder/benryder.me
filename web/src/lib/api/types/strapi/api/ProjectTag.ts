import { StrapiProject } from "./Project";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiProjectTag<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      text: string | null;
      slug: string | null;
      projects?: { data: StrapiProject<ExtractNested<Populate, "projects">>[] };
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
