import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "../../../util/client";
import { Data } from "../../../util/type";
import { distanceInMiles } from '../../../util/geolocation'

const PlanningApplications = ({ data, location }: {data : Data[], location: any}) => {
  return (
    <section className="wrap-planning-application">
      {data && data.map(({_id, image, name, address, longitude, latitude}: any) => {

        let distance;

        if(location != null && latitude != null && longitude != null) {
          distance = distanceInMiles(location, { longitude, latitude })
        }

        return (
          <Link key={_id} href={`/${_id}`} className="planning-application-link">
            {image && (<Image width={330} height={223} alt="" src={urlFor(image).url()} />)}
            <div>
              <h3>{name}</h3>
              
                <span className="planning-application-text">
                  <p>
                    <LocalIcon /> {address}
                    {
                      distance != undefined && 
                      <span>
                        <br />
                        {distance} mile 
                      </span>
                    }
                  </p>
                </span>

            </div>
            </Link>
        );
      })}
    </section>
  );
};

export default PlanningApplications;