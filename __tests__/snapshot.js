import { render } from "@testing-library/react";
import Home from "../src/app/(main)/page";

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

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
