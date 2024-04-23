/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { Button } from "@/components/button";
import { ArrowIcon } from "../../../public/assets/icons";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/app/lib/application";
import { getGlobalContent } from "@/app/actions/actions";

function FeedbackInformation({
  onChangeQuestion,
}: {
  onChangeQuestion: () => void;
}) {
  const [globalConfig, setGlobalConfig] = useState<any>();
  const [urlConcern, setUrlConcern] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig: any = await getGlobalContent();
      console.log({fetchGlobalConfig}, 'feedback-info')
      setGlobalConfig(fetchGlobalConfig);
      setUrlConcern(
        fetchGlobalConfig?.concernUrl
          ? fetchGlobalConfig?.concernUrl
          : fetchGlobalConfig?.concernContent && "/concern-info",
      );

      const applicationContent = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      localStorage.removeItem("formId");
      setId(applicationContent?._id);
    })();
  }, []);

  return (
    <>
      <section>
        <div className="info-header">
          <h1 className="govuk-heading-xl" style={{ marginBottom: 0 }}>
            What you need to know before you comment
          </h1>
        </div>
        <Link
          href={`/planning-applications/${id}`}
          className={`govuk-back-link`}
          data-module="govuk-button"
        >
          Back
        </Link>
        <h2 className="govuk-heading-l">
          What isn’t considered in planning approval
        </h2>
        <p className="govuk-body">
          There are issues that may be of concern to you, and are very
          important, but which generally cannot be considered as a material
          planning consideration when assessing a planning application. These
          include:
        </p>
        <ul>
          <li className="govuk-body" style={{ marginBottom: 0 }}>
            disputes about civil matters, such as building freeholds or the
            'right to light'
          </li>
          <li className="govuk-body" style={{ marginBottom: 0 }}>
            loss of property value
          </li>
          <li className="govuk-body" style={{ marginBottom: 0 }}>
            issues which are dealt with by other forms of law, such as party
            wall matters{" "}
          </li>
        </ul>
        <p className="govuk-body">
          We cannot refuse permission because of construction noise. However, we
          can restrict the hours of work to reduce disturbance to residents and
          other sensitive neighbours.
        </p>
        {urlConcern !== undefined && (
          <Link
            href={urlConcern}
            target="_blank"
            className="govuk govuk-link govuk-link--no-visited-state"
          >
            What can you do if these things concern you?
          </Link>
        )}
      </section>
      <section style={{ marginTop: "20px" }}>
        <h2 className="govuk-heading-l">Why your comments are important</h2>
        <p className="govuk-body">
          There are three main reasons we ask residents to comment on planning
          applications:
        </p>
        <div>
          <p
            style={{ fontWeight: "bold", marginBottom: 0 }}
            className="govuk-body"
          >
            1. To use your knowledge of the area
          </p>
          <p className="govuk-body">
            You may be able to highlight on-the-ground details we don’t know
            about – for example, that a mature tree was left out of a
            developer's plans.
          </p>
        </div>
        <div>
          <p
            style={{ fontWeight: "bold", marginBottom: 0 }}
            className="govuk-body"
          >
            2. To influence the details
          </p>
          <p className="govuk-body">
            Your understanding of an area’s needs can help planners decide on
            things like amount of open space, cycling facilities, or what
            materials are appropriate for a scheme
          </p>
        </div>
        <div>
          <p
            style={{ fontWeight: "bold", marginBottom: 0 }}
            className="govuk-body"
          >
            3. To make sure we balance our priorities
          </p>
          <p className="govuk-body">
            It's useful know which priorities are most important to residents,
            so we can push developers to be more ambitious with their targets.
            Telling us what your priorities are can help planners make that
            decision.
          </p>
        </div>
      </section>
      <section>
        <h2 className="govuk-heading-l">What happens to your comments</h2>
        <p className="govuk-body">
          The case officer will take all comments which are{" "}
          {globalConfig?.materialConsiderationUrl ? (
            <Link
              href={globalConfig?.materialConsiderationUrl}
              className="govuk govuk-link govuk-link--no-visited-state"
              target="_blank"
            >
              material considerations
            </Link>
          ) : (
            "material considerations"
          )}{" "}
          into account when deciding whether or not to approve the application.
        </p>
        <p className="govuk-body">
          As part of this process, your comments will be posted online for the
          public to see. We will not include your name, address, telephone
          number or email address.
        </p>
        <p className="govuk-body">
          The case officer will summarise their findings in the officer's
          report.
        </p>
      </section>
      <Button
        content="Comment on this application"
        icon={<ArrowIcon />}
        onClick={() => onChangeQuestion()}
        className="feedback-information-button"
        iconClass="feedback-information-icon"
      />
    </>
  );
}

export default FeedbackInformation;
