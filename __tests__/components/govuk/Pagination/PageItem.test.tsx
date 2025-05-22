import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageItem } from "@/components/govuk/Pagination/PageItem";

describe("PageItem", () => {
  it("Shows a page number", () => {
    const page = {
      current: false,
      number: 1,
    };
    const link = "search";
    render(<PageItem page={page} link={link} />);
    const linkElement = screen.getByRole("link", { name: "Page 1" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("1");
    expect(linkElement).toHaveAttribute("href", "search?page=1");
  });
  it("Shows ... when filling in for numbers", () => {
    const page = {
      current: false,
      number: -1,
    };
    const link = "search";
    render(<PageItem page={page} link={link} />);
    const linkElement = screen.getByRole("listitem");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(/\u22EF|\u2026|\.\.\./);
    expect(linkElement).toHaveClass("govuk-pagination__item--ellipses");
  });
});
