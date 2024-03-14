import { render, screen } from "@testing-library/react";
import FeedbackQuestions from "../../src/components/questions";
import "@testing-library/jest-dom";

describe("FeedbackQuestions", () => {
  it("renders FeedbackInformation component when question is 0", () => {
    render(<FeedbackQuestions question={0} />);
    expect(
      screen.getByText("What you need to know before you comment"),
    ).toBeInTheDocument();
  });

  it("renders Feeling component when question is 1", () => {
    render(<FeedbackQuestions question={1} />);
    expect(
      screen.getByText("How do you feel about this development?"),
    ).toBeInTheDocument();
  });

  it("renders Topics component when question is 2", () => {
    render(<FeedbackQuestions question={2} />);
    expect(
      screen.getByText("What topics do you want to comment on?"),
    ).toBeInTheDocument();
  });

  it("renders PersonalDetails component when question is 11", () => {
    render(<FeedbackQuestions question={11} />);
    expect(screen.getByText("Your details")).toBeInTheDocument();
  });

  it("renders CheckAnswers component when question is 12", () => {
    render(<FeedbackQuestions question={12} />);
    expect(screen.getByText("Your Comments")).toBeInTheDocument();
  });

  it("renders Message component when question is 13", () => {
    render(<FeedbackQuestions question={13} />);
    expect(screen.getByText("Comment submitted")).toBeInTheDocument();
  });

  it("renders Comment component for any other question", () => {
    const { container } = render(<FeedbackQuestions question={5} />);
    const textarea = container.querySelector('textarea[name="moreDetail"]');
    expect(textarea).toBeInTheDocument();
  });
});
