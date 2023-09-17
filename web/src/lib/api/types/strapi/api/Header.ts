import { StrapiLinkLink } from "./link/Link";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiHeader<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      navigation_links?: StrapiLinkLink[];
      noscript_message: string | null;
      promo_message: string | null;
    },
    ExtractFlat<Populate>
  >;
}
