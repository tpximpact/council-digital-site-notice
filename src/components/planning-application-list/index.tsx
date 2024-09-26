import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "@/app/actions/sanityClient";
import { PlanningApplication } from "../../../sanity/sanity.types";
import { useRouter } from "next/navigation";

const PlanningApplicationList = ({
  data,
  searchLocation,
}: {
  data: PlanningApplication[];
  searchLocation: any;
}) => {
  const router = useRouter();
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
              <div
                key={_id}
                // href={`/planning-applications/${_id}`}
                onClick={() => {
                  router.push(`/planning-applications/${_id}`);
                }}
                className={`planning-application-link ${isLastItem && "planning-application-last-item"} ${isLastRowOnPage && "planning-application-last-row"} ${isFirstRowOnPage && "planning-application-first-row"}`}
              >
                {/* <Link href={`/planning-applications/${_id}`}> */}
                {image_head && (
                  <Image
                    width={310}
                    height={223}
                    alt={`development ${_id}`}
                    src={urlFor(image_head).url()}
                    style={{ maxWidth: "100%" }}
                  />
                )}
                {/* </Link> */}
                <div style={{ paddingTop: "20px" }}>
                  <Link
                    className="govuk-link govuk-link--no-visited-state link-application"
                    href={`/planning-applications/${_id}`}
                  >
                    {name || address}
                  </Link>
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
              </div>
            );
          },
        )}
    </section>
  );
};

export default PlanningApplicationList;
