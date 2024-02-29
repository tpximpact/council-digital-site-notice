import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "../../../util/client";
import { Data } from "../../../util/type";
import { distanceInMiles } from "../../../util/geolocation";

const PlanningApplications = ({
  data,
  searchLocation,
}: {
  data: Data[];
  searchLocation: any;
}) => {
  return (
    <section className="wrap-planning-application">
      {data &&
        data.map(({ _id, image_head, name, address, location }: any, index) => {
          let distance;

          if (
            searchLocation != null &&
            location != null &&
            location.lat != null &&
            location.lng != null
          ) {
            distance = distanceInMiles(searchLocation, {
              longitude: location.lng,
              latitude: location.lat,
            });
          }

          const indexValue = Math.floor(data.length / 3) * 3;

          return (
            <Link
              key={_id}
              href={`/planning-applications/${_id}`}
              className={`planning-application-link ${indexValue <= index && "planning-application-last-line"}`}
            >
              {image_head && (
                <Image
                  width={310}
                  height={223}
                  alt=""
                  src={urlFor(image_head).url()}
                  style={{ maxWidth: "100%" }}
                />
              )}
              <div style={{ paddingTop: "20px" }}>
                <span className="govuk-link govuk-link--no-visited-state link-application">
                  {name || address}
                </span>
                <span className="planning-application-text">
                  <p className="govuk-body" style={{ marginBottom: 0 }}>
                    <LocalIcon />{" "}
                    {distance != undefined && (
                      <span style={{ marginRight: "2px" }}>
                        {distance} {parseFloat(distance) > 0 ? "miles" : "mile"}{" "}
                        &#x2022;
                      </span>
                    )}
                    {address}
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
