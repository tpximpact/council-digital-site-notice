import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackInformation from "../../src/components/feedback-information";
import "@testing-library/jest-dom";

describe("FeedbackInformation", () => {
  it("renders the component correctly", () => {
    render(<FeedbackInformation />);
    expect(
      screen.getByText("What you need to know before you comment"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("What isn’t considered in planning approval"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Why your comments are important"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("What happens to your comments"),
    ).toBeInTheDocument();
    expect(screen.getByText("Comment on this application")).toBeInTheDocument();
  });
});
