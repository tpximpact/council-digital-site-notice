import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/button"
import {ArrowIcon} from "../../../../public/assets/icons"

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

function Process({id, 
    applicationStage,
    commentDeadline
}: {id: string, 
    applicationStage: any
    commentDeadline: string
}) {

    const singleApplicationStatus = applicationStage?.status[applicationStage?.stage?.toLowerCase()]

    return(
        <section className="process-wrap">
            <h2 className="govuk-heading-l">Where are we in the process?</h2>
            <Link className="govuk-link" href="#">Find out more about the planning process</Link>
            <div className="wrap-grid-button">
                <div className="process-grid">
                    <p className="govuk-body govuk-!-font-weight-bold process-consultation">{applicationStage?.stage}</p>
                    <p className={`govuk-body-s process-consultation-result ${aplicationStageStyle(singleApplicationStatus)}`}><span>{singleApplicationStatus?.toUpperCase()}</span></p>
                    <p className="govuk-body application-days">{commentDeadline && commentDeadline} {parseFloat(commentDeadline) > 1 ? 'days' : 'day'} left</p>
                    <p className="govuk-body">
                        {applicationStageMessage(applicationStage?.stage, singleApplicationStatus)}
                    </p>
                </div>
                <div>
                    <div className="wrap-secondary-button-image">
                        <Button className="govuk-button govuk-button--secondary" data-module="govuk-button" content="View application documents and comments"/>
                        <Image src="/assets/images/comments-and-docs.png" width={64} height={64} alt="summary and comment icon" style={{marginLeft: "20px"}}/>
                    </div>
                    <div className="wrap-button">
                        <Link className="govuk-button govuk-!-font-weight-bold" style={{textDecoration:"none"}} href={`${id}/feedback`}>Comment on this application <ArrowIcon /></Link>
                        <Link className="govuk-link process-link" href="">Sign up for updates about this application</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Process