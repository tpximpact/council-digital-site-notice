import { generatePaginationItems } from "@/components/govuk/Pagination/utils";

describe("generatePaginationItems", () => {
  it("generates pagination items for the first page", () => {
    const currentPage = 1;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: true, number: 1 },
      { current: false, number: 2 },
      { current: false, number: -1 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the second page", () => {
    const currentPage = 2;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: true, number: 2 },
      { current: false, number: 3 },
      { current: false, number: -1 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the third page", () => {
    const currentPage = 3;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: 2 },
      { current: true, number: 3 },
      { current: false, number: 4 },
      { current: false, number: -1 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the fourth page", () => {
    const currentPage = 4;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 3 },
      { current: true, number: 4 },
      { current: false, number: 5 },
      { current: false, number: -1 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the fifth page", () => {
    const currentPage = 5;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 4 },
      { current: true, number: 5 },
      { current: false, number: 6 },
      { current: false, number: -1 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the ninety eighty page", () => {
    const currentPage = 98;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 97 },
      { current: true, number: 98 },
      { current: false, number: 99 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the ninety ninth page", () => {
    const currentPage = 99;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 98 },
      { current: true, number: 99 },
      { current: false, number: 100 },
    ]);
  });
  it("generates pagination items for the ninety last page", () => {
    const currentPage = 100;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 99 },
      { current: true, number: 100 },
    ]);
  });

  it("handles cases where current pages is invalid", () => {
    const currentPage = -1;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 100 },
    ]);
  });

  it("handles cases where total pages are less than page size", () => {
    const currentPage = 101;
    const totalPages = 100;
    const result = generatePaginationItems(currentPage, totalPages);
    expect(result).toEqual([
      { current: false, number: 1 },
      { current: false, number: -1 },
      { current: false, number: 99 },
      { current: true, number: 100 },
    ]);
  });
});
