import Header from "../src/components/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("it should render correctly", () => {
  render(<Header />);
  expect(
    screen.getByRole("definition", { definition: "Planning applications" }),
  );
});
