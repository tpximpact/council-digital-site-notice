import { getGlobalContent } from "@/app/actions/sanityClient";

const CookiePolicyPage = async () => {
  const globalConfig: any = await getGlobalContent();
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l">Cookie Policy</h1>
        <p className="govuk-body">{globalConfig?.cookiePolicyContent}</p>;
      </div>
    </div>
  );
};

export default CookiePolicyPage;
