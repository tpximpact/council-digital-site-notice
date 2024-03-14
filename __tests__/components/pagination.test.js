import { render } from "@testing-library/react";
import Pagination from "../../src/components/pagination";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const onSelectPage = jest.fn();
  const itemsPerPage = 6;

  it("renders the correct number of pages", () => {
    const { container } = render(
      <Pagination
        data={data}
        onSelectPage={onSelectPage}
        itemsPerPage={itemsPerPage}
      />,
    );

    const pageItems = container.querySelectorAll(".page-item");
    // 2 of the pageItems are the Previous and Next buttons, technically it's 3 but including those it's 5
    expect(pageItems.length).toBe(5);
  });
});
