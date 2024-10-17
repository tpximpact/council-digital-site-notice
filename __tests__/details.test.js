import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Details from "../src/components/details";

expect.extend(toHaveNoViolations);

describe("Details", () => {
  it("should render correctly", () => {
    render(<Details summary="How to write good feedback" />);
    expect(screen.getByText("How to write good feedback")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Details summary="How to write good feedback" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
