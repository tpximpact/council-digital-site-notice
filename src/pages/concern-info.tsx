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
        <>
        {data?.concernContent}
        </>
    )
}

export default ConcernInfo