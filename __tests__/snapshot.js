import { render } from "@testing-library/react";
import Home from "../src/app/(main)/page";

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
