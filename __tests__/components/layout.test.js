import { render, screen } from "@testing-library/react";
import Layout from "../../src/components/layout";
import "@testing-library/jest-dom";

describe("Layout", () => {
  test("renders children", () => {
    render(<Layout>Test Children</Layout>);
    const childrenElement = screen.getByText("Test Children");
    expect(childrenElement).toBeInTheDocument();
  });

  test("hides cookie banner when isShowCookie is false", () => {
    render(<Layout>Test Children</Layout>);
    const cookieBannerElement = screen.queryByText("Cookies");
    expect(cookieBannerElement).toBeNull();
  });

  test("shows cookie banner when isShowCookie is true", () => {
    render(<Layout>Test Children</Layout>);
    const cookieBannerElement = screen.getByText("Essential Cookies");
    expect(cookieBannerElement).toBeInTheDocument();
  });
});
