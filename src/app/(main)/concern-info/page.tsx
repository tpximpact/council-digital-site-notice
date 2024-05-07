import { getGlobalContent } from "../../actions/sanityClient";

async function ConcernInfo() {
  const globalConfig: any = await getGlobalContent();
  return <p className="govuk-body">{globalConfig?.concernContent}</p>;
}

export default ConcernInfo;
