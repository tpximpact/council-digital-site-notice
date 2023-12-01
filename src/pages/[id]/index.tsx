import Breadcrumbs from "@/components/breadcrumbs";
import About from "./about";
import Impact from "./impact";
import Process from "./process";
import { getActiveApplications, getActiveApplicationById } from "../../../util/client";

  export async function getStaticProps(context: any) {
    const {id} = context.params;
    const data = await getActiveApplicationById(id)
    return {
      props: {
        data: data[0],
      },
    };
  }

  export async function getStaticPaths() {
    const data = await getActiveApplications();
    return {
    paths: data.map((doc: any) => ({params: {data: doc, id: doc._id}})),
    fallback: false,
    }
  }

const Application = ({
    data}:any) => {
const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: "Murphy's Yard", href:""}]
    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About data={data}/>
        <Impact />
        <Process data={data}/>
        </>
    )
}

export default Application;

