import Link from "next/link";

export const PageAccessibilityStatement = ({
  host,
  feedbackUrl,
}: {
  host?: string;
  feedbackUrl?: string;
}) => {
  console.log(feedbackUrl);
  return (
    <div className="dpr-accessibility-statement grid-row-extra-bottom-margin">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">Accessibility statement</h1>
          <p className="govuk-body">
            Open Digital Planning (ODP) is committed to making its website
            accessible, in accordance with the Public Sector Bodies (Websites
            and Mobile Applications) (No. 2) Accessibility Regulations 2018.
          </p>

          <p className="govuk-body">
            This accessibility statement applies to the Digital Site Notice
            (DSN) {host ? `at ${host}` : ""}.
          </p>

          <p className="govuk-body">
            This website is run by{" "}
            <Link
              className="govuk-link"
              href="https://opendigitalplanning.org/"
            >
              Open Digital Planning (ODP)
            </Link>{" "}
            funded by the Ministry of Housing, Communities and Local Government
            (MHCLG).
          </p>
          <p className="govuk-body">
            We want as many people as possible to be able to use this website.
            For example, that means you should be able to:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>
              Change colours, contrast levels and fonts using browser or device
              settings
            </li>
            <li>Zoom in up to 400% without the text spilling off the screen</li>
            <li>
              Navigate most of the website using a keyboard or speech
              recognition software
            </li>
            <li>
              Listen to most of the website using a screen reader (including the
              most recent versions of JAWS, NVDA and VoiceOver)
            </li>
          </ul>

          <p className="govuk-body">
            We&apos;ve also made the website text as simple as possible to
            understand.
          </p>

          <p className="govuk-body">
            <Link className="govuk-link" href="https://mcmw.abilitynet.org.uk/">
              AbilityNet
            </Link>{" "}
            has advice on making your device easier to use if you have a
            disability.
          </p>

          <h2 className="govuk-heading-m">Compliance status</h2>
          <h3 className="govuk-heading-s">
            Web Content Accessibility Guidelines (WCAG) version 2.2 AA standard.
          </h3>

          <p className="govuk-body">
            This website is fully compliant with the Web Content Accessibility
            Guidelines (WCAG) version 2.2 AA standard.
          </p>

          <h3 className="govuk-heading-s">
            Web Content Accessibility Guidelines (WCAG) version 2.2 A standard.
          </h3>

          <p className="govuk-body">
            This website is partially compliant with the Web Content
            Accessibility Guidelines version 2.2 A standard, due to the
            non-compliances listed below.
          </p>

          <p className="govuk-body">
            The content listed below is non-accessible for the following
            reasons:
          </p>

          <h4 className="govuk-body">
            <strong>
              (a) Non-compliance with the accessibility regulations
            </strong>
          </h4>

          <p className="govuk-body">Issue found with all pages:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>
              <strong>This issue was fixed on 11th March 2025.</strong> Pages
              did not have unique and descriptive titles to describe their
              purpose to screen reader users.This fails the WCAG 2.2 success
              criterion 2.4.2 (Page Titled). This will be reviewed and updated
              to align with accessible standards.
            </li>
            <li>
              <strong>This issue was fixed on 11th March 2025.</strong>Form
              field information was not properly associated with the fields for
              screen reader users. This fails the WCAG 2.2 success criterion
              1.3.1 (Info and relationships). This will be reviewed and updated
              to align with accessible standards.
            </li>
          </ul>

          <h2 className="govuk-heading-m">Feedback and contact information</h2>

          {feedbackUrl && (
            <p className="govuk-body">
              If you find any problems not listed on this page or think
              we&apos;re not meeting accessibility requirements, please contact
              us using the{" "}
              <Link href={feedbackUrl} className="govuk-link">
                feedback form
              </Link>
            </p>
          )}

          <p className="govuk-body">
            When contacting about accessibility issues, please specify:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>
              The URL (web address) of the content you&apos;re having problems
              with.
            </li>
            <li>
              The local planning authority if relating to specific planning
              content.
            </li>
            <li>Your name and email address.</li>
            <li>The device and software you&apos;re using.</li>
            <li>
              What the problem is and how it affects your use of the service.
            </li>
          </ul>

          <p className="govuk-body">
            Please note that each local planning authority is responsible for:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>The content of their planning applications.</li>
            <li>Processing planning applications.</li>
            <li>Responding to queries about specific applications.</li>
            <li>
              Providing accessible alternatives for their planning documents.
            </li>
          </ul>

          <h2 className="govuk-heading-m">Enforcement procedure</h2>

          <p className="govuk-body">
            The Equality and Human Rights Commission (EHRC) is responsible for
            enforcing the Public Sector Bodies (Websites and Mobile
            Applications) (No. 2) Accessibility Regulations 2018 (the
            &apos;accessibility regulations&apos;).
          </p>

          <p className="govuk-body">
            If you&apos;re not happy with how we respond to your complaint,
            contact the{" "}
            <Link
              className="govuk-link"
              href="https://www.equalityadvisoryservice.com/"
            >
              Equality Advisory and Support Service (EASS)
            </Link>
            .
          </p>

          <h2 className="govuk-heading-m">
            Preparation of this accessibility statement
          </h2>

          <p className="govuk-body">
            This statement was first prepared on 19th February 2025. The
            statement was last reviewed on 25th February 2025.
          </p>

          <p className="govuk-body">
            This website was last tested on 27th February 2025 against the WCAG
            2.2 AA standard.
          </p>

          <p className="govuk-body">
            The test was carried out by Digital Accessibility Centre.
          </p>

          <p className="govuk-body">
            Read the full{" "}
            <Link
              className="govuk-link"
              href={`/assets/accessibility-report-digital-site-notice-27-02-2025.pdf`}
            >
              accessibility report here
            </Link>
            . Please note this document is a PDF and may not be suitable for
            users of assistive technology.
          </p>
        </div>
      </div>
    </div>
  );
};
