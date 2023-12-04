/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { urlFor } from "../../../../util/client";

function Instructions({data}:any) {
    const {image, address} = data
    return(
        <section className="wrap-feedback">
            <h1 className="govuk-heading-l">Tell us what you think</h1>
            <div className="wrap-image-legend-feedback">
            <Image width={80} height={57} alt="Development image" src={urlFor(image).url()}/>
            <h3 className="govuk-heading-s">{address}</h3>
            </div>
            <p className="govuk-body-s">Your feedback helps us improve developments so they meet the needs of people in Lambeth. It's important you let us know what you think.</p>
        </section>
    )
}

export default Instructions