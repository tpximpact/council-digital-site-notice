import { getCommentInfo } from "../../util/client";

export async function getStaticProps() {
    const data = await getCommentInfo()
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