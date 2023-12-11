import Breadcrumbs from "@/components/breadcrumbs";
import About from "./about";
import Impact from "./impact";
import Process from "./process";
import { ContextApplication } from "@/context";
import { useContext, useEffect } from "react";
import { getActiveApplications, getActiveApplicationById } from "../../../util/client";

export async function getStaticProps(context: any) {
  const {id} = context.params;
  const data = await getActiveApplicationById(id)
  return {
    props: {
      data: data[0]
    },
  };
}

export async function getStaticPaths() {
  const data = await getActiveApplications();
  return {
  paths: data.map((doc: any) => ({params: {data: doc, id: doc._id}})),
  fallback: true,
  }
}

const Application = ({data={}}:any) => {
  const {setDataApplication} = useContext(ContextApplication)

  useEffect(() => {
    setDataApplication(data)
    localStorage.setItem("application", JSON.stringify({
      'address': data.address,
      'image': data.image,
      'deadline': data.commentDeadline
    }))
  },[data, setDataApplication])
  

const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: data?.name, href:""}]


    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About 
        name={data.name}
        address={data.address}
        description={data.description}
        height={data.height}
        reference={data.reference}
        commentDeadline={data.commentDeadline}
        applicationType={data.applicationType}
        image={data?.image} />
        <Impact />
        <Process id={data?._id} commentDeadline={data.commentDeadline}/>
        </>
    )
}

export default Application;

