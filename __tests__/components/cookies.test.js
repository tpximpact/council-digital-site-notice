import { render, screen, fireEvent } from "@testing-library/react";
import CookiesBanner from "../../src/components/cookies";
import "@testing-library/jest-dom";

describe("CookiesBanner", () => {
  it("renders the banner with correct content", () => {
    render(<CookiesBanner onClick={() => {}} />);

    const bannerElement = screen.getByRole("region", { name: "Cookies" });

    const headingElement = screen.getByRole("heading", {
      name: "Essential Cookies",
    });

    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(bannerElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClick when close button is clicked", () => {
    const onClickMock = jest.fn();
    render(<CookiesBanner onClick={onClickMock} />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
