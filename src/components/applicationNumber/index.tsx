"use client";
import React, { useState, useEffect } from "react";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { TextInput } from "@sanity/ui";
import { PatchEvent, set, unset } from "sanity";
import { useFormValue, useDocumentOperation } from "sanity";

const ApplicationNumber = (props: any) => {
  const [integrationMethod, setIntegrationMethod] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const { value, readOnly } = props;

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
    setInputValue(value);
    fetchGlobalContent();
  }, [value]);

  const formId = useFormValue(["_id"]);
  const docId =
    typeof formId === "string" ? formId.replace("drafts.", "") : formId;
  const { patch } = useDocumentOperation(
    docId as string,
    "planning-application",
  );

  const onChangeValue = (e: any) => {
    patch.execute([{ set: { applicationNumber: e } }]);
    setInputValue(e);
  };
  return (
    <TextInput
      value={inputValue}
      onChange={(e: any) => onChangeValue(e.target.value)}
      readOnly={integrationMethod === "uniformAPI" ? true : false}
    />
  );
};

export default ApplicationNumber;
