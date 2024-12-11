import { getGlobalContent } from "@/app/actions/sanityClient";

const CookiePolicyPage = async () => {
  const globalConfig: any = await getGlobalContent();
  return (
    <>
      <h1 className="govuk-heading-l">Cookie Policy</h1>
      <p className="govuk-body">{globalConfig?.cookiePolicyContent}</p>
    </>
  );
};

export default CookiePolicyPage;
