"use client";
import { useEffect, useState } from "react";
import About from "@/components/about";
import Impact from "@/components/impact";
import Process from "@/components/process";
import { getApplicationById } from "../../../actions/sanityClient";
import { useParams } from "next/navigation";
import { PlanningApplication } from "../../../../../sanity/sanity.types";
import { notFound } from "next/navigation";

import PageWrapper from "@/components/pageWrapper";
import Breadcrumbs from "@/components/breadcrumbs";

export const dynamic = "force-dynamic";

const PlanningApplicationItem = () => {
  const [data, setData] = useState<PlanningApplication | null>();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      const result = await getApplicationById(id as string);
      // console.log({ result }, "id");
      const getData = result;
      result.length == 0 ? setData(null) : setData(getData);

      localStorage.setItem(
        "application",
        JSON.stringify({
          address: getData?.address,
          image_head: getData?.image_head,
          image_gallery: getData?.image_gallery,
          deadline: getData?.consultationDeadline,
          name: getData?.name,
          _id: getData?._id,
          applicationNumber: getData?.applicationNumber,
          applicationStage: getData?.applicationStage,
          applicationUpdatesUrl: getData?.applicationUpdatesUrl,
        }),
      );
    }
    fetchData();
  }, [id]);

  if (data === null) return notFound();

  return (
    <>
      {data && (
        <>
          <div className="govuk-width-container">
            <Breadcrumbs
              breadcrumbs={[
                { name: "Planning applications", href: "/" },
                { name: data?.name || data?.address, href: "" },
              ]}
            />
          </div>
          <PageWrapper isCentered={false}>
            <About data={data} />
            <Impact data={data} />
            <hr className="govuk-section-break govuk-section-break--l" />
            <Process data={data} />
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default PlanningApplicationItem;
