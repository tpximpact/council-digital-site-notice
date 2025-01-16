import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Header from "../src/components/header";

expect.extend(toHaveNoViolations);

jest.mock("../src/app/actions/sanityClient", () => ({
  urlFor: jest.fn(),
}));

describe("Header", () => {
  const value = {
    globalConfig: {
      logo: {
        _type: "image",
        asset: {
          _ref: "image-5cde9e98a2fa6341f5957fff4f9a98f00f52ab1a-101x36-png",
          _type: "reference",
        },
      },
    },
  };

  it("should render correctly", async () => {
    render(<Header globalConfig={value} />);
    expect(screen.getByText("Planning applications")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Header globalConfig={value} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
