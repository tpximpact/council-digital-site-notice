import Image from "next/image"

const Modal = ({setIsModalOpen, image}: any) => {
    return (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
            <Image src={image} alt="" width={323} height={240} style={{ marginTop: '14rem'}}/>
        </div>
    )
}

export default Modal