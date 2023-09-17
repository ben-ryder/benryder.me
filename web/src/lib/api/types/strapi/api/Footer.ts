import { StrapiLinkLink } from "./link/Link";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiFooter<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      sign_off: string | null;
      navigation_links?: StrapiLinkLink[];
    },
    ExtractFlat<Populate>
  >;
}
