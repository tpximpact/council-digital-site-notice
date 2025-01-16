import React from "react";
import "./Pagination.scss";
import { DprPagination, SearchParams } from "@/types";
import { ArrowLink } from "./ArrowLink";
import { PageItem } from "./PageItem";
import { generatePaginationItems } from "./utils";

interface PaginationProps {
  baseUrl: string;
  searchParams?: SearchParams;
  pagination?: DprPagination;
  prev?: PaginationPropsLink;
  next?: PaginationPropsLink;
}

export interface PaginationPropsLink {
  labelText?: string;
  href: string;
  searchParams?: SearchParams;
  page?: number;
}

export interface Page {
  current: boolean;
  number: number;
}

/**
 * Pagination component to display page numbers and navigation links.
 * show page numbers fo *
 * the current page
 * at least one page immediately before and after the current page
 * first and last pages
 * Use ellipses (…) to replace any skipped pages. For exampl *
 * [1] 2 … 100
 * 1 [2] 3 … 100
 * 1 2 [3] 4 … 100
 * 1 2 3 [4] 5 … 100
 * 1 … 4 [5] 6 … 100
 * 1 … 97 [98] 99 100
 * 1 … 98 [99] 100
 * 1 … 99 [100]
 * @param {string} currentUrl - The base URL for pagination links.
 * @param {Object} pagination - Pagination information.
 * @param {number} pagination.currentPage - The current page number.
 * @param {number} pagination.totalPages - The total number of pages.
 * @param {number} pagination.itemsPerPage - The number of items per page.
 * @param {number} pagination.totalItems - The total number of items.
 * @param {Object} [prev] - Previous page link.
 * @param {Object} [next] - Next page link.
 * @returns {JSX.Element} The Pagination component.
 */
export const Pagination = ({
  baseUrl,
  searchParams,
  pagination,
  prev,
  next,
}: PaginationProps) => {
  let items: Page[] | undefined;
  let firstPage = false;
  let lastPage = false;
  if (pagination) {
    const { page: currentPage, total_pages: totalPages } = pagination;
    firstPage = currentPage === 1;
    lastPage = currentPage === totalPages;
    prev = {
      href: `${baseUrl}`,
      searchParams,
      page: currentPage - 1,
    };
    next = {
      href: `${baseUrl}`,
      searchParams,
      page: currentPage + 1,
    };
    items = generatePaginationItems(currentPage, totalPages);
  } else {
    items = undefined;
  }
  const blockLevel = !items && (next || prev);
  return (
    <nav
      className={`govuk-pagination ${blockLevel ? "govuk-pagination--block" : ""}`}
      aria-label="Pagination"
    >
      {!firstPage && prev && (
        <ArrowLink type="prev" blockLevel={Boolean(blockLevel)} link={prev} />
      )}
      {items && (
        <ul className="govuk-pagination__list">
          {items.map((page, index) => (
            <PageItem
              page={page}
              key={index}
              link={baseUrl}
              searchParams={searchParams}
            />
          ))}
        </ul>
      )}
      {!lastPage && next && (
        <ArrowLink type="next" blockLevel={Boolean(blockLevel)} link={next} />
      )}
    </nav>
  );
};
