import ImageGallery from "react-image-gallery";
import Details from "@/components/details";
import {Button} from "@/components/button";
import Link from "next/link";
import { descriptionDetail } from "../../../util/description_detail"
import {ArrowIcon} from "../../../public/assets/icons"
import { urlFor } from "../../../util/client";
import { DataDetails } from "../../../util/type";

function About({data:{ massings, name, development_address, development_description, application_type, proposedLandUse, height, constructionTime, applicationNumber}} : {data: DataDetails}) {


        const images = [
            {
                original: massings && urlFor(massings)?.url(),
                thumbnail: massings && urlFor(massings)?.url(),
            },
            {
              original: massings && urlFor(massings)?.url(),
              thumbnail: massings && urlFor(massings)?.url(),
            },
            {
              original: massings && urlFor(massings)?.url(),
              thumbnail: massings && urlFor(massings)?.url(),
            },
          ];
            
    return(
        <div className="wrap-about">
        <h1 className="govuk-heading-l">{name}</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">{development_address}</p>
    <div className="wrap-carousel-desktop">
        <div className="carousel-wrap">
            {
                massings && <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false}/>
            }
        

        </div>
        <div>
        <h2 className="govuk-heading-m">About this development</h2>
        <p className="govuk-body-s">{development_description
}</p>
        </div>
</div>
<div className="wrap-comment-application">
        <Button content="Comment on this application" icon={<ArrowIcon/>}/>
        <Link href="#" style={{marginTop: "-15px"}} className="govuk-link">Sign up for updates about this application</Link>
        </div>
        <h3 className="govuk-heading-m">Application type</h3>
        <p className="govuk-body-s">
        {application_type}
        </p>
        <Details summary='Learn more about application types' description={descriptionDetail["about"]}/>
        <h3 className="govuk-heading-m">How the site will be used</h3>
        <div className="govuk-body-s">
            {
                proposedLandUse && (
                    <ul>
                        {proposedLandUse.classB && <li>Industrial</li>} 
                        {proposedLandUse.classC && <li>Residential</li>}
                        {proposedLandUse.classE && <li>Commercial</li>}
                        {proposedLandUse.classF && <li>Industrial</li>}
                        {proposedLandUse.suiGeneris && <li>{proposedLandUse.suiGenerisDetail}</li>}
                </ul>
                )
            }

        </div>
        {
            height && (<>
            <h3 className="govuk-heading-m">Height</h3>
            <p className="govuk-body-s">Maximum {height} storeys</p>
            </>)
        }
        {
            constructionTime && (
                <>
                <h3 className="govuk-heading-m">Estimated construction time</h3>
                <p className="govuk-body-s">{constructionTime}</p>
                </>
            )
        }

        <h3 className="govuk-heading-m">Application reference</h3>
        <p className="govuk-body-s">{applicationNumber
}</p>
        </div>
    )
}

export default About