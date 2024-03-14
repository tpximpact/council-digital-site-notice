import Banner from "../../src/components/banner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContextApplication } from "@/context";

describe("Test Banner", () => {
  it("it should render correctly", async () => {
    const value = { globalConfig: { feedbackUrl: "/" } };
    render(
      <ContextApplication.Provider value={value}>
        <Banner />
      </ContextApplication.Provider>,
    );
    expect(screen.getByRole("link", { name: "feedback" }));
    expect(screen.getByRole("link", { href: "/" }));
  });

  it("it should not render", async () => {
    const value = { globalConfig: null };
    render(
      <ContextApplication.Provider value={value}>
        <Banner />
      </ContextApplication.Provider>,
    );
    const href = screen.queryByText("feedback");
    expect(href).toBeNull();
  });
});
