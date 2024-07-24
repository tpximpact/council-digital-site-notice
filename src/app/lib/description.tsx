/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ReactElement } from "react";
export const descriptionDetail: { [key: string]: ReactElement } = {
  about: (
    <>
      <h4
        className="govuk-heading-s"
        style={{ fontWeight: 700, marginBottom: 0 }}
      >
        Full planning application
      </h4>
      <p className="govuk-body">
        An application to alter, change the use of or construct a building. A
        full planning application provides all the details of the proposed
        development in one go.
      </p>

      <h4 className="govuk-heading-s" style={{ fontWeight: 700 }}>
        Outline planning application
      </h4>
      <p className="govuk-body">
        An application seeking approval for the principle of the development —
        including size, layout, uses and key features. The rest of the details
        are provided later with a reserved matters applications.
      </p>

      <h4 className="govuk-heading-s" style={{ fontWeight: 700 }}>
        Reserved matters application
      </h4>
      <p className="govuk-body">
        Provides the additional details that aren't provided in an outline
        planning application. This could include layout, materials and landscape
        details.
      </p>

      <h4 className="govuk-heading-s" style={{ fontWeight: 700 }}>
        Application for removal/variation of conditions
      </h4>
      <p className="govuk-body">
        Planning applications are often approved with 'conditions', which have
        to be delivered before, during or after construction. Applicants have to
        apply to change these conditions.
      </p>
    </>
  ),
  topics: (
    <>
      <p className="govuk-body-s">
        As part of the negotiation, the case officer can take into consideration
        all comments which are ‘material considerations’ to the proposed
        development. These include (but aren't limited to):
      </p>
      <ul className="govuk-body-s">
        <li>overlooking/loss of privacy</li>
        <li>loss of light or overshadowing</li>
        <li>traffic parking</li>
        <li>highway safety</li>
        <li>noise from new uses or plant equipment</li>
        <li>effect on listed building and conservation area</li>
        <li>scale of buildings and structures</li>
        <li>layout and density of building</li>
        <li>design, appearance and materials</li>
        <li>disabled persons' access</li>
        <li>previous planning decisions (including appeal decisions)</li>
        <li>trees and nature conservation</li>
      </ul>
      <p className="govuk-body-s">
        Issues such as loss of private view or negative impact on property
        values, or civil matters like ‘right to light’, party walls and property
        damage are not considered ‘material planning considerations’.
      </p>
      <p className="govuk-body-s">
        The case officer will summarise their findings in the officer's report
        and/or decision notice.
      </p>
      <p className="govuk-body-s">
        We won't acknowledge receipt of your comments, or get in touch with you
        directly about the issues you've raised. You can check the officer's
        report or decision notice to see if your, and other, comments have been
        logged.
      </p>
    </>
  ),
  home: (
    <>
      <p className="govuk-body">
        The number of self contained homes that are being proposed. This
        includes affordable, social and private housing. Larger schemes might
        have a range showing the minimum and maximum number of homes if the
        total number is going to be decided later.
      </p>
      <p className="govuk-body">
        Affordable housing is a term used to cover different types of housing
        that are less costly than housing on the private market. This might be
        social rented housing, affordable rented housing or housing which the
        government helps people to buy a proportion of. It can be shown as a
        proportion of the total number of homes, or as a proportion of the total
        residential floorspace.
      </p>
    </>
  ),
  healthcare: (
    <>
      <p className="govuk-body">An explanation would go here</p>
    </>
  ),
  "open space": (
    <>
      <p className="govuk-body">
        Open space includes land and areas of water (such as rivers and canals)
        which can be used for sport, recreation and relaxation. Applicants
        calculate the amount of open space, but it’s checked by council planners
        when assessing the application.
      </p>
    </>
  ),
  "new jobs": (
    <>
      <p className="govuk-body" style={{ maxWidth: "25rem" }}>
        The council estimates how many new jobs a new development will produce
        based on the size and type of development. This estimate is based on the
        Employment Density Guide (3rd addition) produced by Homes & Community
        Agency (2015). A summary of this guide is published as part of the
        Camden Planning Guidance for Employment sites and business premises
        (Appendix 1).
      </p>
    </>
  ),
  carbon: (
    <>
      <p className="govuk-body">
        Building regulations set the amount of carbon emissions a development
        can generate once it is in use. This shows how far below the legal
        requirements the proposal is.
      </p>
    </>
  ),
  feeling: (
    <>
      <p className="govuk-body-s">
        We ask for feedback on developments for a few different reasons.
        Understanding why we want your input can help you write better feedback
        and influence a proposed development in your area.
      </p>

      <p className="govuk-body-s govuk-!-font-weight-bold govuk-!-margin-0">
        To influence the details
      </p>
      <p className="govuk-body-s">
        Residents' knowledge about local needs can help planners decide things
        like provision of public open space, cycling facilities, land use
        priorities, scale, design and or what materials are appropriate for a
        scheme.
      </p>

      <p className="govuk-body-s govuk-!-font-weight-bold govuk-!-margin-0">
        To be our eyes and ears on the ground
      </p>
      <p className="govuk-body-s">
        Residents have in-depth knowledge about their local area and often
        highlight on-the-ground details - like how a public view could be
        affected or that a mature tree was left out of a developer's plans.
      </p>

      <p className="govuk-body-s govuk-!-font-weight-bold govuk-!-margin-0">
        To make sure we balance our priorities
      </p>
      <p className="govuk-body-s">
        A single development is unlikely to fulfil all the priorities for the
        local area. It's useful to be able to demonstrate which priorities are
        important to residents, so they can push developers to be more ambitious
        with their targets. Telling us what your priorities are can help
        planners make that decision.
      </p>
    </>
  ),
  impact: (
    <>
      <p className="govuk-body-s">
        As part of the negotiation, the case officer can take into consideration
        all comments which are ‘material considerations’ to the proposed
        development. These include (but aren't limited to):
      </p>
      <ul className="govuk-body-s">
        <li>overlooking/loss of privacy</li>
        <li>loss of light or overshadowing</li>
        <li>traffic parking</li>
        <li>highway safety</li>
        <li>noise from new uses or plant equipment</li>
        <li>effect on listed building and conservation area</li>
        <li>scale of buildings and structures</li>
        <li>layout and density of building</li>
        <li>design, appearance and materials</li>
        <li>disabled persons' access</li>
        <li>previous planning decisions (including appeal decisions)</li>
        <li>trees and nature conservation</li>
      </ul>
      <p className="govuk-body-s">
        Issues such as loss of private view or negative impact on property
        values, or civil matters like ‘right to light’, party walls and property
        damage are not considered ‘material planning considerations’.
      </p>
      <p className="govuk-body-s">
        The case officer will summarise their findings in the officer's report
        and/or decision notice.
      </p>
      <p className="govuk-body-s">
        We won't acknowledge receipt of your comments, or get in touch with you
        directly about the issues you've raised. You can check the officer's
        report or decision notice to see if your, and other, comments have been
        logged.
      </p>
    </>
  ),
  consent: (
    <>
      <p>
        We need your name and contact information because can only formally
        explore comments coming from people who live close to the proposed
        development. We will also use this to contact you if the planning
        decision regarding this application is appealed.
      </p>

      <p>
        Your comments will be made available online for the public to see. We
        will not include your name, address, telephone number or email address.
      </p>

      <p>
        We'll make sure any other personal or sensitive information is removed
        where needed, in line with the{" "}
        <Link
          href="https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/"
          target="_blank"
          style={{ color: "black" }}
        >
          General Data Protection Regulation
        </Link>{" "}
        (GDPR). If you have concerns about any data you have sent being
        published,{" "}
        <Link
          href="https://www.camden.gov.uk/contact-the-planning-advice-and-information-service"
          target="_blank"
          style={{ color: "black" }}
        >
          contact the Planning Advice and Information Service.
        </Link>
      </p>

      <p>
        Read our{" "}
        <Link
          href="https://www.camden.gov.uk/data-protection-privacy-and-cookies"
          target="_blank"
          style={{ color: "black" }}
        >
          corporate privacy statement
        </Link>{" "}
        and our{" "}
        <Link
          href="https://www.camden.gov.uk/documents/20142/2247044/Privacy+Notice_regenerationandplanning+-+updated+May19.pdf/23506373-1b95-2cc5-55b2-55897cfe4b42"
          target="_blank"
          style={{ color: "black" }}
        >
          planning service privacy statement
        </Link>{" "}
        for more information.
      </p>
    </>
  ),
};
