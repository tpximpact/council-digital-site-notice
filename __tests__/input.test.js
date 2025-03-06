import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Input from "../src/components/input";

expect.extend(toHaveNoViolations);

describe("Input", () => {
  it("should render correctly", () => {
    render(
      <Input
        label="Enter a postcode"
        id="postcode"
        type="text"
        onChange={() => {}}
        autocomplete="postal-code"
      />,
    );
    expect(
      screen.getByRole("textbox", "Enter a postcode Optional"),
    ).toBeInTheDocument();
  });

  it("should render hint when provided", () => {
    render(
      <Input
        label="Enter a postcode"
        hint="Enter a postcode to find planning applications nearby"
        id="postcode"
        type="text"
        onChange={() => {}}
        autocomplete="postal-code"
      />,
    );
    expect(
      screen.getByText("Enter a postcode to find planning applications nearby"),
    ).toBeInTheDocument();
  });

  it("should render error message when isError is true", () => {
    render(
      <Input
        label="Enter a postcode"
        id="postcode"
        type="text"
        onChange={() => {}}
        autocomplete="postal-code"
        isError={true}
        messageError="You must enter a valid postcode"
      />,
    );
    expect(
      screen.getByText("You must enter a valid postcode"),
    ).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Input
        label="Enter a postcode"
        id="postcode"
        type="text"
        onChange={() => {}}
        autocomplete="postal-code"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have no accessibility violations with hint and error", async () => {
    const { container } = render(
      <Input
        label="Enter a postcode"
        hint="Enter a postcode to find planning applications nearby"
        id="postcode"
        type="text"
        onChange={() => {}}
        autocomplete="postal-code"
        isError={true}
        messageError="You must enter a valid postcode"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
