/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../../lib/application";
import { urlFor, getGlobalContent } from "../../../../actions/sanityClient";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import Link from "next/link";

function Instructions() {
  const [application, setApplication] = useState<PlanningApplication>();
  const [councilName, setCouncilName] = useState();

  useEffect(() => {
    (async () => {
      const globalConfig: any = await getGlobalContent();
      const getStorage = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      setApplication(getStorage);
      setCouncilName(globalConfig?.councilName);
    })();
  }, []);

  return (
    <section className="wrap-feedback">
      <h1 className="govuk-heading-l">Tell us what you think</h1>
      <div className="wrap-image-legend-feedback">
        {application?.image_head && (
          <Image
            width={80}
            height={57}
            alt="Development"
            src={urlFor(application?.image_head)?.url()}
          />
        )}
        <div>
          <Link
            className="govuk-heading-s"
            href={`/planning-applications/${application?._id}`}
          >
            {application?.name || application?.address}
          </Link>
          <p className="govuk-body">{application?.applicationNumber}</p>
        </div>
      </div>
      <p className="govuk-body">
        Your feedback helps us improve developments so they meet the needs of
        people in {councilName}. It's important you let us know what you think.
      </p>
    </section>
  );
}

export default Instructions;
