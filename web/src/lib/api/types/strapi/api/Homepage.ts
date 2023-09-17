import { StrapiSocialSocialLink } from "./social/SocialLink";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface StrapiHomepage<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      greeter_content: string | null;
      greeter_title: string | null;
      social_links?: StrapiSocialSocialLink[];
    },
    ExtractFlat<Populate>
  >;
}
