import Image from "next/image"
import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import { ContextApplication } from "@/context"
import {ArrowIcon} from "../../../../public/assets/icons"
import { DataDetails } from "../../../../util/type";

const aplicationStageStyle = (value: string) => {

    const style:{[key: string]: string} = {
    'approved': 'approved-status',
    'pending approval': 'approved-status',
    'refused': 'rejected-status',
    'successful': 'approved-status',
    'unsuccessful': 'refected-status'
    }

    return style[value?.toLowerCase()] || 'default-status'
}

const applicationStageMessage = (stage:string, status:string ) => {
    const consultation:{[key:string]:string} = {
        'in progress': 'People in the local community share feedback and comment on the proposed plans.',
        'extended': 'People in the local community share feedback and comment on the proposed plans',
    }

    const assessment:{[key:string]:string} = {
        'in progress': 'Assessment of the application is being made by the appropriate authorities. People in the local community can still comment on the plans until a decision is made.',
    }

    const decision:{[key:string]:string} = {
        'approved': 'This planning application has been approved.',
        'decision': 'This planning application has been approved pending legal confirmation.',
        'rejected': 'This planning application has been rejected.',
    }

    const appeal:{[key:string]:string} = {
        'in progress': 'An appeal has been lodged to try to change the decision about this application.',
        'successful': 'The initial decision has been overturned in appeal, and the application is now approved.', 
        'unsucessful': 'The initial decision has been upheld in appeal, and the application is still rejected.' 
    }

    const message:{[key:string]:string} = {
        'Consultation': consultation[status],
        'Assessment': assessment[status],
        'Decision': decision[status],
        'Appeal': appeal[status]
    }
    return message[stage]
}

function Process({data, commentDeadline}: {data: DataDetails, commentDeadline: string}) {

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

    const singleApplicationStatus = data?.applicationStage?.status[data?.applicationStage?.stage?.toLowerCase()]

    return(
        <section className="process-wrap">
            
            <h2 className="govuk-heading-l">Where are we in the process?</h2>
            {
                planningProcessUrl && <Link className="govuk-link govuk-link--no-visited-state" href={planningProcessUrl} target="_blank">Find out more about the planning process</Link>
            }
            <div className="wrap-grid-button">
                <div className="process-grid">
                    <p className="govuk-body govuk-!-font-weight-bold process-consultation">{(parseFloat(commentDeadline) <= 0 && data?.applicationStage?.stage == 'Consultation' && singleApplicationStatus == 'in progress') ? 'Assessment': data?.applicationStage?.stage}</p>
                    <p className={`govuk-body process-consultation-result ${aplicationStageStyle(singleApplicationStatus)}`}><span>{singleApplicationStatus?.toUpperCase()}</span></p>
                    {
                        (data?.enableComments && parseFloat(commentDeadline) > 0) && <p className="govuk-body application-days">{commentDeadline} {parseFloat(commentDeadline) > 1 ? 'days' : 'day'} left</p>
                    }
                    
                    <p className="govuk-body">
                        {applicationStageMessage(data?.applicationStage?.stage, singleApplicationStatus)}
                    </p>
                </div>
                <div style={{marginTop: '20px'}}>{
                    data?.applicationDocumentsUrl && <div className="wrap-secondary-button-image">
                        <Link className="govuk-button govuk-button--secondary" data-module="govuk-button" href={data?.applicationDocumentsUrl}>View application documents and comments</Link>
                        <Image src="/assets/images/comments-and-docs.png" width={64} height={64} alt="summary and comment icon" style={{marginLeft: "20px"}}/>
                </div>
                    }
                    <div className={`${(data?.enableComments || data?.applicationDocumentsUrl) && "wrap-button"}`}>
                        {
                            data?.enableComments && <Link className="govuk-button govuk-!-font-weight-bold" style={{textDecoration:"none"}} href={`${data?._id}/feedback`}>Comment on this application <ArrowIcon /></Link>
                        }
                        
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