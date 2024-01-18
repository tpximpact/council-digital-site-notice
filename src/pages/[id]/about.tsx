import Details from "@/components/details";
import Link from "next/link";
import { descriptionDetail } from "../../../util/description_detail"
import {ArrowIcon} from "../../../public/assets/icons"
import { Data } from "../../../util/type";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import Gallery from "@/components/gallery";

function About({
        _id,
        name, 
        address, 
        description, 
        height, 
        reference, 
        commentDeadline, 
        applicationType, 
        image_gallery}: 
        Data) {

        const deadline = commentDeadline?.split(" ")[0].split("/")[2]
        const [loadImage, setLoadImage] = useState(0)
        const [isModalOpen, setIsModalOpen] = useState(false)
        const [imageSelected, setImageSelected] = useState()


        useEffect(() => {
            if(image_gallery?.length < 8) {
                setLoadImage(image_gallery?.length)
            } else {
                setLoadImage(6)
            }
            setImageSelected(image_gallery?.[0])
        }, [image_gallery])

            
    return(
        <div className="wrap-about">
            {
                isModalOpen && <Modal setIsModalOpen={setIsModalOpen} image={imageSelected}/>
            }
        <h1 className="govuk-heading-l">{name}</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">{address}</p>
    <div className="wrap-carousel-desktop">
{
    image_gallery && 
<Gallery 
    images={image_gallery} 
    loadImage={loadImage} 
    setIsModalOpen={setIsModalOpen} 
    setLoadImage={setLoadImage}
    setImageSelected={setImageSelected}
    imageSelected={imageSelected}
/>
}
        <div>
        <h2 className="govuk-heading-m">About this development</h2>
        <p className="govuk-body-s">{description}</p>
        </div>
</div>
<div className="wrap-comment-application">
    <Link className="govuk-button govuk-!-font-weight-bold" style={{textDecoration:"none"}} href={`${_id}/feedback`}>Comment on this application <ArrowIcon /></Link>
        <Link href="#" style={{marginTop: "-15px"}} className="govuk-link">Sign up for updates about this application</Link>
        </div>
        <h3 className="govuk-heading-m">Application type</h3>
        <p className="govuk-body-s">
        {applicationType}
        </p>
        <Details summary='Learn more about application types' description={descriptionDetail["about"]}/>
        <h3 className="govuk-heading-m">How the site will be used</h3>
        <div className="govuk-body-s">
            <ul>
                <li>Residential</li>
                <li>Commercial</li>
                <li>Industrial</li>
            </ul>
        </div>
        <h3 className="govuk-heading-m">Height</h3>
        <p className="govuk-body-s">Maximum {height} storeys</p>
        <h3 className="govuk-heading-m">Estimated construction time</h3>
        <p className="govuk-body-s">Finished by {deadline}</p>
        <h3 className="govuk-heading-m">Application reference</h3>
        <p className="govuk-body-s">{reference}</p>
        </div>
    )
}

export default About