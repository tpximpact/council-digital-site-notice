import Impact from "../../src/components/impact";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Impact component", () => {
  const data = {
    showHousing: true,
    housing: {
      residentialUnits: 10,
      affordableResidentialUnits: 5,
    },
    showOpenSpace: true,
    openSpaceArea: 1000,
    showJobs: true,
    jobs: {
      min: 10,
      max: 20,
    },
    showCarbon: true,
    carbonEmissions: 50,
    showAccess: true,
    access: "Pedestrian and vehicle access",
  };

  it("renders the component with data", () => {
    const { getByText } = render(<Impact data={data} />);

    expect(getByText("How could this affect you?")).toBeInTheDocument();
    expect(
      getByText(
        "Any new development in your local area will have an effect on your community.",
      ),
    ).toBeInTheDocument();
    expect(
      getByText(
        "We’ve outlined some of the ways we think this development would impact your community, so that you can give us feedback on what’s important for us to consider when we’re deciding what to give planning permission for.",
      ),
    ).toBeInTheDocument();
    expect(getByText("New homes")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("new homes")).toBeInTheDocument();
    expect(getByText("5%")).toBeInTheDocument();
    expect(getByText("affordable housing")).toBeInTheDocument();
    expect(getByText("Open spaces")).toBeInTheDocument();
    expect(getByText("1000")).toBeInTheDocument();
    expect(getByText("square metres")).toBeInTheDocument();
    expect(getByText("New jobs")).toBeInTheDocument();
    expect(getByText("10-20")).toBeInTheDocument();
    expect(getByText("new roles")).toBeInTheDocument();
    expect(getByText("Carbon emissions")).toBeInTheDocument();
    expect(getByText("50%")).toBeInTheDocument();
    expect(getByText("less than minimum requirements")).toBeInTheDocument();
  });
});
