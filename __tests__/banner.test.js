import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Banner from "../src/components/banner";

expect.extend(toHaveNoViolations);

describe("Test Banner", () => {
  it("it should render correctly", async () => {
    const value = { feedbackUrl: "/" };
    render(<Banner globalConfig={value} />);
    expect(screen.getByRole("link", { name: "feedback" })).toBeInTheDocument();
    expect(screen.getByRole("link", { href: "/" })).toBeInTheDocument();
  });

  it("it should not render", async () => {
    const value = { globalConfig: null };
    render(<Banner globalConfig={value} />);
    const href = screen.queryByText("feedback");
    expect(href).toBeNull();
  });

  it("should have no accessibility violations", async () => {
    const value = { feedbackUrl: "/" };
    const { container } = render(<Banner globalConfig={value} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have no accessibility violations when not rendering", async () => {
    const value = { globalConfig: null };
    const { container } = render(<Banner globalConfig={value} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
