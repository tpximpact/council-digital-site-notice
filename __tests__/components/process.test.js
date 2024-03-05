import { render, screen } from "@testing-library/react";
import { ContextApplication } from "@/context";
import Process from "../../src/components/process";
import "@testing-library/jest-dom";

describe("Process component", () => {
  test("renders the component correctly", () => {
    const data = {};
    const commentDeadline = "2022-12-31";

    render(
      <ContextApplication.Provider value={{ globalInfo: {} }}>
        <Process data={data} commentDeadline={commentDeadline} />
      </ContextApplication.Provider>,
    );

    // Assert that the component renders without errors
    expect(
      screen.getByText("Where are we in the process?"),
    ).toBeInTheDocument();
  });
});
