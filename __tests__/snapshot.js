import { render } from "@testing-library/react";
import Home from "../src/pages/index";
import { descriptionDetail } from "../util/description-detail";

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});

describe("descriptionDetail", () => {
  it("should render the 'about' description correctly", () => {
    const { container } = render(descriptionDetail.about);
    expect(container).toMatchSnapshot();
  });

  it("should render the 'topics' description correctly", () => {
    const { container } = render(descriptionDetail.topics);
    expect(container).toMatchSnapshot();
  });

  it("should render the 'home' description correctly", () => {
    const { container } = render(descriptionDetail.home);
    expect(container).toMatchSnapshot();
  });
});
