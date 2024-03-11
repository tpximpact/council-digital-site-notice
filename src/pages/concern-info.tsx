import { useContext } from "react";
import { ContextApplication } from "@/context";

const ConcernInfo = () => {
  const { globalConfig } = useContext(ContextApplication);
  return <p className="govuk-body">{globalConfig?.concernContent}</p>;
};

export default ConcernInfo;
