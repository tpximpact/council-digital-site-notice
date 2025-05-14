import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import TextArea from "../src/components/text-area";

expect.extend(toHaveNoViolations);

describe("TextArea", () => {
  it("should render correctly", () => {
    render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText("How can we do better?")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "feedback",
    );
  });

  it("should render hint when provided", () => {
    render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
        hint="Please provide your feedback in detail"
      />,
    );
    expect(
      screen.getByText("Please provide your feedback in detail"),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "feedback",
    );
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have no accessibility violations with hint", async () => {
    const { container } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value=""
        onChange={() => {}}
        hint="Please provide your feedback in detail"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should display the character count", () => {
    render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value="Test"
        onChange={() => {}}
        maxLength={20}
      />,
    );

    // Check initial character count
    expect(screen.getByText("4 / 20 characters")).toBeInTheDocument();
  });

  it("should update the character count when typing", async () => {
    let value = "Test";
    const handleChange = jest.fn((newValue) => {
      value = newValue;
    });

    const { rerender } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={20}
      />,
    );

    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "Test content" } });

    rerender(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={20}
      />,
    );

    await waitFor(() =>
      expect(screen.getByText("12 / 20 characters")).toBeInTheDocument(),
    );
  });

  it("should handle pasting content within the max length", async () => {
    let value = "Test";
    const handleChange = jest.fn((newValue) => {
      value = newValue;
    });

    const { rerender } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={15}
      />,
    );

    expect(screen.getByText("4 / 15 characters")).toBeInTheDocument();

    const textarea = screen.getByRole("textbox");

    // nb jest-dom does not support the clipboardData property so the dom is never actually updated
    fireEvent.paste(textarea, {
      clipboardData: {
        getData: () => " content",
      },
    });

    expect(handleChange).toHaveBeenCalledWith("Test content");

    rerender(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={15}
      />,
    );

    waitFor(() =>
      expect(
        screen.getByText(
          "Your input was trimmed because it exceeded the maximum length.",
        ),
      ).not.toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(screen.getByText("12 / 15 characters")).toBeInTheDocument(),
    );
  });

  it("should trim pasted content that exceeds the max length", async () => {
    let value = "Test";
    const handleChange = jest.fn((newValue) => {
      value = newValue;
    });

    const { rerender } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={10}
      />,
    );

    const textarea = screen.getByRole("textbox");

    fireEvent.paste(textarea, {
      clipboardData: {
        getData: () => " content that is too long",
      },
    });

    rerender(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={10}
      />,
    );

    await waitFor(() =>
      expect(screen.getByText("10 / 10 characters")).toBeInTheDocument(),
    );

    expect(
      screen.getByText(
        "Your input was trimmed because it exceeded the maximum length.",
      ),
    ).toBeInTheDocument();
  });

  it("should clear the error message when the content is within the max length", async () => {
    let value = "Test";
    const handleChange = jest.fn((newValue) => {
      value = newValue;
    });

    const { rerender } = render(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={10}
      />,
    );

    const textarea = screen.getByRole("textbox");

    fireEvent.paste(textarea, {
      clipboardData: {
        getData: () => " content that is too long",
      },
    });

    rerender(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={10}
      />,
    );

    expect(
      screen.getByText(
        "Your input was trimmed because it exceeded the maximum length.",
      ),
    ).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: "Short" } });

    rerender(
      <TextArea
        label="How can we do better?"
        id="feedback"
        value={value}
        onChange={handleChange}
        maxLength={10}
      />,
    );

    await waitFor(() =>
      expect(
        screen.queryByText(
          "Your input was trimmed because it exceeded the maximum length.",
        ),
      ).not.toBeInTheDocument(),
    );
  });
});
