import { render, screen, fireEvent } from "@testing-library/react";
import PersonalDetails from "../../src/components/personal-details";
import "@testing-library/jest-dom";

describe("PersonalDetails", () => {
  test("renders PersonalDetails component", () => {
    render(<PersonalDetails />);
    const personalDetailsElement = screen.getByText("Your details");
    expect(personalDetailsElement).toBeInTheDocument();
  });
});
