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
    <section className="dsn-planning-application-cards">
      {data &&
        data.map(
          (
            { _id, image_head, name, address, location, distance }: any,
            index,
          ) => {
            return (
              <div
                key={_id}
                onClick={() => {
                  router.push(`/planning-applications/${_id}`);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(`/planning-applications/${_id}`);
                  }
                }}
                className={`dsn-planning-application-card`}
              >
                <div
                  className="dsn-planning-application-card__image"
                  style={{
                    backgroundImage: image_head
                      ? `url(${urlFor(image_head).url()})`
                      : "none",
                  }}
                ></div>
                <p className="dsn-planning-application-card__title">
                  <Link
                    className=" govuk-link govuk-link--no-visited-state"
                    href={`/planning-applications/${_id}`}
                  >
                    {name || address}
                  </Link>
                </p>
                <div className="govuk-body dsn-planning-application-card__meta">
                  {distance || (address && <LocalIcon />)}
                  {distance && (
                    <span>
                      {distance} {parseFloat(distance) > 0 ? "miles" : "mile"}
                    </span>
                  )}
                  {address && <span>{address}</span>}
                </div>
              </div>
            );
          },
        )}
    </section>
  );
};

export default PlanningApplicationList;
