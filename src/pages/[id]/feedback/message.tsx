/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { useContext, useEffect, useState } from "react";
import { ContextApplication } from "@/context";
import Image from "next/image";
import { urlFor } from "../../../../util/client";


const FeedbackMessage = () => {
    const { dataApplication: {address, image_head, applicationNumber, applicationUpdatesUrl , _id, globalInfo} } = useContext(ContextApplication);
    const [addressAplication, setAddressAplication] = useState()
    const [imageAplication, setImageAplication] = useState()
    const [referenceAplication, setReferenceAplication] = useState()
    const [applicationId, setApplicationId] = useState()
    const [updatesUrl, setUpdatesUrl] = useState()
    const [involveUrl, setInvolveUrl] = useState()
    const [councilName, setCouncilName] = useState()
    const [formId, setFormId] = useState<string|null>()

    useEffect(() => {
        const initialValue = localStorage.getItem("application")
        const initialGlobalValue = localStorage.getItem("globalInfo")

        const formId = localStorage.getItem("formId");
        setFormId(formId)
        
        if(initialGlobalValue !== null) {
            setInvolveUrl(JSON.parse(initialGlobalValue).howToGetInvolveUrl)
            setCouncilName(JSON.parse(initialGlobalValue).councilName)
        } else {
            setInvolveUrl(globalInfo?.howToGetInvolveUrl)
            setCouncilName(globalInfo?.councilName)
        }

        if(address !== undefined || image_head !== undefined || applicationNumber !== undefined || applicationUpdatesUrl !== undefined || initialValue === null) {
            setAddressAplication(address)
            setImageAplication(image_head)
            setReferenceAplication(applicationNumber)
            setUpdatesUrl(applicationUpdatesUrl)
            setApplicationId(_id)

        } else {
            setAddressAplication(JSON.parse(initialValue).address)
            setImageAplication(JSON.parse(initialValue).image_head)
            setReferenceAplication(JSON.parse(initialValue).applicationNumber)
            setUpdatesUrl(JSON.parse(initialValue).applicationUpdatesUrl)
            setApplicationId(JSON.parse(initialValue)._id)
        }

    },[address, image_head, applicationNumber, applicationUpdatesUrl, globalInfo?.howToGetInvolveUrl, globalInfo?.councilName, _id])

    return(
        <section>
            <div className="wrap-message-reference">
                <h1 className="govuk-heading-l"> Comment submitted</h1>
                <h2 className="govuk-body-l"> Your reference number</h2>
                <p className="govuk-body-l">{formId}</p>

            </div>
            <div style={{display: 'flex', marginTop: '25px'}}>
                {imageAplication && <Image src={urlFor(imageAplication)?.url()} alt="development-image" width={80} height={56}/>}
             
            <div style={{marginLeft: '15px'}}>
            <Link className="govuk-body govuk-!-font-weight-bold govuk-link govuk-link--no-visited-state" href={`/${applicationId}`} style={{marginBottom: '5px', textDecoration:'none'}}>{addressAplication}</Link>
            <p className="govuk-body govuk-!-font-weight-bold" style={{marginBottom: 0}}>Application reference </p>
            <p className="govuk-body">{referenceAplication}</p>
            </div>
            </div>
            {
                updatesUrl && <Link href={updatesUrl} className="govuk-button govuk-!-font-size-16" target="_blank">Sign up for updates about this application</Link>
            }
            <h1 className="govuk-heading-m">Discover other planning applications in your area</h1>
            <p className="govuk-body">If you’re interested in learning more about planning applications in your area, you can view all currently active applications and provide comments on them.</p>
            <Link href="/" className="govuk-button govuk-button--secondary govuk-!-font-size-16">View local planning applications</Link>
            {
                involveUrl &&
            <><h1 className="govuk-heading-m">Get involved in {councilName}’s Local Plan</h1><p className="govuk-body">You can have a big impact on developments in your local community by getting involved in {councilName}'s planning policy. </p><Link href={involveUrl} className="govuk-button govuk-button--secondary govuk-!-font-size-16">Find out how you can get involved</Link></>
            }
        </section>
    )
}

export default FeedbackMessage