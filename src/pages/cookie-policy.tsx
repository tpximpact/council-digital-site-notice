import { useContext } from "react";
import { ContextApplication } from "@/context";

const CookiePolicyPage = () => {
  const { globalConfig } = useContext(ContextApplication);
  return <p className="govuk-body">{globalConfig?.cookiePolicyContent}</p>;
};

export default CookiePolicyPage;
