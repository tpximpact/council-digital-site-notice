import Feeling from "../../src/components/feelings";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Feeling component", () => {
  test("renders the component", () => {
    render(<Feeling />);
    const headingElement = screen.getByText(
      /How do you feel about this development?/i,
    );
    expect(headingElement).toBeInTheDocument();
  });

  test("displays an error message when Next button is clicked without selecting an option", () => {
    render(<Feeling />);
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    const errorMessage = screen.getByText(/Please select one/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
