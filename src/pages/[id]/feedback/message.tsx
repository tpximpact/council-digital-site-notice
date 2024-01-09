/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { useContext, useEffect, useState } from "react";
import { ContextApplication } from "@/context";
import Image from "next/image";
import { urlFor } from "../../../../util/client";


const FeedbackMessage = () => {
    const { dataApplication: {address, image, reference} } = useContext(ContextApplication);
    const [addressAplication, setAddressAplication] = useState()
    const [imageAplication, setImageAplication] = useState()
    const [referenceAplication, setReferenceAplication] = useState()

    useEffect(() => {
        const initialValue = localStorage.getItem("application")
        if(address !== undefined || image !== undefined || reference !== undefined || initialValue === null) {
            setAddressAplication(address)
            setImageAplication(image)
            setReferenceAplication(reference)
        } else {
            setAddressAplication(JSON.parse(initialValue).address)
            setImageAplication(JSON.parse(initialValue).image)
            setReferenceAplication(JSON.parse(initialValue).reference)
        }
    },[address, image, reference])

    return(
        <section>
            <div className="wrap-message-reference">
                <h1 className="govuk-heading-l"> Comment submitted</h1>
                <h2 className="govuk-body-l"> Your reference number</h2>
                <p className="govuk-body-l">HDJ2123F</p>

            </div>
            <div style={{display: 'flex', marginTop: '25px'}}>
                {imageAplication && <Image src={urlFor(imageAplication)?.url()} alt="development-image" width={80} height={56}/>}
            
            <div style={{marginLeft: '15px'}}>
            <p className="govuk-body govuk-!-font-weight-bold">{addressAplication}</p>
            <p className="govuk-body govuk-!-font-weight-bold">Application reference <span className="govuk-body govuk-!-font-weight-regular">{referenceAplication}</span></p>
            </div>
            </div>
            <Link href="" className="govuk-button">Sign up for updates about this application</Link>
            <h1 className="govuk-heading-l">Discover other planning applications in your area</h1>
            <p className="govuk-body">Interested in finding out more about what is going on around you? You can view all the planning applications currently active in your area, find out about them, and provide your comments.</p>
            <Link href="" className="govuk-button govuk-button--secondary">View local planning applications</Link>
            <h1 className="govuk-heading-l">Get involved in Lambeth’s Local Plan</h1>
            <p className="govuk-body">You can have a big impact on developments in your local community by getting involved in Lambeth's Local Plan. </p>
            <Link href="" className="govuk-button govuk-button--secondary">Get involved in the local plan</Link>
        </section>
    )
}

export default FeedbackMessage