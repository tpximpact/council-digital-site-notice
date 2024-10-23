import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Header from "../src/components/header";

expect.extend(toHaveNoViolations);

describe("Header", () => {
  it("should render correctly", async () => {
    const value = { globalConfig: null };
    render(await Header(value));
    expect(screen.getByText("Planning applications")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const value = { globalConfig: null };
    const { container } = render(await Header(value));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
