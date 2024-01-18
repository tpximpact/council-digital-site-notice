import { getConcernInfo } from "../../util/client";

export async function getStaticProps() {
    const data = await getConcernInfo()
    return {
      props: {
        data: data
      },
    };
  }

const ConcernInfo = (data: any) => {

    return(
        <>
        {data[0]?.concernContent}
        </>
    )
}

export default ConcernInfo