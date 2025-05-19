import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Banner from "@/components/banner";

expect.extend(toHaveNoViolations);

describe("Test Banner", () => {
  it("it should render correctly", async () => {
    const value = { feedbackUrl: "/" };
    render(<Banner globalConfig={value} />);
    const feedbackLink = screen.getByText("feedback");
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink.getAttribute("href")).toBe("/");
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
