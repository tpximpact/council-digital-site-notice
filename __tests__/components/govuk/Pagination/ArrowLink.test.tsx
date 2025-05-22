import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArrowLink } from "@/components/govuk/Pagination/ArrowLink";

describe("ArrowLink", () => {
  it("Shows previous link", () => {
    const type = "prev";
    const blockLevel = false;
    const link = {
      href: "search",
      page: 99,
      searchParams: {
        postcode: "SW1A 2AA",
        page: 100,
      },
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__prev");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "search?postcode=SW1A+2AA&page=99",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Previous page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--prev");
  });
  it("Shows next link", () => {
    const type = "next";
    const blockLevel = false;
    const link = {
      href: "search",
      page: 2,
      searchParams: {
        postcode: "SW1A 2AA",
        page: 1,
      },
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__next");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "next");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "search?postcode=SW1A+2AA&page=2",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Next page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--next");
  });
  it("Shows block previous link", () => {
    const type = "prev";
    const blockLevel = true;
    const link = {
      href: "prev-page",
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__prev");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link")).toHaveAttribute("href", "prev-page");
    expect(screen.getByRole("link")).toHaveTextContent("Previous page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--prev");
  });
  it("Shows block next link", () => {
    const type = "next";
    const blockLevel = true;
    const link = {
      href: "next-page",
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__next");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "next");
    expect(screen.getByRole("link")).toHaveAttribute("href", "next-page");
    expect(screen.getByRole("link")).toHaveTextContent("Next page");

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--next");
  });
  it("Shows block previous link description", () => {
    const type = "prev";
    const blockLevel = true;
    const link = {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "prev-page",
      page: 1,
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__prev");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "prev-page?page=1",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Previous page");
    expect(container).toHaveTextContent(
      "Previous page: Applying for a provisional lorry or bus licence",
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--prev");
  });
  it("Shows block next link description", () => {
    const type = "next";
    const blockLevel = true;
    const link = {
      labelText: "Driver CPC part 1 test: theory",
      href: "next-page",
      page: 2,
    };
    const { container } = render(
      <ArrowLink type={type} blockLevel={blockLevel} link={link} />,
    );

    expect(container.firstChild).toHaveClass("govuk-pagination__next");

    expect(screen.getByRole("link")).toHaveAttribute("rel", "next");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "next-page?page=2",
    );
    expect(screen.getByRole("link")).toHaveTextContent("Next page");
    expect(container).toHaveTextContent(
      "Next page: Driver CPC part 1 test: theory",
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("govuk-pagination__icon--next");
  });
});
