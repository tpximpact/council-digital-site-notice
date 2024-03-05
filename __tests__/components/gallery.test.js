import Gallery from "../../src/components/gallery";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Image from "next/image";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props) => <img {...props} alt="" />,
}));

jest.mock("../../util/client", () => ({
  urlFor: jest.fn((image) => ({
    url: () => `https://mockedurl.com/${image}`,
  })),
}));

describe("Gallery Component", () => {
  const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const mockSetIsModalOpen = jest.fn();
  const mockSetLoadImage = jest.fn();
  const mockSetImageSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <Gallery
        images={mockImages}
        loadImage={2}
        setIsModalOpen={mockSetIsModalOpen}
        setLoadImage={mockSetLoadImage}
        setImageSelected={mockSetImageSelected}
        imageSelected={null}
        image_head={null}
      />,
    );
  });

  it("renders the initial image correctly", () => {
    const images = screen.getAllByRole("img", { name: "" });
    const initialImage = images[0];
    expect(initialImage).toHaveAttribute(
      "src",
      "https://mockedurl.com/image1.jpg",
    );
    fireEvent.click(initialImage);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
    expect(mockSetImageSelected).toHaveBeenCalledWith("image1.jpg");
  });

  it("loads more images when the button is clicked", () => {
    const loadMoreButton = screen.getByText("Load 1 more images");
    fireEvent.click(loadMoreButton);
    expect(mockSetLoadImage).toHaveBeenCalledWith(mockImages.length);
  });
});
