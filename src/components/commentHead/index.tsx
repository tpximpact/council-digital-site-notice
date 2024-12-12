import { urlFor } from "@/app/actions/sanityClient";
import { PlanningApplication } from "../../../sanity/sanity.types";
import Link from "next/link";

const CommentHead = ({
  application,
  isInverted,
}: {
  application: PlanningApplication;
  isInverted?: boolean;
}) => {
  return (
    <div
      className={`dsn-comment-head ${isInverted ? "dsn-comment-head--inverted" : ""}`}
    >
      {application?.image_head && (
        <div
          className="dsn-comment-head__image"
          style={{
            backgroundImage: application?.image_head
              ? `url(${urlFor(application?.image_head).url()})`
              : "none",
          }}
        ></div>
      )}

      <div className="dsn-comment-head__content">
        {(application?.name || application?.address) && (
          <Link
            className="dsn-comment-head__link"
            href={`/planning-applications/${application?._id}`}
          >
            {application?.name || application?.address}
          </Link>
        )}
        {application?.applicationNumber && (
          <p>
            <strong>Application reference:</strong>{" "}
            {application?.applicationNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentHead;
