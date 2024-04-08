import Image from "next/image";
import { urlFor } from "@/app/actions/client";

const Modal = ({ setIsModalOpen, image }: any) => {
  return (
    <div className="modal" onClick={() => setIsModalOpen(false)}>
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
