import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "../../../util/client";
import { Data } from "../../../util/type";
import { distanceInMiles } from '../../../util/geolocation'

const PlanningApplications = ({ data, searchLocation }: {data : Data[], searchLocation: any}) => {
  return (
    <section className="wrap-planning-application">
      {data && data.map(({_id, image_head, name, address, location}: any, index) => {

      let distance;

      if(searchLocation != null && location != null && location.lat != null && location.lng != null) {
        distance = distanceInMiles(searchLocation, { longitude : location.lng, latitude : location.lat })
      }

const indexValue = (parseFloat((data.length/3).toFixed()) * 3)
        return (
          <Link
            key={_id}
            href={`/${_id}`}
            className={`planning-application-link ${indexValue <= index && 'planning-application-last-line'}`}
          >
            {image_head && (
              <Image width={310} height={223} alt="" src={urlFor(image_head).url()} />
            )}
            <div style={{paddingTop: '20px'}}>
              <Link href={`/${_id}`} className="govuk-link govuk-link--no-visited-state link-application">{name}</Link>
              <span className="planning-application-text">
                  <p className="govuk-body" style={{marginBottom: 0}}>
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