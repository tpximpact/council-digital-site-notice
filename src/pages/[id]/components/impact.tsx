import Image from "next/image";
import Details from "@/components/details";
import { descriptionDetail } from "../../../../util/description_detail"

function Impact() {
    return(
        <section className="impact-wrap">
            <div>
            <h1 className="govuk-heading-l">How could this affect you?</h1>
            <p className="govuk-body-s">Any new development in your local area will have an effect on your community.</p>
            <p className="govuk-body-s">We’ve outlined some of the ways we think this development would impact your community, so that you can give us feedback on what’s important for us to consider when we’re deciding what to give planning permission for.</p>
            <div className="impact-info">
                <div>
                <div className="wrap-impact-item">
                <h2 className="govuk-heading-m heading-center">New homes</h2>
                <Image src="/assets/images/icon-homes.png" width={64} height={64} alt="icon homes"/>
                </div>
                <p className="govuk-body small-margin-top"><span className="govuk-!-font-weight-bold">750</span> new homes</p>
                <p className="govuk-body grid-column-1" style={{ marginTop: "-10px"}}><span className="govuk-!-font-weight-bold">35%</span> affordable housing</p>
                <Details summary='How did we calculate this?' color='white' className="impact-details" description={descriptionDetail['home']}/>
                </div>

                <div>
                <div className="wrap-impact-item">
                <h2 className="govuk-heading-m heading-center grid-column-1">Healthcare</h2> 
                <Image src="/assets/images/icon-healthcare.png" width={64} height={64} alt="icon healthcare"/>
                </div>
                <p className="govuk-body small-margin-top"><span className="govuk-!-font-weight-bold">12% </span>additional demand on GPs and hospitals</p>
                <Details summary='How did we calculate this?' color='white' className="impact-details" description={descriptionDetail['healthcare']}/>
                </div>

                <div>
                <div className="wrap-impact-item">
                <h2 className="govuk-heading-m grid-column-1">Open spaces</h2>
                <Image src="/assets/images/icon-open-spaces.png" width={64} height={64} alt="icon open spaces"/>
                </div>
                <p className="govuk-body large-margin-top" ><span className="govuk-!-font-weight-bold">21,360</span> square metres</p>
                <Details summary='How did we calculate this?' color='white' className="impact-details" description={descriptionDetail['open space']}/>
                </div>

                <div>
                <div className="wrap-impact-item">
                <h2 className="govuk-heading-m grid-column-1">New jobs</h2>
                <Image src="/assets/images/icon-office.png" width={64} height={64} alt="icon office"/>
                </div>
                <p className="govuk-body large-margin-top" ><span className="govuk-!-font-weight-bold">655-3,610</span> new roles</p>
                <Details summary='How did we calculate this?' color='white' className="impact-details" description={descriptionDetail['new jobs']}/>
                </div>

                <div>
                <div className="wrap-impact-item">
                <h2 className="govuk-heading-m grid-column-1">Carbon emissions</h2>
                <Image src="/assets/images/icon-co2.png" width={64} height={64} alt="icon carbon"/>
                </div>
                <p className="govuk-body large-margin-top"><span className="govuk-!-font-weight-bold">0.1%</span> more CO2 emissions</p>
                <Details summary='How did we calculate this?' color='white' className="impact-details" description={descriptionDetail['carbon']}/>
                </div>

                <div style={{width: "20rem"}}>
                <div className="wrap-impact-item">
                <h2 className="govuk-heading-m grid-column-1">Pedestrian and vehicle access</h2>
                <Image src="/assets/images/icon-crossing.png" width={64} height={48} alt="icon pedestrian crossing" />
                </div>
                <p className="govuk-body grid-column-1" style={{gridColumnEnd: 3}}>A new, landscaped public route (for pedestrian and cycle access) between Kentish Town and Hampstead Heath (“the Heath Line”) is proposed alongside wider landscaping and public realm improvements and access routes into and across the site.</p>
                </div>

            </div>
            </div>
 </section>
    )
}

export default Impact;