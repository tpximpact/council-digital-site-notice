import Image from "next/image"
import Link from "next/link"
import { LocalIcon } from "../../../public/assets/icons"
import {dummy_data} from "../../help/dummy_data"

const PlanningApplications = () => {
    return(
        <section className="wrap-planning-application">
        {
            dummy_data.map(el => {
                return(
                    <Link key={el.key} href={`/${el.key}`} className="planning-application-link">
                        {el.image && <Image width={330} height={223} alt="" src={el?.image}/>}
                        <div>
                        <h3>{el.name}</h3>
                        <span className="planning-application-text">
                        <p>
                            <LocalIcon />
                            {el.distance} {el.address}</p>

                        </span>
                        </div>
                    </Link>
                )
            })
        }
        </section>
    )
}

export default PlanningApplications