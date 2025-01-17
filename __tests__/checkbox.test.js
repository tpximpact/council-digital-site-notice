import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "../src/components/checkbox";

describe("Checkbox", () => {
  it("should render correctly and handle change", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        label="House"
        id="house"
        value="house"
        onChange={handleChange}
        checked={false}
      />,
    );
    const checkbox = screen.getByLabelText("House");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });
});
