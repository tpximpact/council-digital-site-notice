import "swagger-ui-react/swagger-ui.css";

import { getApiDocs } from "../../lib/swagger";
import ReactSwagger from "./react-swagger";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API documentation",
};

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
