import { getConcernInfo } from "../../util/client";

export async function getStaticProps() {
    const data = await getConcernInfo()
    return {
      props: {
        content: data[0]?.content
      },
    };
  }

const ConcernInfo = (content: string) => {

    return(
        <>
        {content}
        </>
    )
}

export default ConcernInfo