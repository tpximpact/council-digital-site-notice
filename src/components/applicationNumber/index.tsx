"use client";
import React, { useState, useEffect } from "react";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { TextInput } from "@sanity/ui";

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

  return (
    <>
      <TextInput
        value={inputValue}
        onChange={(e: any) => setInputValue(e.target.value)}
        readOnly={integrationMethod === "uniformAPI" ? true : false}
      />
    </>
  );
};

export default ApplicationNumber;
