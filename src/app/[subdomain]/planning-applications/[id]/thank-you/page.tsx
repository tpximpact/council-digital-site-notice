/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Data } from "../../../../../../util/helpers/type";
import { urlFor } from "../../../../../../util/actions/client";
import { getLocalStorage } from "../../../../../../util/helpers/application";
import Breadcrumbs from "@/components/breadcrumbs";
import { globalContentRevalidate } from "../../../../../../util/actions/actions";

const FeedbackMessage = () => {
  const [globalConfig, setGlobalConfig] = useState<any>();
  const [application, setAplication] = useState<Data>();
  const [formId, setFormId] = useState<string | null>();

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig: any = await globalContentRevalidate();
      setGlobalConfig(fetchGlobalConfig);
      const initialValue = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      setAplication(initialValue);

      const formId = localStorage.getItem("formId");
      setFormId(formId);
    })();
  }, []);

  const breadcrumbs_array = [
    {
      name: "Planning application",
      href: "/",
    },
    {
      name: application?.name || application?.address,
      href: `/planning-applications/${application?._id}`,
    },
    {
      name: "Thank you",
      href: "",
    },
  ];
  return (
    <section>
      <Breadcrumbs breadcrumbs_info={breadcrumbs_array} />
      <div className="wrap-message-reference">
        <h1 className="govuk-heading-l"> Comment submitted</h1>
        <h2 className="govuk-body-l"> Your reference number</h2>
        <p className="govuk-body-l">{formId}</p>
      </div>
      <div style={{ display: "flex", marginTop: "25px" }}>
        {application?.image_head && (
          <Image
            src={urlFor(application?.image_head)?.url()}
            alt="development-image"
            width={80}
            height={56}
          />
        )}

        <div style={{ marginLeft: "15px" }}>
          <Link
            className="govuk-body govuk-!-font-weight-bold govuk-link govuk-link--no-visited-state"
            href={`/${application?._id}`}
            style={{ marginBottom: "5px", textDecoration: "none" }}
          >
            {application?.address}
          </Link>
          <p
            className="govuk-body govuk-!-font-weight-bold"
            style={{ marginBottom: 0 }}
          >
            Application reference{" "}
          </p>
          <p className="govuk-body">{application?.applicationNumber}</p>
        </div>
      </div>
      {application?.applicationUpdatesUrl && (
        <Link
          href={application?.applicationUpdatesUrl}
          className="govuk-button govuk-!-font-size-16"
          target="_blank"
        >
          Sign up for updates about this application
        </Link>
      )}
      <h1 className="govuk-heading-m">
        Discover other planning applications in your area
      </h1>
      <p className="govuk-body">
        If you’re interested in learning more about planning applications in
        your area, you can view all currently active applications and provide
        comments on them.
      </p>
      <Link
        href="/"
        className="govuk-button govuk-button--secondary govuk-!-font-size-16"
      >
        View local planning applications
      </Link>
      {globalConfig?.howToGetInvolveUrl && (
        <>
          <h1 className="govuk-heading-m">
            Get involved in {globalConfig?.councilName}’s Local Plan
          </h1>
          <p className="govuk-body">
            You can have a big impact on developments in your local community by
            getting involved in {globalConfig?.councilName}'s planning policy.{" "}
          </p>
          <Link
            href={globalConfig?.howToGetInvolveUrl}
            className="govuk-button govuk-button--secondary govuk-!-font-size-16"
          >
            Find out how you can get involved
          </Link>
        </>
      )}
    </section>
  );
};

export default FeedbackMessage;
