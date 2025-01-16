import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Home from "../src/app/(main)/page";

expect.extend(toHaveNoViolations);

jest.mock("next/link", () => {
  return ({ href, children, className }) => {
    return (
      <a href={typeof href === "string" ? href : "#"} className={className}>
        {children}
      </a>
    );
  };
});

jest.mock("../src/app/actions/sanityClient", () => ({
  getActiveApplications: () => ({}),
  getActiveApplicationsByLocation: () => ({}),
  getGlobalContent: () => ({
    councilName: "Test Council",
    signUpUrl: "#",
  }),
}));

describe("Home", () => {
  it("renders a heading", async () => {
    render(await Home({ params: {}, searchParams: {} }));
    const heading = screen.getByRole("heading", {
      name: "Find planning applications near you",
    });
    expect(heading).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(await Home({ params: {}, searchParams: {} }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
