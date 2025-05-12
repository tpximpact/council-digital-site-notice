/* eslint-disable react/no-unescaped-entities */
import { getGlobalContent } from "@/app/actions/sanityClient";
import PageWrapper from "@/components/pageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

const CookiePolicyPage = async () => {
  const globalConfig: any = await getGlobalContent();
  const enableComments = globalConfig?.globalEnableComments;
  return (
    <PageWrapper isCentered={true}>
      <CookiePolicyContent />
      {enableComments && <CommentCookiePolicyContent />}
      <AnalyticsPolicyConsent />
    </PageWrapper>
  );
};

const CookiePolicyContent = () => {
  return (
    <>
      <h1 className="govuk-heading-l">Cookies</h1>
      <h2 className="govuk-heading-m">What cookies are</h2>
      <p className="govuk-body">
        Cookies are small files saved on your phone, tablet or computer when you
        visit a website.
      </p>
      <p className="govuk-body">
        We use an essential cookie to keep your data secure while you use the
        Digital Site Notice.
      </p>
      <h2 className="govuk-heading-m">Essential cookies</h2>
      <p className="govuk-body">
        Essential cookies keep your information secure while you use this
        service. We do not need to ask permission to use essential cookies.
      </p>
      <p className="govuk-body">We use the following essential cookies:</p>
      <table className="govuk-table govuk-table--small-text-until-tablet">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Name
            </th>
            <th scope="col" className="govuk-table__header">
              Purpose
            </th>
            <th scope="col" className="govuk-table__header">
              Expires
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              isConsentCookie
            </th>
            <td className="govuk-table__cell">
              Stores your cookie preferences
            </td>
            <td className="govuk-table__cell">1 year</td>
          </tr>
        </tbody>
      </table>

      <h3 className="govuk-heading-m">Analytics cookies</h3>
      <p className="govuk-body">
        With your permission, we use Google Analytics to collect data about how
        you use this service. This information helps us to improve our service.
      </p>
      <p className="govuk-body">
        Google is not allowed to use or share our analytics data with anyone.
      </p>
      <p className="govuk-body">
        Google Analytics store anonymised information about:
      </p>
      <table className="govuk-table govuk-table--small-text-until-tablet">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Name
            </th>
            <th scope="col" className="govuk-table__header">
              Purpose
            </th>
            <th scope="col" className="govuk-table__header">
              Expires
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              _ga
            </th>
            <td className="govuk-table__cell">Used to identify unique users</td>
            <td className="govuk-table__cell">2 years</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const CommentCookiePolicyContent = () => {
  return (
    <>
      <h2 className="govuk-heading-m">Essential session storage</h2>
      <p className="govuk-body">
        This service uses session storage to temporarily store small amounts of
        data on your device. This helps the service work properly and improves
        your experience as you move through the Digital Site Notice process.
      </p>
      <p className="govuk-body">Session storage:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>stores data only for the duration of your browser session</li>
        <li>is deleted when you close your browser</li>
        <li>is not accessible by other websites</li>
        <li>does not automatically send data to our servers</li>
      </ul>
      <p className="govuk-body">We use the following session storage items:</p>
      <table className="govuk-table govuk-table--small-text-until-tablet">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Name
            </th>
            <th scope="col" className="govuk-table__header">
              Purpose
            </th>
            <th scope="col" className="govuk-table__header">
              Expires
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              application
            </th>
            <td className="govuk-table__cell">
              Stores the current planning application data.
            </td>
            <td className="govuk-table__cell">
              When you submit a comment or close your browser.
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              feeling
            </th>
            <td className="govuk-table__cell">
              Stores what sentiment you selected about a planning application,
              whether you are opposed, neutral or support it.
            </td>
            <td className="govuk-table__cell">
              When you submit a comment or close your browser.
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              topics
            </th>
            <td className="govuk-table__cell">
              Stores which topics you selected to comment on, such as
              &rsquo;Impacts on natural light&rsquo;, &rsquo;Noise from new
              uses&rsquo;, etc
            </td>
            <td className="govuk-table__cell">
              When you submit a comment or close your browser.
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              comment
            </th>
            <td className="govuk-table__cell">
              Stores the text you write about each topic in your comment.
            </td>
            <td className="govuk-table__cell">
              When you submit a comment or close your browser.
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              personalDetails
            </th>
            <td className="govuk-table__cell">
              Stores the identifying information entered into the final step,
              such as name, address and email.
            </td>
            <td className="govuk-table__cell">
              When you submit a comment or close your browser.
            </td>
          </tr>

          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              formId
            </th>
            <td className="govuk-table__cell">
              A unique identifier generated at the time of submission to track
              the form submission.
            </td>
            <td className="govuk-table__cell">
              When you submit a comment or close your browser.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="govuk-body">
        Note: Some session storage items may include additional identifying
        information, such as the planning application reference number, to
        manage multiple submissions.
      </p>
    </>
  );
};

const AnalyticsPolicyConsent = () => {
  return (
    <>
      <h2 className="govuk-heading-l">Analytics without cookies</h2>
      <h3 className="govuk-heading-m">Digital Site Notice and Analytics</h3>
      <p className="govuk-body">
        We use a cookieless analytics tool to collect information about how
        users interact with our website and services. This information is used
        to improve our services and provide a better user experience.
      </p>
      <h3 className="govuk-heading-m"> What data is collected?</h3>
      <p className="govuk-body">
        The analytics tool collects data around user engagement including:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li className="govuk-body">Clicks on links and buttons</li>
        <li className="govuk-body">
          Scrolls and interactions with our website and services
        </li>
        <li className="govuk-body">
          Device information, such as browser type and operating system
        </li>
      </ul>
      <h3 className="govuk-heading-m"> What data is not collected?</h3>
      <p className="govuk-body">
        We do not collect any personal data through our analytics tool,
        including:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li className="govuk-body">
          Names, email addresses, or other contact information
        </li>
        <li className="govuk-body">
          IP addresses or other identifying information inc Google cookie IDs
        </li>
        <li className="govuk-body">
          Sensitive information, such as financial or health data
        </li>
      </ul>
      <h3 className="govuk-heading-m">How is the data used?</h3>
      <p className="govuk-body">
        The data collected through our analytics tool is used to:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li className="govuk-body">
          Improve the user experience and functionality of our website and
          services
        </li>
        <li className="govuk-body">
          Optimize our content and marketing efforts
        </li>
        <li className="govuk-body">
          Analyse usage patterns and identify areas for improvement
        </li>
      </ul>
      <h3 className="govuk-heading-m">How is the data stored and secured?</h3>
      <p className="govuk-body">
        The data collected through our analytics tool is stored securely and in
        accordance with industry standards. We take appropriate measures to
        ensure that the data is protected from unauthorized access, disclosure,
        or use. We rely on terms and conditions of the analytics from Google.
      </p>
      <p className="govuk-body">
        Cookieless information cannot be associated with any use, it is
        unidentifiable, and therefore deletion or extraction cannot apply
      </p>
    </>
  );
};
export default CookiePolicyPage;
