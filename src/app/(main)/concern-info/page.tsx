import { getGlobalContent } from "../../actions/sanityClient";

async function ConcernInfo() {
  const globalConfig: any = await getGlobalContent();
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-body">{globalConfig?.concernContent}</p>
      </div>
    </div>
  );
}

export default ConcernInfo;
