import Input from "../src/components/input";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("it should render correctly", () => {
  render(<Input />);
  expect(screen.getByRole("textbox", { type: "text" }));
  expect(
    screen.getByRole("definition", {
      definition: "Enter a postcode to find planning applications nearby",
    }),
  );
});
