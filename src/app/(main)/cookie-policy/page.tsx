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
      <div className="dsn-content">{globalConfig?.cookiePolicyContent}</div>
    </PageWrapper>
  );
};

export default CookiePolicyPage;
