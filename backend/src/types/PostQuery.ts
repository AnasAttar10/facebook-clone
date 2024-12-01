export interface PostQuery {
  sort?: string | undefined;
  limit?: number | undefined;
  fields?: string | undefined;
  keyword?: string | undefined;
  page?: number;
  // Add any other expected query parameters here
}
