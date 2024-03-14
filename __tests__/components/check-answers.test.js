import CheckAnswers from "../../src/components/about";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Check Answers component", () => {
  const mockData = {
    name: "Test Name",
    address: "Test Address",
    description: "Test Description",
  };

  it("renders the component with data", () => {
    render(<CheckAnswers data={mockData} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.address)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
  });
});
