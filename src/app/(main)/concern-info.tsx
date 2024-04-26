import { getGlobalContent } from "../actions/actions";

async function ConcernInfo() {
  const globalConfig: any = getGlobalContent();
  return <p className="govuk-body">{globalConfig?.concernContent}</p>;
}

export default ConcernInfo;
