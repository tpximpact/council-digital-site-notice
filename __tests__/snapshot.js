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

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
