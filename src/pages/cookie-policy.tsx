import { useContext } from "react";
import { ContextApplication } from "@/context";

const CookiePolicyPage = () => {
  const { globalInfo } = useContext(ContextApplication);
  return <p className="govuk-body">{globalInfo?.cookiePolicyContent}</p>;
};

export default CookiePolicyPage;
