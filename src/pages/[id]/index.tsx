import Breadcrumbs from "@/components/breadcrumbs";
import About from "./about";
// import Impact from "./components/impact";
// import Process from "./components/process";

const Application = () => {
const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: "Murphy's Yard"}]
    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About />
        {/* <Impact />
        <Process /> */}
        </>
    )
}

export default Application;