import Details from "@/components/details";
import Link from "next/link";
import { descriptionDetail } from "../../../../util/descriptionDetail"
import {ArrowIcon} from "../../../../public/assets/icons"
import { DataDetails } from "../../../../util/type";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import Gallery from "@/components/gallery";

function About({data} : {data: DataDetails}) {

        const deadline = data?.commentDeadline?.split(" ")[0].split("/")[2]
        const [loadImage, setLoadImage] = useState(0)
        const [isModalOpen, setIsModalOpen] = useState(false)
        const [imageSelected, setImageSelected] = useState()


        useEffect(() => {
            if(data?.image_gallery?.length < 8) {
                setLoadImage(data?.image_gallery?.length)
            } else {
                setLoadImage(6)
            }
            setImageSelected(data?.image_gallery?.[0])
        }, [data?.image_gallery])

            
    return(
        <div className="wrap-about">
            {
                isModalOpen && <Modal setIsModalOpen={setIsModalOpen} image={imageSelected}/>
            }
        <h1 className="govuk-heading-l">{data?.name}</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">{data?.address}</p>
        <div className="wrap-carousel-desktop">
            {
                data?.image_gallery && 
                <Gallery 
                images={data?.image_gallery} 
                loadImage={loadImage} 
                setIsModalOpen={setIsModalOpen} 
                setLoadImage={setLoadImage}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}
                />
            }
            <div>
                <h2 className="govuk-heading-m">About this development</h2>
                <p className="govuk-body">{data?.description}</p>
            </div>
        </div>
<div className="wrap-comment-application">
    <Link className="govuk-button govuk-!-font-weight-bold" style={{textDecoration:"none"}} href={`${data?._id}/feedback`}>Comment on this application <ArrowIcon /></Link>
       {
        data?.applicationUpdatesUrl && <Link href={data?.applicationUpdatesUrl} style={{marginTop: "-15px"}} className="govuk-link govuk-link--no-visited-state" target="_blank">Sign up for updates about this application</Link>
       }
        
        </div>
        <h3 className="govuk-heading-m">Application type</h3>
        <p className="govuk-body-s">
        {data?.applicationType}
        </p>
        <Details summary='Learn more about application types' description={descriptionDetail["about"]}/>
        <h3 className="govuk-heading-m">How the site will be used</h3>
        <div className="govuk-body">
            {
                data?.proposedLandUse && (
                    <ul>
                        {data?.proposedLandUse.classB && <li>Industrial</li>} 
                        {data?.proposedLandUse.classC && <li>Residential</li>}
                        {data?.proposedLandUse.classE && <li>Commercial</li>}
                        {data?.proposedLandUse.classF && <li>Community</li>}
                        {data?.proposedLandUse.suiGeneris && <li>{data?.proposedLandUse.suiGenerisDetail}</li>}
                </ul>
                )
            }

        </div>
        {
            data?.height && (<>
            <h3 className="govuk-heading-m">Height</h3>
            <p className="govuk-body">Maximum {data?.height} storeys</p>
            </>)
        }
        {
            data?.constructionTime && (
                <>
                <h3 className="govuk-heading-m">Estimated construction time</h3>
                <p className="govuk-body">{data?.constructionTime}</p>
                </>
            )
        }

        <h3 className="govuk-heading-m">Application reference</h3>
        <p className="govuk-body-s">{data?.applicationNumber}</p>
        </div>
    )
}

export default About