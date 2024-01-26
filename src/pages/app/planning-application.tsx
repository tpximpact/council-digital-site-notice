import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "../../../util/client";
import { Data } from "../../../util/type";
import { distanceInMiles } from '../../../util/geolocation'

const PlanningApplications = ({ data, searchLocation }: {data : Data[], searchLocation: any}) => {
  return (
    <section className="wrap-planning-application">
      {data && data.map(({_id, image, name, address, location}: any) => {

        let distance;

        if(searchLocation != null && location != null && location.lat != null && location.lng != null) {
          distance = distanceInMiles(searchLocation, { longitude : location.lng, latitude : location.lat })
        }

        return (
          <Link key={_id} href={`/${_id}`} className="govuk-body planning-application-link">
            {image && (<Image width={330} height={223} alt="" src={urlFor(image).url()} />)}
            <div>
              <h3>{name}</h3>
              
                <span className="govuk-body-s planning-application-text">
                  <p>
                    <LocalIcon />                   {
                      distance != undefined && 
                      <span style={{marginRight: '2px'}}>
                        {distance} {parseFloat(distance) > 0 ? 'miles' : 'mile'} &#x2022;
                      </span>
                    }{address}
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