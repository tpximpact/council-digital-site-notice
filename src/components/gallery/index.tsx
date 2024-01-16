import Image from "next/image"
import { Button } from "../button"
const Gallery = ({images, loadImage, setIsModalOpen, setLoadImage, setImageSelected, imageSelected}:any) => {
    return(
        <>
                <div className="carousel-wrap">
                    <Image src={images?.[0]} alt="" width={323} height={240} onClick={() => {setIsModalOpen(true), setImageSelected(imageSelected)}}/>
                    <div className="carousel-image-list">
                    {images?.slice(0, loadImage).map((el:any, index :any)=> {
                        return (
                            <div key={index} onClick={() => {setIsModalOpen(true), setImageSelected(el)}}>
                            <Image src={el} alt="" width={100} height={80}/>
                            </div>

                        )
                    })}
</div>
{
    images?.length > loadImage && <Button onClick={() => setLoadImage(images?.length)} content={`Load ${images?.length - loadImage} more images`} className="govuk-button--secondary gallery-image-button"/>
}

        </div>
        </>
    )
}

export default Gallery