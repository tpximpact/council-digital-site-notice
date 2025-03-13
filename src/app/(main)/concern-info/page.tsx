import PageWrapper from "@/components/pageWrapper";
import { getGlobalContent } from "../../actions/sanityClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concern Info",
};

async function ConcernInfo() {
  const globalConfig: any = await getGlobalContent();
  return (
    <PageWrapper isCentered={true}>
      <p className="govuk-body">{globalConfig?.concernContent}</p>
    </PageWrapper>
  );
}

export default ConcernInfo;
