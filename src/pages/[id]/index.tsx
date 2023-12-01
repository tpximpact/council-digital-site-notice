import Breadcrumbs from "@/components/breadcrumbs";
import About from "./about";
import Impact from "./impact";
import Process from "./process";
import { useContext } from "react";
import { ContextApplication } from "@/context";

const Application = () => {
  const { dataApplication } = useContext(ContextApplication);
  const {name} = dataApplication

const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: name, href:""}]
    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About data={dataApplication}/>
        <Impact />
        <Process data={dataApplication}/>
        </>
    )
}

export default Application;

