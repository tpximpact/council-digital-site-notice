import { useContext } from "react";
import { ContextApplication } from "@/context";

const ConcernInfo = () => {
  const { globalInfo } = useContext(ContextApplication);
  return <p className="govuk-body">{globalInfo?.concernContent}</p>;
};

export default ConcernInfo;
