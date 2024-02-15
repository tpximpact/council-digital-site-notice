import Link from "next/link";

const CookiesBanner = ({onClick}: any) => {

    return(
<div className="govuk-cookie-banner" data-nosnippet role="region" aria-label="Cookies">
  <div className="govuk-cookie-banner__message govuk-width-container">
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h2 className="govuk-cookie-banner__heading govuk-heading-m">Essential Cookies</h2>
        <div className="govuk-cookie-banner__content">
          <p className="govuk-body">We use some essential cookies to make this service work.</p>
          <p className="govuk-body">We use only essential cookies to keep your information secure while you use this site. We do not need to ask permission to use them.</p>
          </div>
      </div>
    </div>
    <div className="govuk-button-group">
      <button type="button" className="govuk-button" data-module="govuk-button" onClick={() => onClick()}>
        Close 
      </button>
      <Link className="govuk-link" href="/cookie-policy" target="_blank">View cookies</Link>
    </div>
  </div>
</div>
    )
}

export default CookiesBanner

