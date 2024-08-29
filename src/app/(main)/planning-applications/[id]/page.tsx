"use client";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import About from "@/components/about";
import Impact from "@/components/impact";
import Process from "@/components/process";
import { getApplicationById } from "../../../actions/sanityClient";
import moment from "moment";
import { useParams } from "next/navigation";
import { PlanningApplication } from "../../../../../sanity/sanity.types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const PlanningApplicationItem = () => {
  const [consultationDeadline, setConsultationDeadline] = useState<string>("");
  const [data, setData] = useState<PlanningApplication | null>();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      const result = await getApplicationById(id as string);
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

  if (data === null) return notFound();

  return (
    <>
      {data && (
        <>
          <Breadcrumbs breadcrumbs_info={breadcrumbs_array} />
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
