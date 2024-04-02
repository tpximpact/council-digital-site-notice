import { render, screen } from "@testing-library/react";
import Home from "../src/app/[subdomain]/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Find planning applications near you",
    });

    expect(heading).toBeInTheDocument();
  });
});
