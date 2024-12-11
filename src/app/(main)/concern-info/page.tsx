import PageWrapper from "@/components/pageWrapper";
import { getGlobalContent } from "../../actions/sanityClient";

async function ConcernInfo() {
  const globalConfig: any = await getGlobalContent();
  return (
    <PageWrapper isCentered={true}>
      <p className="govuk-body">{globalConfig?.concernContent}</p>
    </PageWrapper>
  );
}

export default ConcernInfo;
