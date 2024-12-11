"use client";

import { urlFor } from "@/app/actions/sanityClient";
import { PlanningApplication } from "../../../sanity/sanity.types";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({
  images,
}: {
  images:
    | PlanningApplication["image_head"][]
    | PlanningApplication["image_gallery"][];
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="dpr-gallery">
      {lightboxOpen && (
        <div className="dpr-gallery__lightbox" id="lightbox">
          <div>
            <button
              className="dpr-gallery__button"
              onClick={() => setLightboxOpen(false)}
              aria-controls="lightbox"
            >
              Close
            </button>
          </div>

          <div
            className="dpr-gallery__lightbox-image"
            style={{
              backgroundImage: images[selectedImage]
                ? `url(${urlFor(images[selectedImage]).url()})`
                : "none",
            }}
          ></div>

          <div>
            <button
              className="dpr-gallery__button"
              onClick={() => setSelectedImage(selectedImage - 1)}
              disabled={selectedImage <= 0}
            >
              Previous image
            </button>

            <button
              className="dpr-gallery__button"
              onClick={() => setSelectedImage(selectedImage + 1)}
              disabled={selectedImage >= images.length - 1}
            >
              Next image
            </button>
          </div>
        </div>
      )}
      <div
        className="dpr-gallery__featured-image"
        id="current-image"
        style={{
          backgroundImage: images[selectedImage]
            ? `url(${urlFor(images[selectedImage]).url()})`
            : "none",
        }}
      >
        <button
          onClick={() => setLightboxOpen(true)}
          aria-controls="lightbox"
          className="dpr-gallery__button-fullscreen"
        >
          View fullscreen
        </button>
      </div>
      <div className="dpr-gallery__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className="dpr-gallery__thumbnail"
            onClick={() => setSelectedImage(index)}
            aria-controls="current-image"
            title={`Click to show image number ${index + 1}`}
            style={{
              backgroundImage: images[index]
                ? `url(${urlFor(images[index]).url()})`
                : "none",
            }}
          >
            <span className="govuk-visually-hidden">
              Click to show image number {index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
