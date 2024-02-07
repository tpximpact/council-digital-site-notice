import Image from "next/image"
import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import { ContextApplication } from "@/context"
import {ArrowIcon} from "../../../../public/assets/icons"
import { DataDetails } from "../../../../util/type";

function Process({data}: {data: DataDetails}) {
    const {globalInfo} = useContext(ContextApplication)
    const [planningProcessUrl, setPlanningProcessUrl] = useState()

    useEffect(() => {
        const globalContent = localStorage.getItem('globalInfo')
        if(globalContent !== null) {
            setPlanningProcessUrl(JSON.parse(globalContent).planningProcessUrl)
        } else {
            setPlanningProcessUrl(globalInfo?.planningProcessUrl)
        }
    }, [globalInfo?.planningProcessUrl])


    return(
        <section className="process-wrap">
            
            <h2 className="govuk-heading-l">Where are we in the process?</h2>
            {
                planningProcessUrl && <Link className="govuk-link govuk-link--no-visited-state" href={planningProcessUrl} target="_blank">Find out more about the planning process</Link>
            }
            <div className="wrap-grid-button">
                <div className="process-grid">
                    <p className="govuk-body govuk-!-font-weight-bold process-consultation">Consultation</p>
                    <p className="govuk-body-s process-consultation-result"><span>{data?.applicationStage?.toUpperCase()}</span></p>
                    <p className="govuk-body application-days">{data?.commentDeadline && data?.commentDeadline} {parseFloat(data?.commentDeadline) > 1 ? 'days' : 'day'} left</p>
                    <p className="govuk-body">
                    People in the local community share feedback and comment on the proposed plans.
                    </p>
                </div>
                <div>{
                    data?.applicationDocumentsUrl && <div className="wrap-secondary-button-image">
                        <Link className="govuk-button govuk-button--secondary" data-module="govuk-button" href={data?.applicationDocumentsUrl}>View application documents and comments</Link>
                        <Image src="/assets/images/comments-and-docs.png" width={64} height={64} alt="summary and comment icon" style={{marginLeft: "20px"}}/>
                </div>
                    }
                    <div className="wrap-button">
                        <Link className="govuk-button govuk-!-font-weight-bold" style={{textDecoration:"none"}} href={`${data?._id}/feedback`}>Comment on this application <ArrowIcon /></Link>
                        {
                            data?.applicationUpdatesUrl && <Link className="govuk-link process-link govuk-link--no-visited-state" target="_blank" href={data?.applicationUpdatesUrl}>Sign up for updates about this application</Link>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Process