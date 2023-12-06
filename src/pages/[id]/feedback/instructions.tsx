/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { urlFor } from "../../../../util/client";
import { useEffect, useState } from "react";

const Instructions = ({data}:any) => {
    const [image, setImage] = useState(undefined)
    const [address, setAddress] = useState('')

    useEffect(() => {
       const initialValue = localStorage.getItem("application") || ''
        setImage(data.image || JSON.parse(initialValue).image)
        setAddress(data.address || JSON.parse(initialValue).address)
    }, [])


     
    return(
        <section className="wrap-feedback">
            <h1 className="govuk-heading-l">Tell us what you think</h1>
            <div className="wrap-image-legend-feedback">
                {
                    image && <Image width={80} height={57} alt="Development image" src={urlFor(image)?.url()}/>
                }
            
            <h3 className="govuk-heading-s">{address}</h3>
            </div>
            <p className="govuk-body-s">Your feedback helps us improve developments so they meet the needs of people in Lambeth. It's important you let us know what you think.</p>
        </section>
    )
}

export default Instructions