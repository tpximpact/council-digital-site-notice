import Breadcrumbs from "../../src/components/breadcrumbs";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test.only("it should render correctly", () => {
  render(
    <Breadcrumbs
      breadcrumbs_info={[
        { name: "Planning applications", href: "/" },
        { name: "Murphy's Yard" },
      ]}
    />,
  );
  expect(screen.getByText("Planning applications"));
  expect(screen.getByText("Murphy's Yard"));
});
