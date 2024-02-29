import { getGlobalContent } from "../../util/client";

export async function getStaticProps() {
  const data = await getGlobalContent();
  return {
    props: {
      data: data,
    },
  };
}

const CookiePolicyPage = ({ data }: any) => {
  return <p className="govuk-body">{data?.cookiePolicyContent}</p>;
};

export default CookiePolicyPage;
