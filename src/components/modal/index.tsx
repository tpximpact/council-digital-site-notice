import Image from "next/image"
import { urlFor } from "../../../util/client"

const Modal = ({setIsModalOpen, image}: any) => {
    return (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
            <Image src={urlFor(image).url()} alt="" width={323} height={240} style={{ marginTop: '14rem'}}/>
        </div>
    )
}

export default Modal