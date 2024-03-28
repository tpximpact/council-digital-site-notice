import { render, screen } from "@testing-library/react";
import FeedbackQuestions from "../../src/components/questions";
import "@testing-library/jest-dom";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({ id: "123", value: "" }),
  );
  Storage.prototype.setItem = jest.fn();
});

jest.mock("../../util/actions/actions", () => ({
  getGlobalContent: jest.fn(),
  globalContentRevalidate: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("FeedbackQuestions", () => {
  const mockOnChangeQuestion = jest.fn();
  const mockSetQuestion = jest.fn();

  it("renders FeedbackInformation component when question is 0", () => {
    render(
      <FeedbackQuestions
        question={0}
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    expect(
      screen.getByText("What you need to know before you comment"),
    ).toBeInTheDocument();
  });

  it("renders Feeling component when question is 1", () => {
    render(
      <FeedbackQuestions
        question={1}
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    expect(
      screen.getByText("How do you feel about this development?"),
    ).toBeInTheDocument();
  });

  it("renders Topics component when question is 2", () => {
    render(
      <FeedbackQuestions
        question={2}
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    expect(
      screen.getByText("What topics do you want to comment on?"),
    ).toBeInTheDocument();
  });

  it("renders PersonalDetails component when question is 11", () => {
    render(
      <FeedbackQuestions
        question={11}
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    expect(screen.getByText("Your details")).toBeInTheDocument();
  });

  it("renders CheckAnswers component when question is 12", () => {
    render(
      <FeedbackQuestions
        question={12}
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    expect(
      screen.getByText("Check your responses before submitting"),
    ).toBeInTheDocument();
  });

  it("renders Message component when question is 13", () => {
    render(
      <FeedbackQuestions
        question={13}
        onChangeQuestion={mockOnChangeQuestion}
        setQuestion={mockSetQuestion}
      />,
    );
    expect(screen.queryByText("Comment submitted")).toBeNull();
  });
});
