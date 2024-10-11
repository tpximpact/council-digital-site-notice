"use client";
import { useEffect, useState } from "react";
import About from "@/components/about";
import Impact from "@/components/impact";
import Process from "@/components/process";
import { getApplicationById } from "../../../actions/sanityClient";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { PlanningApplication } from "../../../../../sanity/sanity.types";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/button";

export const dynamic = "force-dynamic";

const PlanningApplicationItem = () => {
  const [consultationDeadline, setConsultationDeadline] = useState<string>("");
  const [data, setData] = useState<PlanningApplication | null>();
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      console.log("fetchData");
      // Defer the response if API mocking is enabled to give time for the async mock service worker's promise to resolve
      if (
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
        process.env.NODE_ENV !== "production"
      ) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      const result = await getApplicationById(id as string);
      console.log("result", result);
      console.log({ result }, "id");
      const getData = result[0];
      result.length == 0 ? setData(null) : setData(getData);
      let deadlineTime;

      if (getData?.enableComments) {
        const deadline = moment(getData?.consultationDeadline);
        const today = moment().hour(0).minute(0).second(0);
        deadlineTime = moment
          .duration(deadline.diff(today))
          .asDays()
          .toFixed(0);
        setConsultationDeadline(deadlineTime);
      }
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

  const breadcrumbs_array = [
    { name: "Planning applications", href: "/" },
    { name: data?.name || data?.address, href: "" },
  ];

  const {
    showAccess,
    showCarbon,
    // showHealthcare,
    showHousing,
    showJobs,
    showOpenSpace,
  } = data || {};

  console.log("data", data);

  if (data === null) return notFound();

  return (
    <>
      {data && (
        <>
          <BackLink content="Back" onClick={() => router.push(`/`)} />
          <About data={data} />
          {(showAccess ||
            showCarbon ||
            // showHealthcare ||
            showHousing ||
            showJobs ||
            showOpenSpace) && <Impact data={data} />}
          <Process data={data} consultationDeadline={consultationDeadline} />
        </>
      )}
    </>
  );
};

export default PlanningApplicationItem;
