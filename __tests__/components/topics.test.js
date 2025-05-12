import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import TopicsQuestion from "../../src/components/topics";

expect.extend(toHaveNoViolations);

describe("TopicsQuestion Component", () => {
  const mockSetQuestion = jest.fn();
  const mockOnChangeQuestion = jest.fn();

  beforeEach(() => {
    // Clear mock sessionStorage before each test
    sessionStorage.clear();

    // Mocking sessionStorage to return an array for 'topics'
    const mockTopicsStorage = JSON.stringify({
      id: "mockId",
      value: [], // Assuming initial state is an empty array, adjust as needed
    });
    sessionStorage.setItem("topics_mockId", mockTopicsStorage);
    sessionStorage.setItem(
      "application_mockId",
      JSON.stringify({ _id: "mockId" }),
    );
  });

  const renderComponent = () =>
    render(
      <TopicsQuestion
        applicationId="mockId"
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );

  it("renders checkboxes for topics", () => {
    renderComponent();
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(8);
  });

  it("displays validation message when no topic is selected and Next is clicked", () => {
    renderComponent();
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    const validationMessage = screen.getByText(
      "Please select at least one topic",
    );
    expect(validationMessage).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
