import Details from "@/components/details";
import Link from "next/link";
import { descriptionDetail } from "../../../util/helpers/description";
import { ArrowIcon } from "../../../public/assets/icons";
import { DataDetails } from "../../../util/helpers/type";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import Gallery from "@/components/gallery";

function About({ data }: { data: DataDetails }) {
  const [loadImage, setLoadImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState<any>();

  useEffect(() => {
    if (data?.image_gallery?.length < 8) {
      setLoadImage(data?.image_gallery?.length);
    } else {
      setLoadImage(6);
    }
    data?.image_head
      ? setImageSelected(data?.image_head)
      : setImageSelected(data?.image_gallery?.[0]);
  }, [data?.image_gallery, data?.image_head]);

  return (
    <div className="wrap-about">
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} image={imageSelected} />
      )}
      {data?.name && <h1 className="govuk-heading-l">{data?.name}</h1>}
      {data?.address && (
        <p className="govuk-body-m govuk-!-font-weight-bold">{data?.address}</p>
      )}
      <div className="wrap-carousel-desktop">
        {(data?.image_head || data?.image_gallery) && (
          <Gallery
            image_head={data?.image_head}
            images={data?.image_gallery}
            loadImage={loadImage}
            setIsModalOpen={setIsModalOpen}
            setLoadImage={setLoadImage}
            setImageSelected={setImageSelected}
            imageSelected={imageSelected}
          />
        )}
        {data?.description && (
          <div>
            <h2 className="govuk-heading-m">About this development</h2>
            <p className="govuk-body">{data?.description}</p>
          </div>
        )}
      </div>
      <div className="wrap-comment-application">
        {data?.enableComments && (
          <Link
            className="govuk-button govuk-!-font-weight-bold"
            style={{ textDecoration: "none" }}
            href={`${data?._id}/feedback`}
          >
            Comment on this application <ArrowIcon />
          </Link>
        )}

        {data?.applicationUpdatesUrl && (
          <Link
            href={data?.applicationUpdatesUrl}
            style={{ marginTop: "-15px" }}
            className="govuk-link govuk-link--no-visited-state"
            target="_blank"
          >
            Sign up for updates about this application
          </Link>
        )}
      </div>
      {data?.applicationType && (
        <>
          <h3 className="govuk-heading-m">Application type</h3>
          <p className="govuk-body">{data?.applicationType}</p>
          <Details
            summary="Learn more about application types"
            description={descriptionDetail["about"]}
          />
        </>
      )}
      {(data?.proposedLandUse?.classB ||
        data?.proposedLandUse?.classC ||
        data?.proposedLandUse?.classE ||
        data?.proposedLandUse?.classF ||
        data?.proposedLandUse?.suiGeneris) && (
        <>
          <h3 className="govuk-heading-m">How the site will be used</h3>
          <div className="govuk-body">
            <ul>
              {data?.proposedLandUse?.classB && <li>Industrial</li>}
              {data?.proposedLandUse?.classC && <li>Residential</li>}
              {data?.proposedLandUse?.classE && <li>Commercial</li>}
              {data?.proposedLandUse?.classF && <li>Community</li>}
              {data?.proposedLandUse?.suiGeneris && (
                <li>{data?.proposedLandUse?.suiGenerisDetail}</li>
              )}
            </ul>
          </div>
        </>
      )}
      {data?.height && (
        <>
          <h3 className="govuk-heading-m">Height</h3>
          <p className="govuk-body">Maximum {data?.height} storeys</p>
        </>
      )}
      {data?.constructionTime && (
        <>
          <h3 className="govuk-heading-m">Estimated construction time</h3>
          <p className="govuk-body">{data?.constructionTime}</p>
        </>
      )}

      <h3 className="govuk-heading-m">Application reference</h3>
      <p className="govuk-body">{data?.applicationNumber}</p>
    </div>
  );
}

export default About;
