import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "@/components/about";
import { mockedPlanningApplication } from "../../__mocks__/planningApplication";

// Mock dependencies
jest.mock("@/components/pageCenter", () => {
  const MockPageCenter = ({ children }: any) => <div>{children}</div>;
  MockPageCenter.displayName = "MockPageCenter";
  return MockPageCenter;
});
jest.mock("@/components/details", () => jest.fn());
jest.mock("@/components/buttonStart", () => {
  const MockButtonStart = (props: any) => <button>{props.content}</button>;
  MockButtonStart.displayName = "MockButtonStart";
  return MockButtonStart;
});
jest.mock("@/components/imageGallery", () => {
  const MockImageGallery = (props: any) => (
    <div>Gallery: {props.images?.length}</div>
  );
  MockImageGallery.displayName = "MockImageGallery";
  return MockImageGallery;
});

jest.mock("@/actions/sanityClient", () => ({
  getGlobalContent: jest.fn().mockResolvedValue({ globalEnableComments: true }),
}));

describe("About", () => {
  const applicationId = "12345";

  it("should render correctly", async () => {
    render(
      <About data={mockedPlanningApplication} applicationId={applicationId} />,
    );
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Mocked Application" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "123 Mocked St, Mocked City, MC1 2AB",
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("Gallery: 3")).toBeInTheDocument();
    });
  });
});
jest;
