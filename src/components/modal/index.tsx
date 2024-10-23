import Image from "next/image";
import { urlFor } from "@/app/actions/sanityClient";
import { useEffect } from "react";

const Modal = ({ setIsModalOpen, image }: any) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsModalOpen]);

  return (
    <div
      className="modal"
      onClick={() => setIsModalOpen(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
          setIsModalOpen(false);
        }
      }}
    >
      <Image
        src={urlFor(image).url()}
        alt=""
        sizes="100vw"
        fill
        style={{ objectFit: "scale-down" }}
      />
    </div>
  );
};

export default Modal;
