import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import TextArea from "../src/components/text-area";

expect.extend(toHaveNoViolations);

describe("TextArea", () => {
  it("should render correctly", () => {
    render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText("How can we do better?")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  it("should render hint when provided", () => {
    render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
        hint="Please provide your feedback in detail"
      />,
    );
    expect(
      screen.getByText("Please provide your feedback in detail"),
    ).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have no accessibility violations with hint", async () => {
    const { container } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
        hint="Please provide your feedback in detail"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
