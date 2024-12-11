import Details from "@/components/details";
import Link from "next/link";
import { descriptionDetail } from "@/app/lib/description";
import { useEffect, useState } from "react";
import { PlanningApplication } from "../../../sanity/sanity.types";
import { getGlobalContent } from "@/app/actions/sanityClient";
import PageCenter from "../pageCenter";
import ButtonStart from "../buttonStart";
import ImageGallery from "../imageGallery";

function About({ data }: { data: PlanningApplication }) {
  const [globalConfig, setGlobalConfig] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchGlobalConfig = await getGlobalContent();
      setGlobalConfig(fetchGlobalConfig);
    })();
  }, []);

  let galleryImages = data.image_head ? [data.image_head] : [];

  galleryImages =
    data.image_gallery && data?.image_gallery?.length > 0
      ? [...galleryImages, ...data?.image_gallery]
      : [...galleryImages];

  return (
    <PageCenter>
      {data.name && <h1 className="govuk-heading-l">{data.name}</h1>}
      {data.address && <h2 className="govuk-heading-m">{data.address}</h2>}

      {galleryImages.length > 0 && <ImageGallery images={galleryImages} />}

      {data?.description && (
        <>
          <h2 className="govuk-heading-m">About this development</h2>
          <p className="govuk-body">{data.description}</p>
        </>
      )}
      {globalConfig?.globalEnableComments && data?.enableComments && (
        <ButtonStart
          content="Comment on this application"
          href={`${data?._id}/feedback`}
          noSpacing={data?.applicationUpdatesUrl ? true : false}
        />
      )}
      {data?.applicationUpdatesUrl && (
        <p className="govuk-body">
          <Link
            href={data.applicationUpdatesUrl}
            className="govuk-link govuk-link--no-visited-state"
            target="_blank"
          >
            Sign up for updates about this application
          </Link>
        </p>
      )}

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
    </PageCenter>
  );
}

export default About;
