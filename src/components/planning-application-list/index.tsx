import Link from "next/link";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "@/app/actions/sanityClient";
import { PlanningApplication } from "../../../sanity/sanity.types";
import { useRouter } from "next/navigation";

const PlanningApplicationList = ({ data }: { data: PlanningApplication[] }) => {
  const router = useRouter();
  return (
    <section className="dsn-planning-application-cards">
      {data &&
        data.map(({ _id, image_head, name, address, distance }: any, index) => {
          const MetaDistance = () => {
            if (distance && parseFloat(distance) > 0) {
              return (
                <span>
                  {distance} {parseFloat(distance) > 0 ? "miles" : "mile"}
                </span>
              );
            }
            return null;
          };

          const MetaAddress = () => {
            if (address) {
              return <span>{address}</span>;
            }
            return null;
          };

          if (name || address) {
            return (
              <Link
                key={_id}
                href={`/planning-applications/${_id}`}
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
                  {name || address}
                </p>
                {(MetaAddress() || MetaDistance()) && (
                  <div className="dsn-planning-application-card__meta">
                    <div className="dsn-planning-application-card__meta-items">
                      <MetaDistance />
                      <MetaAddress />
                    </div>
                  </div>
                )}
              </Link>
            );
          } else {
            return null;
          }
        })}
    </section>
  );
};

export default PlanningApplicationList;
