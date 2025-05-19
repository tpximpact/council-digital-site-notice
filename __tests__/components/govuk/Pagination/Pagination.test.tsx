import { Pagination } from "@/components/govuk/Pagination";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArrowLink } from "@/components/govuk/Pagination/ArrowLink";
import { PageItem } from "@/components/govuk/Pagination/PageItem";

jest.mock("@/components/govuk/Pagination/ArrowLink", () => ({
  ArrowLink: jest.fn(() => <div>Mocked ArrowLink</div>),
}));

jest.mock("@/components/govuk/Pagination/PageItem", () => ({
  PageItem: jest.fn(() => <div>Mocked PageItem</div>),
}));

describe("Pagination", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("first page", () => {
    const pagination = {
      page: 1,
      total_pages: 100,
    };
    const searchParams = {
      page: 1,
    };
    const baseUrl = "search";
    const { container } = render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(container).not.toHaveClass("govuk-pagination--block");

    expect(ArrowLink).toHaveBeenCalledTimes(1);
    expect(ArrowLink).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
          page: 2,
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(4);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: 2, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("second page", () => {
    const pagination = {
      page: 2,
      total_pages: 100,
    };
    const searchParams = {
      page: 2,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(5);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: 2, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 3, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("third page", () => {
    const pagination = {
      page: 3,
      total_pages: 100,
    };
    const searchParams = {
      page: 3,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(6);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: 2, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 3, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 4, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("fourth page", () => {
    const pagination = {
      page: 4,
      total_pages: 100,
    };
    const searchParams = {
      page: 4,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(7);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 3, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 4, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 5, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("fifth page", () => {
    const pagination = {
      page: 5,
      total_pages: 100,
    };
    const searchParams = {
      page: 5,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(7);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 4, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 5, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 6, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("ninety eighth page", () => {
    const pagination = {
      page: 98,
      total_pages: 100,
    };
    const searchParams = {
      page: 98,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(6);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 97, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 98, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 99, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("ninety ninth page", () => {
    const pagination = {
      page: 99,
      total_pages: 100,
    };
    const searchParams = {
      page: 99,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(5);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 98, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 99, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("last page", () => {
    const pagination = {
      page: 100,
      total_pages: 100,
    };
    const searchParams = {
      page: 100,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(1);
    expect(ArrowLink).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
          page: 99,
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(4);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 99, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 100, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("improbable page", () => {
    const pagination = {
      page: 0,
      total_pages: 100,
    };
    const searchParams = {
      page: 0,
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(3);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });

  it("block page", () => {
    const prev = {
      href: "prev-page",
    };
    const next = { href: "next-page" };
    const baseUrl = "search";
    render(<Pagination baseUrl={baseUrl} prev={prev} next={next} />);

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: true,
        link: expect.objectContaining(prev),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: true,
        link: expect.objectContaining(next),
      }),
      expect.anything(),
    );

    expect(PageItem).not.toHaveBeenCalled();
  });

  it("block page with description", () => {
    const prev = {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "prev-page",
      page: 1,
    };
    const next = {
      labelText: "Driver CPC part 1 test: theory",
      href: "next-page",
      page: 2,
    };
    const baseUrl = "search";
    render(<Pagination baseUrl={baseUrl} prev={prev} next={next} />);

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: true,
        link: expect.objectContaining(prev),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: true,
        link: expect.objectContaining(next),
      }),
      expect.anything(),
    );

    expect(PageItem).not.toHaveBeenCalled();
  });
});
