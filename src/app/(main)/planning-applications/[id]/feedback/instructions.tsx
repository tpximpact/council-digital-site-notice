/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { urlFor } from "@/app/actions/sanityClient";
import { getLocalStorage } from "../../../../lib/application";
import { Data } from "../../../../lib/type";
import { getGlobalContent } from "@/app/actions/sanityClient";

function Instructions() {
  const [application, setApplication] = useState<Data>();
  const [councilName, setCouncilName] = useState();
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    (async () => {
      const globalConfig: any = await getGlobalContent();
      const getStorage = getLocalStorage({
        key: "application",
        defaultValue: {},
      });
      const imageSrc = await urlFor(application?.image_head).url();
      setApplication(getStorage);
      setImageSrc(getStorage);
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
            alt="Development image"
            src={imageSrc}
          />
        )}
        <div>
          <h3 className="govuk-heading-s">{application?.address}</h3>
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
