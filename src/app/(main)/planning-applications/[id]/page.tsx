import About from "@/components/about";
import Impact from "@/components/impact";
import Process from "@/components/process";
import { getApplicationById } from "../../../actions/sanityClient";
import { notFound } from "next/navigation";
import { PlanningApplication } from "../../../../../sanity/sanity.types";

import PageWrapper from "@/components/pageWrapper";
import Breadcrumbs from "@/components/breadcrumbs";

export interface HomeProps {
  params: {
    id: string;
  };
}

async function fetchData({ params }: HomeProps): Promise<PlanningApplication> {
  const { id } = params;
  const result = await getApplicationById(id);
  return result;
}

const PlanningApplicationItem = async ({ params }: HomeProps) => {
  const application = await fetchData({ params });

  if (!application) return notFound();

  return (
    <>
      <div className="govuk-width-container">
        <Breadcrumbs
          breadcrumbs={[
            { name: "Planning applications", href: "/" },
            { name: application?.name || application?.address, href: "" },
          ]}
        />
      </div>
      <PageWrapper isCentered={false}>
        <About data={application} applicationId={params.id} />
        <Impact data={application} />
        <hr className="govuk-section-break govuk-section-break--l" />
        <Process data={application} />
      </PageWrapper>
    </>
  );
};

export default PlanningApplicationItem;
