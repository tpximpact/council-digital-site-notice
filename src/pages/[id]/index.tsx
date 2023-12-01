import Breadcrumbs from "@/components/breadcrumbs";
import About from "./about";
import Impact from "./impact";
import Process from "./process";
import { useRouter } from 'next/router'

const Application = () => {
const breadcrumbs_array = [{name: "Planning applications", href: "/"}, {name: "Murphy's Yard", href:""}]
const router = useRouter()
const { id } = router.query

    return (
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        <About />
        <Impact />
        <Process id={id}/>
        </>
    )
}

export default Application;