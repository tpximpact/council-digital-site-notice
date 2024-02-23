// In your custom input component file (e.g., PopulateButton.js)
import React from 'react';
import { useFormValue, useDocumentOperation } from 'sanity';
// import PatchEvent, {set} from 'sanity';

export default function PopulateButton(props) {
  console.log(useFormValue(['applicationNumber']));
  const formId = useFormValue(['_id']);
  console.log(formId);

  const docId = typeof formId === "string"
  ? formId.replace("drafts.", "")
  : formId;
  console.log(docId);
  console.log("PROPS",props)
  const { patch, publish } = useDocumentOperation(docId as string, 'planning-application');

  const applicationNumber = useFormValue(['applicationNumber']);
  // const form = useForm();
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
  return (
    <button type="button" onClick={handlePopulate}>
      Fetch now
    </button>
  );
}