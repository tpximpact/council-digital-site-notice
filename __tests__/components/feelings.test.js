import Feeling from "../../src/components/feelings";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({ id: "123", value: "" }),
  );
  Storage.prototype.setItem = jest.fn();
});

describe("Feeling component", () => {
  const mockOnChangeQuestion = jest.fn();
  const mockSetQuestion = jest.fn();

  test("renders the component", () => {
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

  test("displays an error message when Next button is clicked without selecting an option", () => {
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
});
