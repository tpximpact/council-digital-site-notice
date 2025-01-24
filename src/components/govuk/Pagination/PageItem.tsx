import Link from "next/link";
import { Page } from "./Pagination";
import { SearchParams } from "@/types";

export interface PageItemProps {
  page: Page;
  link: string;
  searchParams?: SearchParams;
}

export const PageItem = ({ page, link, searchParams }: PageItemProps) => {
  return (
    <li
      className={`govuk-pagination__item ${page.current ? "govuk-pagination__item--current" : ""} ${page.number === -1 ? "govuk-pagination__item--ellipses" : ""}`}
    >
      {page.number === -1 ? (
        <>&sdot;&sdot;&sdot;</>
      ) : (
        <Link
          className="govuk-link govuk-pagination__link"
          href={{
            pathname: link,
            query: { ...searchParams, page: page.number },
          }}
          aria-label={`Page ${page.number}`}
          aria-current={page.current ? "page" : undefined}
        >
          {page.number}
        </Link>
      )}
    </li>
  );
};
