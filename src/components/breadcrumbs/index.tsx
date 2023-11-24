import Link from "next/link"

type BreadcrumbsInfo = {
    name: string,
    href?: string
}

const Breadcrumbs = ({breadcrumbs_info}:{breadcrumbs_info: BreadcrumbsInfo[]}) => {
 
    return(
        <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
            {breadcrumbs_info?.map(((el, index) => 
                index === (breadcrumbs_info.length -1) ? <li className="govuk-breadcrumbs__list-item" key={index}>
                {el.name}
                </li> : <li className="govuk-breadcrumbs__list-item" key={index}>
            <Link className="govuk-breadcrumbs__link" href={el.href} key={index}>{el.name}</Link>
            </li>
            ))}
        </ol>
        </div>
    )
}

export default Breadcrumbs