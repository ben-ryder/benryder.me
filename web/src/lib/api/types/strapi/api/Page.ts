export interface StrapiPage {
  id: number;
  attributes: {
    title: string | null;
    path: string | null;
    content: string | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}
