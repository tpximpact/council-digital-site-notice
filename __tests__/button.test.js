import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../src/components/button";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button content="Next test" />);
    expect(screen.getByText("Next test")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Button content="Next test" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
