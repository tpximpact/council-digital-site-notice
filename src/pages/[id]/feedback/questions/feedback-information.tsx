/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/button"
import Link from "next/link"
import { ArrowIcon } from "../../../../../public/assets/icons"
import { getConcernInfo } from "../../../../../util/client"
import { useEffect, useState } from "react"



function FeedbackInformation({onChange}: any) {
    const [url, setUrl] = useState('')

    useEffect(() => {
        (async() => {
            const res = await getConcernInfo()
            if(res[0]?.url) {
                setUrl(res[0].concernUrl)
            } else if(res[0]?.concernConten) {
                setUrl('/concern-info')
            }
        })
        ()
    },[])
    return(
        <>
        <section style={{marginBottom: '20px'}}>
            <div className="info-header">
            <h1 className='govuk-heading-xl'>What you need to know before you comment</h1>
            </div>
            <h2 className="govuk-heading-l">What isn’t considered in planning approval</h2>
            <p className="govuk-body">There are some things planning officers can’t consider when approving or rejecting an application, even if they are important. These include:</p>
            <ul>
                <li className="govuk-body" style={{marginBottom: 0}}>who the applicant is or what their background is</li>
                <li className="govuk-body" style={{marginBottom: 0}}>loss of views</li>
                <li className="govuk-body" style={{marginBottom: 0}}>loss of property value</li>
                <li className="govuk-body" style={{marginBottom: 0}}>loss of trade, or increased competition</li>
                <li className="govuk-body" style={{marginBottom: 0}}>construction noise or disturbance during development</li>
                <li className="govuk-body" style={{marginBottom: 0}}>fears of damage to property</li>
                <li className="govuk-body" style={{marginBottom: 0}}>maintenance of property</li>
                <li className="govuk-body" style={{marginBottom: 0}}>boundary disputes, covenants or other property rights</li>
                <li className="govuk-body" style={{marginBottom: 0}}>rights of way</li>
            </ul>
            <p className="govuk-body">Strength of local opposition to a planning application can’t be considered. This means that if a comment you’d like to raise has already been made, you don’t need to repeat it.</p>
           { url !== "" &&
            <Link href={url} target="_blank" className="govuk govuk-link">What can you do if these things concern you?</Link>
           }
            
        </section>
        <section>
            <h2 className="govuk-heading-l">Why your comments are important</h2>
            <p className="govuk-body">There are three main reasons we ask residents to comment on planning applications:</p>
            <div>
            <p style={{fontWeight: 'bold', marginBottom: 0}} className="govuk-body">1. To use your knowledge of the area</p>
            <p className="govuk-body">You may be able to highlight on-the-ground details we don’t know about – for example, that a mature tree was left out of a developer's plans.</p>
            </div>
            <div>
            <p style={{fontWeight: 'bold', marginBottom: 0}} className="govuk-body">2. To influence the details</p>
            <p className="govuk-body">Your understanding of an area’s needs can help planners decide on things like amount of open space, cycling facilities, or what materials are appropriate for a scheme</p>
            </div>
            <div>
            <p style={{fontWeight: 'bold', marginBottom: 0}} className="govuk-body">3. To make sure we balance our priorities</p>
            <p className="govuk-body">It's useful know  which priorities are most important to residents, so we can push developers to be more ambitious with their targets. Telling us what your priorities are can help planners make that decision.</p>
            </div>
        </section>
        <section>
            <h2 className="govuk-heading-l">What happens to your comments</h2>
            <p className="govuk-body">The case officer will take all comments which are <Link href='' className="govuk govuk-link">material considerations</Link> into account when deciding whether or not to approve the application.</p>
            <p className="govuk-body">As part of this process, your comments will be posted online for the public to see. We will not include your name, address, telephone number or email address.</p>
            <p className="govuk-body">The case officer will summarise their findings in the officer's report and decision notice.</p>        
        </section>
        <Button content="Comment on this application" icon={<ArrowIcon/>} onClick={() => onChange()} className="feedback-information-button" iconClass="feedback-information-icon"/>
        </>
    )
}

export default FeedbackInformation