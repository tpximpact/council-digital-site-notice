import TopicsQuestion from "../../src/components/topics";
import { ContextApplication } from "@/context";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("TopicsQuestion Component", () => {
  const mockSetQuestion = jest.fn();
  const mockSetSelectedCheckbox = jest.fn();
  const mockOnChangeQuestion = jest.fn();

  beforeEach(() => {
    const contextValue = {
      setQuestion: mockSetQuestion,
      setSelectedCheckbox: mockSetSelectedCheckbox,
      selectedCheckbox: [],
      onChangeQuestion: mockOnChangeQuestion,
    };

    render(
      <ContextApplication.Provider value={contextValue}>
        <TopicsQuestion />
      </ContextApplication.Provider>,
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
