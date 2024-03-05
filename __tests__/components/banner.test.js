import Banner from "../../src/components/banner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test Banner", () => {
  beforeEach(() => {
    localStorage.setItem("globalInfo", JSON.stringify({ feedbackUrl: "/" }));
  });

  it("it should render correctly", async () => {
    render(<Banner />);
    expect(screen.getByRole("link", { name: "feedback" }));
  });
});
