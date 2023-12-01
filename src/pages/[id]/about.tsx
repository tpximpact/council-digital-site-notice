// import Carousel from "@/components/carousel";
import Details from "@/components/details";
import Button from "@/components/button";
import Link from "next/link";
import { descriptionDetail } from "../../help/description_detail"
import {ArrowIcon} from "../../../public/assets/icons"

const About = ({data:{
        name, 
        address, 
        description, 
        height, 
        reference, 
        commentDeadline, 
        applicationType}}: any) => {
            
        const deadline = commentDeadline.split(" ")[0].split("/")[2]
            
    return(
        <div className="wrap-about">
        <h1 className="govuk-heading-l">{name}</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">{address}</p>
        <div className="wrap-carousel-desktop">
        <div className="carousel-wrap">
            {/* <Carousel /> will be place here */}
            Carousel
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