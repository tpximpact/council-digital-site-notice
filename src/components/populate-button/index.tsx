"use client";
import React, { useState, useEffect } from "react";
import { useFormValue, useDocumentOperation } from "sanity";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { getOpenApiUrl } from "@/app/actions/actions";

export default function PopulateButton() {
  const [integrationMethod, setIntegrationMethod] = useState("");
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    const fetchGlobalContent = async () => {
      try {
        const globalContent = await getGlobalContent();
        setIntegrationMethod(globalContent.integrations);
      } catch (error) {
        console.error("Error fetching global content", error);
        setIntegrationMethod("manual");
      }
    };

    fetchGlobalContent();

    const fetchApiUrl = async () => {
      const url = await getOpenApiUrl();
      setApiUrl(url);
    };

    fetchApiUrl();
  }, []);

  const formId = useFormValue(["_id"]);
  const docId =
    typeof formId === "string" ? formId.replace("drafts.", "") : formId;
  const { patch, publish } = useDocumentOperation(
    docId as string,
    "planning-application",
  );

  const getApplicationNumber: any = useFormValue(["applicationNumber"]);
  const applicationNumber: any = getApplicationNumber?.toUpperCase();

  const handlePopulate = async () => {
    setFetchStatus("idle");
    try {
      if (!apiUrl) {
        console.error("API URL is not available");
        setFetchStatus("error");
        return;
      }

      const response = await fetch(
        `${apiUrl}.json?$where=application_number='${applicationNumber}'`,
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
  const buttonText =
    integrationMethod !== "manual"
      ? `Fetch from ${
          integrationMethod.charAt(0).toUpperCase() + integrationMethod.slice(1)
        }`
      : "";

  return (
    <div>
      {integrationMethod === "manual" ? (
        <p>No integration detected. Manual data entry is required.</p>
      ) : integrationMethod === "uniformAPI" ? (
        ""
      ) : (
        <button type="button" onClick={handlePopulate}>
          {buttonText}
        </button>
      )}
      {fetchStatus === "error" && (
        <div style={{ color: "red" }}>
          Could not fetch the data. Please check the application number.
        </div>
      )}
      {fetchStatus === "success" && (
        <div style={{ color: "green" }}>Data fetched successfully!</div>
      )}
    </div>
  );
}
