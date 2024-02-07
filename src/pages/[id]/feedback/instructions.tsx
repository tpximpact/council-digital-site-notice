/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { useContext, useEffect, useState } from "react";
import { ContextApplication } from "@/context";
import { urlFor } from "../../../../util/client";
import { DataDetails } from "../../../../util/type";

function Instructions({data} : {data: DataDetails}) {
    const { dataApplication: {globalInfo} } = useContext(ContextApplication);
    const [image, setImage] = useState<string |undefined>(undefined)
    const [addressData, setAddressData] = useState<string>('')
    const [applicationNumberData, setApplicationNumberData] = useState<string | undefined>(undefined)
    const [councilName, setCouncilName] = useState()

    useEffect(() => {
        const initialGlobalValue = localStorage.getItem("globalInfo")
        
        if(initialGlobalValue !== null) {
            setCouncilName(JSON.parse(initialGlobalValue).councilName)
        } else {
            setCouncilName(globalInfo.councilName)
        }

       const getStorage = localStorage.getItem("application")
       if(Object.keys(data).length > 0 || getStorage === null) {
        const {address, image_head, applicationNumber} = data
          setImage(image_head)
            setAddressData(address)
            setApplicationNumberData(applicationNumber)
       }else {
        const {image_head, address, application_number} = JSON.parse(getStorage)
        setImage(image_head)
        setAddressData(address)
        setApplicationNumberData(application_number)
       }
    }, [data, globalInfo.councilName])


     
    return(
        <section className="wrap-feedback">
            <h1 className="govuk-heading-l">Tell us what you think</h1>
            <div className="wrap-image-legend-feedback">
                {
                    image && <Image width={80} height={57} alt="Development image" src={urlFor(image)?.url()}/>
                }
            <div>
            <h3 className="govuk-heading-s">{addressData}</h3>
            <p className="govuk-body">{applicationNumberData}</p>
            </div>
            </div>
            <p className="govuk-body">Your feedback helps us improve developments so they meet the needs of people in {councilName}. It's important you let us know what you think.</p>
        </section>
    )
}

export default Instructions