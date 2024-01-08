import ImageGallery from "react-image-gallery";
import Details from "@/components/details";
import {Button} from "@/components/button";
import Link from "next/link";
import { descriptionDetail } from "../../../util/description_detail"
import {ArrowIcon} from "../../../public/assets/icons"
import { urlFor } from "../../../util/client";
import { DataDetails } from "../../../util/type";

function About({data} : {data: DataDetails}) {

    let images: any = []

    if(data?.massings) {
        images = [
            {
                original: data?.massings && urlFor(data?.massings)?.url(),
                thumbnail: data?.massings && urlFor(data?.massings)?.url(),
            },
            {
              original: data?.massings && urlFor(data?.massings)?.url(),
              thumbnail: data?.massings && urlFor(data?.massings)?.url(),
            },
            {
              original: data?.massings && urlFor(data?.massings)?.url(),
              thumbnail: data?.massings && urlFor(data?.massings)?.url(),
            },
          ]
    } else {
        images = []
    }

            
    return(
        <div className="wrap-about">
        <h1 className="govuk-heading-l">{data?.name}</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">{data?.development_address}</p>
    <div className="wrap-carousel-desktop">
        <div className="carousel-wrap">
            {
                data?.massings && <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false}/>
            }
        

        </div>
        <div>
        <h2 className="govuk-heading-m">About this development</h2>
        <p className="govuk-body-s">{data?.development_description
}</p>
        </div>
</div>
<div className="wrap-comment-application">
        <Button content="Comment on this application" icon={<ArrowIcon/>}/>
        <Link href="#" style={{marginTop: "-15px"}} className="govuk-link">Sign up for updates about this application</Link>
        </div>
        <h3 className="govuk-heading-m">Application type</h3>
        <p className="govuk-body-s">
        {data?.application_type}
        </p>
        <Details summary='Learn more about application types' description={descriptionDetail["about"]}/>
        <h3 className="govuk-heading-m">How the site will be used</h3>
        <div className="govuk-body-s">
            {
                data?.proposedLandUse && (
                    <ul>
                        {data?.proposedLandUse.classB && <li>Industrial</li>} 
                        {data?.proposedLandUse.classC && <li>Residential</li>}
                        {data?.proposedLandUse.classE && <li>Commercial</li>}
                        {data?.proposedLandUse.classF && <li>Industrial</li>}
                        {data?.proposedLandUse.suiGeneris && <li>{data?.proposedLandUse.suiGenerisDetail}</li>}
                </ul>
                )
            }

        </div>
        {
            data?.height && (<>
            <h3 className="govuk-heading-m">Height</h3>
            <p className="govuk-body-s">Maximum {data?.height} storeys</p>
            </>)
        }
        {
            data?.constructionTime && (
                <>
                <h3 className="govuk-heading-m">Estimated construction time</h3>
                <p className="govuk-body-s">{data?.constructionTime}</p>
                </>
            )
        }

        <h3 className="govuk-heading-m">Application reference</h3>
        <p className="govuk-body-s">{data?.applicationNumber
}</p>
        </div>
    )
}

export default About