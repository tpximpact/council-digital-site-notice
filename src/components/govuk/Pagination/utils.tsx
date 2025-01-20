import { Page } from "./Pagination";

export const generatePaginationItems = (
  currentPage: number,
  totalPages: number,
): Page[] => {
  const pages: Page[] = [];
  const addPage = (number: number, current: boolean = false) => {
    pages.push({ current, number });
  };

  if (totalPages <= 1) {
    return pages;
  }
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  addPage(1, currentPage === 1);

  if (currentPage > 3) {
    addPage(-1); // Ellipsis
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    addPage(i, currentPage === i);
  }

  if (currentPage < totalPages - 2) {
    addPage(-1); // Ellipsis
  }

  addPage(totalPages, currentPage === totalPages);

  return pages;
};
