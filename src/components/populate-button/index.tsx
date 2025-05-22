"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Text } from "@sanity/ui";
import { ApiIcon } from "@sanity/icons";
import { IntegrationMethod } from "@/types";
import { useFormValue, useDocumentOperation } from "sanity";
import { getGlobalContent } from "@/actions/sanityClient";
import { fetchOpenApiData } from "@/actions/integrations";

export function buildPatchData(data: any, formApplicationNumber: string) {
  return [
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
        applicationDocumentsUrl: `http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%22${formApplicationNumber}%22`,
      },
    },
  ];
}

export default function PopulateButton() {
  const [integrationMethod, setIntegrationMethod] =
    useState<IntegrationMethod>("manual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const formApplicationNumber = useFormValue(["applicationNumber"]) as string;

  const formId = useFormValue(["_id"]);
  const docId =
    typeof formId === "string" ? formId.replace("drafts.", "") : formId;
  const { patch } = useDocumentOperation(
    docId as string,
    "planning-application",
  );

  useEffect(() => {
    const fetchGlobalContent = async () => {
      const globalContent = await getGlobalContent();
      setIntegrationMethod(globalContent?.integrations ?? "manual");
    };
    fetchGlobalContent();
  }, []);

  const handlePopulate = async () => {
    setLoading(true);
    setError(undefined);
    setSuccess(false);

    if (!formApplicationNumber) {
      setError("Application number is required.");
      setLoading(false);
      return;
    }

    if (!formId || !docId || !patch) {
      setError("Form ID, Document ID, or Patch function is not available.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchOpenApiData(formApplicationNumber);

      patch.execute(buildPatchData(data, formApplicationNumber));

      setSuccess(true);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Could not fetch the data. ${e.message}`);
      } else {
        setError("Could not fetch the data. An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (integrationMethod === "openAPI") {
    return (
      <>
        <Card margin={[3, 3, 4]}>
          <Button
            fontSize={[1, 1, 2]}
            padding={[2, 2, 3]}
            aria-label={`Fetch from ${integrationMethod}`}
            icon={ApiIcon}
            mode="ghost"
            type="button"
            text={`Fetch from ${integrationMethod}`}
            loading={loading}
            onClick={handlePopulate}
          />
        </Card>

        {error && (
          <Card
            margin={[3, 3, 4]}
            padding={[3, 3, 4]}
            radius={2}
            shadow={1}
            tone="critical"
          >
            <Text align="center" size={[2, 2, 3]}>
              {error}
            </Text>
          </Card>
        )}
        {success && (
          <Card
            margin={[3, 3, 4]}
            padding={[3, 3, 4]}
            radius={2}
            shadow={1}
            tone="positive"
          >
            <Text align="center" size={[2, 2, 3]}>
              Data fetched successfully!
            </Text>
          </Card>
        )}
      </>
    );
  } else {
    return <></>;
  }
}
