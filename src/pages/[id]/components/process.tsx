import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/button"
import {ArrowIcon} from "../../../../public/assets/icons"

function Process({id, 
    applicatonStage,
    commentDeadline
}: {id: string, 
    applicatonStage: string
    commentDeadline: string
}) {

    return(
        <section className="process-wrap">
            <h2 className="govuk-heading-l">Where are we in the process?</h2>
            <Link className="govuk-link" href="#">Find out more about the planning process</Link>
            <div className="wrap-grid-button">
                <div className="process-grid">
                    <p className="govuk-body govuk-!-font-weight-bold process-consultation">Consultation</p>
                    <p className="govuk-body-s process-consultation-result"><span>{applicatonStage?.toUpperCase()}</span></p>
                    <p className="govuk-body application-days">{commentDeadline && commentDeadline} {parseFloat(commentDeadline) > 1 ? 'days' : 'day'} left</p>
                    <p className="govuk-body">
                    People in the local community share feedback and comment on the proposed plans.
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