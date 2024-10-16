import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Feeling from "../../src/components/feelings";

expect.extend(toHaveNoViolations);

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({ id: "123", value: "" }),
  );
  Storage.prototype.setItem = jest.fn();
});

describe("Feeling component", () => {
  const mockOnChangeQuestion = jest.fn();
  const mockSetQuestion = jest.fn();

  it("renders the component", () => {
    render(
      <Feeling
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    const headingElement = screen.getByText(
      /How do you feel about this development?/i,
    );
    expect(headingElement).toBeInTheDocument();
  });

  it("displays an error message when Next button is clicked without selecting an option", () => {
    render(
      <Feeling
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    const errorMessage = screen.getByText(/Please select one/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Feeling
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
