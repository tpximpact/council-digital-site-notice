/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ContextApplication } from "@/context";
import { urlFor } from "../../../../../util/client";
import { healpLocalStorage } from "../../../../../util/helpLocalStorage";

function Instructions() {
  const { globalInfo } = useContext(ContextApplication);
  const councilName = globalInfo?.councilName;

  const [image, setImage] = useState<string | undefined>(undefined);
  const [addressData, setAddressData] = useState<string>("");
  const [applicationNumberData, setApplicationNumberData] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const getStorage = healpLocalStorage({
      key: "application",
      defaultValue: {},
    });
    setImage(getStorage?.image_head);
    setAddressData(getStorage?.address);
    setApplicationNumberData(getStorage?.applicationNumber);
  }, []);

  return (
    <section className="wrap-feedback">
      <h1 className="govuk-heading-l">Tell us what you think</h1>
      <div className="wrap-image-legend-feedback">
        {image && (
          <Image
            width={80}
            height={57}
            alt="Development image"
            src={urlFor(image)?.url()}
          />
        )}
        <div>
          <h3 className="govuk-heading-s">{addressData}</h3>
          <p className="govuk-body">{applicationNumberData}</p>
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
