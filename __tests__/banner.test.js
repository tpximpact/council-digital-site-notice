import Banner from "../src/components/banner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test Banner", () => {
  it("it should render correctly", async () => {
    const value = { feedbackUrl: "/" };
    render(<Banner globalConfig={value} />);
    expect(screen.getByRole("link", { name: "feedback" }));
    expect(screen.getByRole("link", { href: "/" }));
  });

  it("it should not render", async () => {
    const value = { globalConfig: null };
    render(<Banner globalConfig={value} />);
    const href = screen.queryByText("feedback");
    expect(href).toBeNull();
  });
});
