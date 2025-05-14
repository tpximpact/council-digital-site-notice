"use client";

import { urlFor } from "@/app/actions/sanityClient";
import { PlanningApplication } from "../../../sanity/sanity.types";
import { useEffect, useRef, useState } from "react";

const ImageGallery = ({
  images,
}: {
  images:
    | PlanningApplication["image_head"][]
    | PlanningApplication["image_gallery"][];
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const modalElement = modalRef.current;
      if (!modalElement) return;

      const focusableElements = modalElement.querySelectorAll(
        "button",
      ) as NodeListOf<HTMLButtonElement>;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      /**
       * create a 'cage' - if the current focus is outside the modal, put focus back inside the modal
       * when the focus is on the last element and the user presses tab, focus the first element
       * when the focus is on the first element and the user presses shift + tab, focus the last element
       */
      if (
        event.key === "Tab" &&
        !modalElement.contains(document.activeElement)
      ) {
        if (event.shiftKey) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    const modalElement = modalRef.current;
    if (lightboxOpen && modalElement) {
      const focusableElements = modalElement.querySelectorAll(
        "button",
      ) as NodeListOf<HTMLButtonElement>;
      const firstElement = focusableElements[0];
      firstElement.focus();
      document.addEventListener("keyup", handleKeyPress);
      return () => {
        document.removeEventListener("keyup", handleKeyPress);
      };
    }
  }, [lightboxOpen, setLightboxOpen]);

  return (
    <div className={`dpr-gallery ${lightboxOpen ? "" : "dpr-gallery--closed"}`}>
      {lightboxOpen ? (
        <div
          className="dpr-gallery__lightbox"
          id="lightbox"
          aria-hidden={!lightboxOpen}
          {...{ hidden: !lightboxOpen }}
          aria-modal="true"
          aria-label="Lightbox showing images for this planning application"
          role="dialog"
          ref={modalRef}
          tabIndex={-1}
        >
          <div>
            <button
              className="dpr-gallery__button dpr-gallery__button--close"
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
                ? `url(${urlFor(images[selectedImage]).width(1024).height(768).ignoreImageParams().fit("fillmax").bg("f3f2f1").url()})`
                : "none",
            }}
          ></div>

          <div className="dpr-gallery__lightbox-navigation">
            <button
              className="dpr-gallery__button dpr-gallery__button--previous"
              onClick={() => setSelectedImage(selectedImage - 1)}
              disabled={selectedImage <= 0}
            >
              Previous image
            </button>

            <button
              className="dpr-gallery__button dpr-gallery__button--next"
              onClick={() => setSelectedImage(selectedImage + 1)}
              disabled={selectedImage >= images.length - 1}
            >
              Next image
            </button>
          </div>
        </div>
      ) : (
        // This acts as a placeholder for the browser to target with aria-controls until the lightbox is opened
        // lightbox needs to be conditionally rendered due to ref and focus locking
        <div
          id="lightbox"
          role="dialog"
          aria-hidden={true}
          aria-modal="false"
          hidden
        ></div>
      )}

      <div
        className="dpr-gallery__featured-image"
        id="current-image"
        style={{
          backgroundImage: images[selectedImage]
            ? `url(${urlFor(images[selectedImage]).width(385).height(270).ignoreImageParams().fit("fillmax").bg("f3f2f1").url()})`
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
                ? `url(${urlFor(images[index]).width(110).height(77).ignoreImageParams().fit("fillmax").bg("f3f2f1").url()})`
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
