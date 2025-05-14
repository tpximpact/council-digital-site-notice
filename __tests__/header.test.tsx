import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Link, { LinkProps } from "next/link";
import Header from "../src/components/header";
import { ReactNode } from "react";

expect.extend(toHaveNoViolations);

jest.mock("../src/app/actions/sanityClient", () => ({
  urlFor: jest.fn(),
}));

jest.mock("../src/app/actions/sanityClient", () => ({
  urlFor: jest.fn(() => ({
    width: jest.fn().mockReturnThis(),
    height: jest.fn().mockReturnThis(),
    fit: jest.fn().mockReturnThis(),
    url: jest.fn().mockReturnValue("http://example.com/logo.png"),
  })),
}));

jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    className,
    ...rest
  }: LinkProps & { children: ReactNode; className?: string }) => {
    if (typeof href === "string" && href.trim() !== "") {
      return (
        <a href={href} className={className} {...rest}>
          {children}
        </a>
      );
    } else {
      return (
        <button
          type="button"
          className={className}
          onClick={() => {
            console.warn(
              "Invalid href provided, rendering as a button instead.",
            );
          }}
        >
          {children}
        </button>
      );
    }
  };

  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Header", () => {
  describe("without councilName", () => {
    const globalConfig = {};
    it("should render correctly", async () => {
      const { container } = render(<Header globalConfig={globalConfig} />);

      expect(container.firstChild).not.toHaveClass("dsn-header--has-logo");
      const logo = screen.queryByRole("link", {
        name: /Council/i,
      });
      expect(logo).not.toBeInTheDocument();
      expect(screen.queryByText("Council")).not.toBeInTheDocument();
      expect(screen.getByText("Planning applications")).toBeInTheDocument();
    });

    it("should have no accessibility violations", async () => {
      const { container } = render(<Header globalConfig={globalConfig} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("with councilName", () => {
    const globalConfig = {
      councilName: "Test",
    };
    it("should render correctly", async () => {
      const { container } = render(<Header globalConfig={globalConfig} />);

      expect(container.firstChild).not.toHaveClass("dsn-header--has-logo");

      const logo = screen.getByRole("link", {
        name: /Test Council/i,
      });

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass("dsn-header__logo-link");
      expect(logo).toHaveAttribute("href", "/");
      expect(logo).toHaveStyle({
        backgroundImage: "none",
      });
      expect(logo).toHaveTextContent("Test Council");

      expect(screen.getByText("Planning applications")).toBeInTheDocument();
    });

    it("should have no accessibility violations", async () => {
      const { container } = render(<Header globalConfig={globalConfig} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("with councilName and councilLogo", () => {
    const globalConfig = {
      councilName: "Test",
      logo: {
        _type: "image",
        asset: {
          _ref: "image-5cde9e98a2fa6341f5957fff4f9a98f00f52ab1a-101x36-png",
          _type: "reference",
        },
      },
    };
    it("should render correctly", async () => {
      const { container } = render(<Header globalConfig={globalConfig} />);

      expect(container.firstChild).toHaveClass("dsn-header--has-logo");

      const logo = screen.getByRole("link", {
        name: /Test Council/i,
      });

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass("dsn-header__logo-link");
      expect(logo).toHaveAttribute("href", "/");
      expect(logo).toHaveStyle({
        backgroundImage: "http://example.com/logo.png",
      });
      expect(logo).toHaveTextContent("Test Council");

      expect(screen.getByText("Planning applications")).toBeInTheDocument();
    });

    it("should have no accessibility violations", async () => {
      const { container } = render(<Header globalConfig={globalConfig} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
