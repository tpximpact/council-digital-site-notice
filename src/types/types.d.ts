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

export type PersonalDetailsForm = {
  name: string;
  address: string;
  email: string;
  phone: string;
  postcode: string;
  consent: boolean;
};

export type CommentForm = {
  [key: number]: string;
};

export type IntegrationMethod = "manual" | "openAPI" | "uniformAPI";

export interface ProcessApplicationResponse {
  _id: string | null;
  applicationNumber: string | null;
  planningId: string | null;
  success: boolean;
  message?: string;
  error?: string;
}
