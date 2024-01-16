import { useContext, useEffect } from "react";
import { ContextApplication } from "@/context";
import Breadcrumbs from "@/components/breadcrumbs";
import About from "./components/about";
import Impact from "./components/impact";
import Process from "./components/process";
import { getActiveApplications, getActiveApplicationById } from "../../../util/client";
import { DataObj } from "../../../util/type";


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

const Application = ({data}:DataObj) => {
  const {setDataApplication, setQuestion} = useContext(ContextApplication)

  useEffect(() => {
    setQuestion(0)
    setDataApplication(data)
    localStorage.setItem("application", JSON.stringify({
      'address': data?.address,
      'image': data?.image,
      'deadline': data?.commentDeadline,
      'name': data?.name,
      'id': data?._id,
      'reference': data?.reference
    }))
  },[data, setDataApplication, setQuestion])
  

const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: data?.name, href:""}]


    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About 
        _id={data?._id}
        name={data?.name}
        address={data?.address}
        description={data?.description}
        height={data?.height}
        reference={data?.reference}
        commentDeadline={data?.commentDeadline}
        applicationType={data?.applicationType}
        image={data?.image} />
        <Impact />
        <Process id={data?._id} commentDeadline={data?.commentDeadline}/>
        </>
    )
}

export default Application;

