/* eslint-disable react/no-unescaped-entities */
// import Carousel from "@/components/carousel";
import Details from "@/components/details";
import Button from "@/components/button";
import Link from "next/link";
import { descriptionDetail } from "../../help/description_detail"
import {ArrowIcon} from "../../../public/assets/icons"

const About = () => {
    return(
        <div className="wrap-about">
        <h1 className="govuk-heading-l">Murphy's Yard</h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">Murphy's Yard Kentish Town NW5</p>
        <div className="wrap-carousel-desktop">
        <div className="carousel-wrap">
            {/* <Carousel /> will be place here */}
            Carousel
        </div>
        <div>
        <h2 className="govuk-heading-m">About this development</h2>
        <p className="govuk-body-s">Murphy’s, a major local employer who have been in Kentish Town for 57 years, are proposing a redevelopment of Murphy’s Yard (behind Highgate Road) to provide new industrial space, offices, restaurants, healthcare, leisure and homes, with circa one third of the site for new public open space.</p>
        <p className="govuk-body-s">Murphy’s Head Office will remain on the site and the site ownership will remain within the Murphy’s family. The development will provide a new link from Hampstead Heath to Kentish Town and will open up a site that has been closed to the public for centuries.</p>
        </div>
</div>
<div className="wrap-comment-application">
        <Button content="Comment on this application" icon={<ArrowIcon/>}/>
        <Link href="#" style={{marginTop: "-15px"}} className="govuk-link">Sign up for updates about this application</Link>
        </div>
        <h3 className="govuk-heading-m">Application type</h3>
        <p className="govuk-body-s">
        Outline Planning Permission – the developer is asking the local authority to agree to the principle of this development. The developer will need to submit the details in stage two of this application at a later date.
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
        <p className="govuk-body-s">Maximum 19 storeys</p>
        <h3 className="govuk-heading-m">Estimated construction time</h3>
        <p className="govuk-body-s">Finished by 2030</p>
        <h3 className="govuk-heading-m">Application reference</h3>
        <p className="govuk-body-s">2021/3225/P</p>
        </div>
    )
}

export default About