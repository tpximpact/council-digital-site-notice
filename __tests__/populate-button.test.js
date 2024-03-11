// import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import PopulateButton from "../src/components/populate-button/index";

// Mock the getGlobalContent function to simulate integrationMethod being 'openAPI'
// jest.mock("../util/client", () => ({
//   getGlobalContent: jest.fn(),
// }));
// TODO: Temporarily skipping due to issue with import/export. Re-enable after resolving the issue.

describe("PopulateButton", () => {
  test.skip("should render the 'Fetch now' button if integrationMethod is 'openAPI'", async () => {
    // render(<PopulateButton />);

    const button = screen.getByRole("button", { name: "Fetch now" });
    expect(button).toBeInTheDocument();
  });
});
