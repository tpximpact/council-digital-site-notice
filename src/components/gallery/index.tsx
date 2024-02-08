import Image from "next/image"
import { Button } from "../button"
import { urlFor } from "../../../util/client"
const Gallery = ({images, loadImage, setIsModalOpen, setLoadImage, setImageSelected, imageSelected, image_head}:any) => {
    return(
        <>
                <div className="carousel-wrap">
                    <Image src={urlFor(image_head ? image_head : images?.[0])?.url()} alt="" width={323} height={240} onClick={() => {setIsModalOpen(true), setImageSelected(image_head || images[0])}}/>
                    <div className="carousel-image-list"> 
                    { images && images?.slice(0, loadImage).map((el:any, index :any)=> {
                        return (
                            <div key={index} onClick={() => {setIsModalOpen(true), setImageSelected(el)}}>
                            <Image src={urlFor(el).url()} alt="" width={100} height={80}/>
                            </div>

                        )
                    })}
</div>
{
    images?.length > loadImage && <Button onClick={() => setLoadImage(images?.length)} content={`Load ${images?.length - loadImage} more images`} className="govuk-button--secondary"/>
}

        </div>
        </>
    )
}

export default Gallery