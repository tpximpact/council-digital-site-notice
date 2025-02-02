import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Breadcrumbs from "../src/components/breadcrumbs";

expect.extend(toHaveNoViolations);

describe("Breadcrumbs", () => {
  const mockBreadcrumbs = [
    { name: "Planning applications", href: "/" },
    { name: "Murphy's Yard", href: "/murphys-yard" },
  ];

  it("should render correctly", () => {
    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />);
    expect(screen.getByText("Planning applications")).toBeInTheDocument();
    expect(screen.getByText("Murphy's Yard")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
