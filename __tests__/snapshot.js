import { render } from "@testing-library/react";
import Home from "../src/app/(main)/page";

jest.mock("next/link", () => {
  return ({ href, children, className }) => {
    return (
      <a href={typeof href === "string" ? href : "#"} className={className}>
        {children}
      </a>
    );
  };
});

jest.mock("../src/app/actions/sanityClient", () => ({
  getActiveApplications: () => ({}),
  getActiveApplicationsByLocation: () => ({}),
  getGlobalContent: () => ({
    councilName: "Test Council",
    signUpUrl: "#",
  }),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams({ page: "1" }),
  useRouter: () => jest.fn(),
  usePathname: () => jest.fn(),
}));

it("renders homepage unchanged", async () => {
  const { container } = render(await Home({ params: {}, searchParams: {} }));
  expect(container).toMatchSnapshot();
});
