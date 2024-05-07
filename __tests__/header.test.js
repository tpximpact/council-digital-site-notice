import Header from "../src/components/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("it should render correctly", async () => {
  const value = { globalConfig: null };
  render(await Header(value));
  expect(
    screen.getByRole("definition", { definition: "Planning applications" }),
  );
});
