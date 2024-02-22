import { useContext, useEffect, useState } from "react";
import { ContextApplication } from "@/context";
import Breadcrumbs from "@/components/breadcrumbs";
import About from "./components/about";
import Impact from "./components/impact";
import Process from "./components/process";
import { DataDetails } from "../../../util/type";
import { getActiveApplications, getApplicationById } from "../../../util/client";
import moment from 'moment'
import Head from 'next/head';

export async function getServerSideProps(context: any) {
  const {id} = context.params;
  const data = await getApplicationById(id)
  return {
    props: {
      data: data[0]
    },
  };
}

// export async function getStaticPaths() {
//   const data = await getActiveApplications();
  
//   return {
//   paths: data.map((doc: any) => ({params: {data: doc, id: doc._id}})),
//   fallback: true,
//   }
// }


const Application = ({data}: {data: DataDetails} ) => {
  const {setDataApplication, setQuestion} = useContext(ContextApplication)
  const [commentDeadline, setCommentDeadline] = useState('')

  useEffect(() => {
    setQuestion(0)

    let deadlineTime;

    if(data?.enableComments) {
      const deadline = moment(data?.commentDeadline)
      const today = moment().hour(0).minute(0).second(0)
      deadlineTime = moment.duration(deadline.diff(today)).asDays().toFixed(0)
      setCommentDeadline(deadlineTime)
    }
    setDataApplication({...data, commentDeadline: deadlineTime})

    localStorage.setItem("application", JSON.stringify({
      'address': data?.address,
      'image_head': data?.image_head,
      'image_gallery': data?.image_gallery,
      'deadline': data?.commentDeadline,
      'name': data?.name,
      'id': data?._id,
      'applicationNumber': data?.applicationNumber,
      'applicationStage': data?.applicationStage,
      'applicationUpdatesUrl': data?.applicationUpdatesUrl
    }))
  },[data, setDataApplication, setQuestion, commentDeadline])
  

const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: data?.name, href:""}]

const {showAccess, showCarbon, showHealthcare, showHousing, showJobs, showOpenSpace} = data || {}
    return (
        <>
         <Head>
          <title>Digital site notice</title>
        </Head>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About data={data}/>
        {
          (showAccess || showCarbon || showHealthcare || showHousing || showJobs || showOpenSpace) &&
        <Impact data={data}/>}
        <Process data={data} commentDeadline={commentDeadline}/>
        </>
    )
}

export default Application;

