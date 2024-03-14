import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../src/components/modal";
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

jest.mock("../../util/client", () => ({
  urlFor: jest.fn(() => ({
    url: () => "https://example.com/test-image.jpg",
  })),
}));

describe("Modal Component", () => {
  const setIsModalOpen = jest.fn();
  const image = "some-image-identifier";

  beforeEach(() => {
    render(<Modal setIsModalOpen={setIsModalOpen} image={image} />);
  });

  it("renders the image correctly", () => {
    const modalImage = screen.getByRole("img");
    expect(modalImage).toHaveAttribute(
      "src",
      "https://example.com/test-image.jpg",
    );
    expect(modalImage).toHaveAttribute("alt", "");
  });
});
