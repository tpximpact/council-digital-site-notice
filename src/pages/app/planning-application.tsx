import Link from "next/link";
import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "../../../util/client";
import { PaginationType } from "../../../util/type";

const PlanningApplications = ({ data }: (PaginationType)) => {
  return (
    <section className="wrap-planning-application">
      {data && data.map(({_id, image_head, name, address}: any) => {
        return (
          <Link
            key={_id}
            href={`/${_id}`}
            className="govuk-body planning-application-link"
          >
            {image_head && (
              <Image width={330} height={223} alt="" src={urlFor(image_head).url()} />
            )}
            <div>
              <h3>{name}</h3>
              <span className="govuk-body-s planning-application-text">
                <p>
                  <LocalIcon />
                  1 mile {address}
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
