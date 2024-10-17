import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Checkbox from "../src/components/checkbox";

expect.extend(toHaveNoViolations);

describe("Checkbox", () => {
  it("should render correctly and handle change", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        label="House"
        id="house"
        onChange={handleChange}
        checked={false}
      />,
    );
    const checkbox = screen.getByLabelText("House");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it("should display error message when isError is true", () => {
    render(
      <Checkbox
        label="House"
        id="house"
        onChange={() => {}}
        checked={false}
        isError={true}
        messageError="This field is required"
      />,
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Checkbox label="House" id="house" onChange={() => {}} checked={false} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have no accessibility violations with error", async () => {
    const { container } = render(
      <Checkbox
        label="House"
        id="house"
        onChange={() => {}}
        checked={false}
        isError={true}
        messageError="This field is required"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
