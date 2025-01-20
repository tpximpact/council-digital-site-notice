/**
 *
 *
 *
 * SearchParams
 * common object to represent search parameters
 *
 *
 *
 */
export interface SearchParams {
  postcode?: string;
  page: number;
}

/**
 *
 *
 *
 * DprPagination
 * the object that describes the pagination of a list of objects
 * @todo rename these to PascalCase
 *
 *
 *
 */

export interface DprPagination {
  page: number;
  total_pages: number;
}
