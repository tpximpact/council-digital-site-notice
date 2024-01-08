import Breadcrumbs from "@/components/breadcrumbs";
import About from "./about";
import Impact from "./impact";
import Process from "./process";
import { ContextApplication } from "@/context";
import { useContext, useEffect, useState } from "react";
import { DataDetails } from "../../../util/type";
import { getActiveApplications, getActiveApplicationById } from "../../../util/client";
import moment from 'moment'



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

const Application = ({data}: {data: DataDetails} ) => {
  const {setDataApplication} = useContext(ContextApplication)
  const [commentDeadline, setCommentDeadline] = useState('')

  useEffect(() => {
    const deadline = moment(data.valid_from_date).add(21, 'days')
    const today = moment().hour(0).minute(0).second(0)
    const deadlineTime = moment.duration(today.diff(deadline)).asDays().toFixed(0)
    setCommentDeadline(deadlineTime)
    setDataApplication({...data, commentDeadline: deadlineTime})
    localStorage.setItem("application", JSON.stringify({
      'development_address': data?.development_address,
      'massings': data?.massings,
      'deadline': commentDeadline,
      'name': data?.name,
      'id': data?._id,
      'system_status': data?.system_status
    }))
  },[data, setDataApplication, commentDeadline])
  

const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: data?.name, href:""}]


    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About data={data}/>
        <Impact data={data}/>
        <Process id={data?._id} 
        system_status ={data?.system_status}
        commentDeadline={commentDeadline}
        />
        </>
    )
}

export default Application;

