import React, { useState, useEffect } from "react";
import { useFormValue, useDocumentOperation, set } from "sanity";
import { getGlobalContent } from "../../../util/client";

export default function PopulateButton(props) {
  const [integrationMethod, setIntegrationMethod] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchGlobalContent = async () => {
      try {
        const globalContent = await getGlobalContent();
        setIntegrationMethod(globalContent.integrations);
      } catch (error) {
        console.error("Error fetching global content", error);
      } finally {
      }
    };

    fetchGlobalContent();
  }, []);
  const formId = useFormValue(["_id"]);
  const docId =
    typeof formId === "string" ? formId.replace("drafts.", "") : formId;
  const { patch, publish } = useDocumentOperation(
    docId as string,
    "planning-application",
  );

  const applicationNumber = useFormValue(["applicationNumber"]);
  const handlePopulate = async () => {
    setFetchError(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}.json?$where=application_number='${applicationNumber}'`,
      );
      const data = await response.json();

      if (data.length === 0) {
        setFetchError(true);
        return;
      }
      // populate a form fields called application_type
      patch.execute([
        { set: { applicationType: data[0].application_type } },
        { set: { address: data[0].development_address } },
      ]);
    } catch (error) {
      console.error("ERROR", error);
      setFetchError(true);
    }
  };
  if (typeof integrationMethod === "string" && integrationMethod == "openAPI") {
    return (
      <div>
        {fetchError && (
          <div style={{ color: "red" }}>
            Could not fetch the data. Please check the application ID.
          </div>
        )}
        <button type="button" onClick={handlePopulate}>
          Fetch now
        </button>
      </div>
    );
  } else {
    return null;
  }
}
