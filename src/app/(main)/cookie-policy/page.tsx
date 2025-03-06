import { getGlobalContent } from "@/app/actions/sanityClient";
import PageWrapper from "@/components/pageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

const CookiePolicyPage = async () => {
  const globalConfig: any = await getGlobalContent();
  return (
    <PageWrapper isCentered={true}>
      <h1 className="govuk-heading-l">Cookie Policy</h1>
      <p className="govuk-body">{globalConfig?.cookiePolicyContent}</p>
    </PageWrapper>
  );
};

export default CookiePolicyPage;
