import TopicsQuestion from "../../src/components/topics";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("TopicsQuestion Component", () => {
  const mockSetQuestion = jest.fn();
  const mockOnChangeQuestion = jest.fn();

  beforeEach(() => {
    // Clear mock localStorage before each test
    localStorage.clear();

    // Mocking localStorage to return an array for 'topics'
    const mockTopicsStorage = JSON.stringify({
      id: "mockId",
      value: [], // Assuming initial state is an empty array, adjust as needed
    });
    localStorage.setItem("topics", mockTopicsStorage);
    localStorage.setItem("application", JSON.stringify({ _id: "mockId" }));

    const contextValue = {
      setQuestion: mockSetQuestion,
      onChangeQuestion: mockOnChangeQuestion,
    };

    render(
      <TopicsQuestion
        onChangeQuestion={contextValue.onChangeQuestion}
        setQuestion={contextValue.setQuestion}
      />,
    );
  });

  it("renders checkboxes for topics", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(8);
  });

  it("displays validation message when no topic is selected and Next is clicked", () => {
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    const validationMessage = screen.getByText(
      "Please select at least one topic",
    );
    expect(validationMessage).toBeInTheDocument();
  });
});
