// In your custom input component file (e.g., PopulateButton.js)
import React, { useState, useEffect } from 'react';
import { useFormValue, useDocumentOperation, set } from 'sanity';
// import PatchEvent, {set} from 'sanity';
import { getGlobalContent } from '../../util/client';


export default function PopulateButton(props) {
const [intergrationMethod, setIntergrationMethod] = useState(false);

  useEffect(() => {
    const fetchGlobalContent = async () => {
      try {
        // setLoading(true);
        const globalContent = await getGlobalContent();
        // Do something with globalContent if needed
        // console.log(globalContent);
        setIntergrationMethod(globalContent.integrations);
      } catch (error) {
        console.error("Error fetching global content", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchGlobalContent();
  }, []);
  const formId = useFormValue(['_id']);
  const docId = typeof formId === "string"
  ? formId.replace("drafts.", "")
  : formId;
  const { patch, publish } = useDocumentOperation(docId as string, 'planning-application');

  const applicationNumber = useFormValue(['applicationNumber']);
  const handlePopulate = async () => {
    try {
      console.log(props.id, props.type)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}.json?$where=application_number='${applicationNumber}'`);
      const data = await response.json();
      console.log("CALLED", data);
      // populate a form fields called application_type
      patch.execute([{set: {applicationType: data[0].application_type}},{set: {address: data[0].development_address}}])
    } catch (error) {
      console.error("ERROR", error);
    }
    
  };
  console.log(intergrationMethod)
  if (typeof intergrationMethod === 'string' && intergrationMethod == "openAsdcPI") {
    return (
      <div>
      <button type="button" onClick={handlePopulate}>
        Fetch now
      </button>
      </div>
    );
  } else {
    return null;
  }
}