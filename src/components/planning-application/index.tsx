import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "@/app/actions/client";
import { Data } from "../../../util/helpers/type";
import { distanceInMiles } from "../../app/actions/actions";

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
        data.map(
          (
            { _id, image_head, name, address, location, distance }: any,
            index,
          ) => {
            const itemsPerRow = 3;
            const itemsPerPage = itemsPerRow * 2;
            const isLastItem = index === data.length - 1;
            const isFirstRowOnPage = index % itemsPerPage < itemsPerRow;
            const isLastRowOnPage = index % itemsPerPage >= itemsPerRow;

            return (
              <Link
                key={_id}
                href={`/planning-applications/${_id}`}
                className={`planning-application-link ${isLastItem && "planning-application-last-item"} ${isLastRowOnPage && "planning-application-last-row"} ${isFirstRowOnPage && "planning-application-first-row"}`}
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
                          {distance}{" "}
                          {parseFloat(distance) > 0 ? "miles" : "mile"} &#x2022;
                        </span>
                      )}
                      {address}
                    </p>
                  </span>
                </div>
              </Link>
            );
          },
        )}
    </section>
  );
};

export default PlanningApplications;
