import { render, screen } from "@testing-library/react";
import Home from "../src/app/(main)/page";
import "@testing-library/jest-dom";

jest.mock("react", () => {
  const testCache = (func) => func;

  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams({ page: "1" }),
  useRouter: () => jest.fn(),
  usePathname: () => jest.fn(),
}));

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Find planning applications near you",
    });

    expect(heading).toBeInTheDocument();
  });
});
