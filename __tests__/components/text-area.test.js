import TextArea from "../../src/components/text-area";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("it should render correctly", () => {
  render(<TextArea label="How can we do better?" />);
  expect(
    screen.getByRole("definition", {
      definition: "How can we do better?",
      rows: 5,
    }),
  );
});
