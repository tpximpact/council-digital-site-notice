import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlanningApplications from "../../src/components/planning-application";

describe("PlanningApplications", () => {
  const mockData = [
    {
      _id: "1",
      image_head: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg1",
      name: "Planning Application 1",
      address: "Address 1",
      location: { lat: 123, lng: 456 },
    },
    {
      _id: "2",
      image_head: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg2",
      name: "Planning Application 2",
      address: "Address 2",
      location: { lat: 789, lng: 123 },
    },
  ];

  const mockSearchLocation = { lat: 111, lng: 222 };

  it("renders planning applications correctly", () => {
    render(
      <PlanningApplications
        data={mockData}
        searchLocation={mockSearchLocation}
      />,
    );
    expect(screen.getByText("Planning Application 1")).toBeInTheDocument();
    expect(screen.getByText("Planning Application 2")).toBeInTheDocument();
  });
});
