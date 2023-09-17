import { StrapiMediaFormat } from "./MediaFormat";
import { ExtractNested } from "./ExtractNested";
import { ExtractFlat } from "./ExtractFlat";
import { RequiredBy } from "./RequiredBy";
export interface StrapiMedia<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      formats?: {
        thumbnail?: StrapiMediaFormat | null;
        large?: StrapiMediaFormat | null;
        medium?: StrapiMediaFormat | null;
        small?: StrapiMediaFormat | null;
      } | null;
      name: string;
      hash: string;
      ext: string;
      mime: string;
      url: string;
      provider: string;
      previewUrl: string | null;
      provider_metadata: string | null;
      alternativeText: string | null;
      caption: string | null;
      width: number | null;
      height: number | null;
      size: number;
    },
    ExtractFlat<Populate>
  >;
}
