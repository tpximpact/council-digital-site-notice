import { getGlobalContent} from "../../util/client";

export async function getStaticProps() {
    const data = await getGlobalContent()
    return {
      props: {
        data: data
      },
    };
  }

const ConcernInfo = ({data}: any) => {
    return(
        <p className="govuk-body">
        {data?.concernContent}
        </p>
    )
}

export default ConcernInfo