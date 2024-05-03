// import { getGlobalContent } from "@/app/actions/actions";
import { getGlobalContent } from "../../../app/actions/sanityClient";

const CookiePolicyPage = async () => {
  const globalConfig: any = await getGlobalContent();
  return <p className="govuk-body">{globalConfig?.cookiePolicyContent}</p>;
};

export default CookiePolicyPage;
