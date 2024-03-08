import React, { useState, useEffect } from "react";
import { useFormValue, useDocumentOperation, set } from "sanity";
import { getGlobalContent } from "../../../util/client";

export default function PopulateButton() {
  const [integrationMethod, setIntegrationMethod] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("idle");

  useEffect(() => {
    const fetchGlobalContent = async () => {
      try {
        const globalContent = await getGlobalContent();
        setIntegrationMethod(globalContent.integrations);
      } catch (error) {
        console.error("Error fetching global content", error);
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
    setFetchStatus("idle");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}.json?$where=application_number='${applicationNumber}'`,
      );
      const data = await response.json();

      if (data.length === 0) {
        setFetchStatus("error");
        return;
      }
      // Populate form fields
      patch.execute([
        { set: { applicationType: data[0].application_type } },
        { set: { name: data[0].name } },
        { set: { address: data[0].development_address } },
        { set: { description: data[0].development_description } },
        {
          set: {
            location: { lng: +data[0].longitude, lat: +data[0].latitude },
          },
        },
        {
          set: {
            applicationDocumentsUrl: `http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%22${applicationNumber}%22`,
          },
        },
      ]);

      setFetchStatus("success");
    } catch (error) {
      console.error("ERROR", error);
      setFetchStatus("error");
    }
  };

  if (typeof integrationMethod === "string" && integrationMethod == "openAPI") {
    return (
      <div>
        {fetchStatus === "error" && (
          <div style={{ color: "red" }}>
            Could not fetch the data. Please check the application number.
          </div>
        )}
        {fetchStatus === "success" && (
          <div style={{ color: "green" }}>Data fetched successfully!</div>
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
