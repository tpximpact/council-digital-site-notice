import Breadcrumbs from "@/components/breadcrumbs";
import About from "@/components/about";
import Impact from "@/components/impact";
import Process from "@/components/process";
import { getApplicationById } from "@/app/actions/sanityClient";
import moment from "moment";

async function getData(id: string) {
  const result = await getApplicationById(id as string);
  return result;
}

const PlanningApplicationItem = async ({ params }: { params: any }) => {
  const { id } = params;

  let consultationDeadline = "";
  const data = await getData(id as string);
  if (data?.enableComments) {
    const deadline = moment(data?.consultationDeadline);
    const today = moment().hour(0).minute(0).second(0);
    consultationDeadline = moment
      .duration(deadline.diff(today))
      .asDays()
      .toFixed(0);
  }

  const breadcrumbs_array = [
    { name: "Planning applications", href: "/" },
    { name: data.name || data?.address, href: "" },
  ];

  const { showAccess, showCarbon, showHousing, showJobs, showOpenSpace } =
    data || {};
  return (
    <>
      {data && (
        <>
          <Breadcrumbs breadcrumbs_info={breadcrumbs_array} />
          <About {...data} />
          {(showAccess ||
            showCarbon ||
            showHousing ||
            showJobs ||
            showOpenSpace) && <Impact {...data} />}
          <Process {...data} consultationDeadline={consultationDeadline} />
        </>
      )}
    </>
  );
};

export default PlanningApplicationItem;
