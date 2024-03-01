import Image from "next/image";
import Details from "@/components/details";
import { descriptionDetail } from "../../../util/description-detail"
import { DataDetails } from "../../../util/type";

function Impact({
    data
}: {data: DataDetails}) {
    
    return(
        <section className="impact-wrap">
            <div>
            <h1 className="govuk-heading-l">How could this affect you?</h1>
            <p className="govuk-body">Any new development in your local area will have an effect on your community.</p>
            <p className="govuk-body">We’ve outlined some of the ways we think this development would impact your community, so that you can give us feedback on what’s important for us to consider when we’re deciding what to give planning permission for.</p>
            <div className="impact-info">
                    {data?.showHousing && (
                    <div className="impact-item-container">
                    <div className="wrap-impact-item">
                    <h2 className="govuk-heading-m">New homes</h2>
                    <Image src="/assets/images/icon-homes.png" width={64} height={64} alt="icon homes"/>
                    </div>
                
                        <>
                       {data?.housing?.residentialUnits && <p className="govuk-body"><span className="govuk-!-font-weight-bold">{data?.housing?.residentialUnits}</span> new homes</p>} 
                       {data?.housing?.affordableResidentialUnits && <p className="govuk-body" style={{ marginTop: "-10px"}}><span className="govuk-!-font-weight-bold">{data?.housing?.affordableResidentialUnits}%</span> affordable housing</p>}
                        </>
                    
                
                    <Details summary='How did we calculate this?' color='white' description={descriptionDetail['home']}/>
                        </div>
                    )}



    
                    {/* {
                        this section will be uncomment when we start to have the health data
                    data?.showHealthcare && (
                        <div className="impact-item-container">
                                <div className="wrap-impact-item">
                                <h2 className="govuk-heading-m">Healthcare</h2> 
                                <Image src="/assets/images/icon-healthcare.png" width={64} height={64} alt="icon healthcare"/>
                                </div>
                                <p className="govuk-body"><span className="govuk-!-font-weight-bold">{data?.healthcareDemand}</span> additional demand on GPs and hospitals</p>
                                <Details summary='How did we calculate this?' color='white' description={descriptionDetail['healthcare']}/>
                            </div>
                        )
                    } */}

                    {
                        data?.showOpenSpace && (
                            <div className="impact-item-container">
                                <div className="wrap-impact-item">
                                <h2 className="govuk-heading-m">Open spaces</h2>
                                <Image src="/assets/images/icon-open-spaces.png" width={64} height={64} alt="icon open spaces"/>
                                </div>
                                <p className="govuk-body large-margin-top" ><span className="govuk-!-font-weight-bold">{data?.openSpaceArea}</span> square metres</p>
                                <Details summary='How did we calculate this?' color='white' description={descriptionDetail['open space']}/>
                            </div>
                        )
                    }


                    {
                        data?.showJobs && (
                            <div className="impact-item-container">
                                <div className="wrap-impact-item">
                                <h2 className="govuk-heading-m">New jobs</h2>
                                <Image src="/assets/images/icon-office.png" width={64} height={64} alt="icon office"/>
                                </div>
                                <p className="govuk-body large-margin-top" ><span className="govuk-!-font-weight-bold">{data?.jobs?.min && data?.jobs?.max ? data?.jobs?.min +'-'+ data?.jobs?.max : (data?.jobs?.min || data?.jobs?.max)}</span> new roles</p>
                                <Details summary='How did we calculate this?' color='white' description={descriptionDetail['new jobs']}/>
                            </div>
                        )
                    }
                

                    {
                        data?.showCarbon && (
                            <div className="impact-item-container">
                                <div className="wrap-impact-item">
                                <h2 className="govuk-heading-m">Carbon emissions</h2>
                                <Image src="/assets/images/icon-co2.png" width={64} height={64} alt="icon carbon"/>
                                </div>
                                <p className="govuk-body large-margin-top"><span className="govuk-!-font-weight-bold">{data?.carbonEmissions}%</span> less than minimum requirements</p>
                                <Details summary='How did we calculate this?' color='white' description={descriptionDetail['carbon']}/>
                            </div>
                        )
                    }


                    {
                        data?.showAccess && (
                            <div className="impact-item-container">
                                <div className="wrap-impact-item">
                                                <h2 className="govuk-heading-m">Pedestrian and vehicle access</h2>
                                                <Image src="/assets/images/icon-crossing.png" width={64} height={48} alt="icon pedestrian crossing" />
                                                </div>
                                                <p className="govuk-body" style={{gridColumnEnd: 3}}>{data?.access}</p>
                                                
                            </div>
                        )
                    }

            </div>
            </div>
 </section>
    )
}

export default Impact;