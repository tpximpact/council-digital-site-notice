import ImageGallery from "react-image-gallery";
import Details from "@/components/details";
import {Button} from "@/components/button";
import Link from "next/link";
import { descriptionDetail } from "../../../util/description_detail"
import {ArrowIcon} from "../../../public/assets/icons"
import { urlFor } from "../../../util/client";

function About({data:{
        name, 
        address, 
        description, 
        height, 
        reference, 
        commentDeadline, 
        applicationType, image}}: any) {
            
        const deadline = commentDeadline?.split(" ")[0].split("/")[2]

        const images = [
            {
                original: urlFor(image).url(),
                thumbnail: urlFor(image).url(),
            },
            {
              original: urlFor(image).url(),
              thumbnail: urlFor(image).url(),
            },
            {
              original: urlFor(image).url(),
              thumbnail: urlFor(image).url(),
            },
          ];
            
    return(
        <div className="wrap-about">
        <h1 className="govuk-heading-l">{name}</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">{address}</p>
    <div className="wrap-carousel-desktop">
        <div className="carousel-wrap">
        <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false}/>
        </div>
        <div>
        <h2 className="govuk-heading-m">About this development</h2>
        <p className="govuk-body-s">{description}</p>
        </div>
</div>
<div className="wrap-comment-application">
        <Button content="Comment on this application" icon={<ArrowIcon/>}/>
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