import Details from "@/components/details";
import { descriptionDetail } from "@/app/lib/description";
import { PlanningApplication } from "../../../sanity/sanity.types";
import PageCenter from "../pageCenter";
import React from "react";
import DataPoints, { DataPoint } from "../dataPoints";

function hasSectionData(
  data: PlanningApplication,
  housingData: DataPoint[],
  openSpacesData: DataPoint[],
  jobsData: DataPoint[],
  carbonEmissionsData: DataPoint[],
): boolean {
  return (
    (!!data?.showHousing && housingData.length > 0) ||
    (!!data?.showOpenSpace && openSpacesData.length > 0) ||
    (!!data?.showJobs && jobsData.length > 0) ||
    (!!data?.showCarbon && carbonEmissionsData.length > 0) ||
    (!!data?.showAccess && !!data?.access)
  );
}

function Impact({ data }: { data: PlanningApplication }) {
  const { housingData, openSpacesData, jobsData, carbonEmissionsData } =
    sectionData(data);
  if (
    !hasSectionData(
      data,
      housingData,
      openSpacesData,
      jobsData,
      carbonEmissionsData,
    )
  ) {
    return null;
  }
  return (
    <>
      <hr className="govuk-section-break govuk-section-break--l" />
      <div className="dsn-impact">
        <PageCenter>
          <h2 className="dsn-impact__heading">How could this affect you?</h2>
          <p className="dsn-impact__body">
            Any new development in your local area will have an effect on your
            community.
          </p>
          <p className="dsn-impact__body">
            We've outlined some of the ways we think this development would
            impact your community, so that you can give us feedback on what's
            important for us to consider when we're deciding what to give
            planning permission for.
          </p>
          <div className="dsn-impact__sections">
            {data?.showHousing && housingData.length > 0 && (
              <HousingSection housingData={housingData} />
            )}
            {data?.showOpenSpace && openSpacesData.length > 0 && (
              <OpenSpacesSection openSpacesData={openSpacesData} />
            )}
            {data?.showJobs && jobsData.length > 0 && (
              <JobsSection jobsData={jobsData} />
            )}
            {data?.showCarbon && carbonEmissionsData.length > 0 && (
              <CarbonEmissionsSection
                carbonEmissionsData={carbonEmissionsData}
              />
            )}
            {data?.showAccess && data?.access && <AccessSection data={data} />}
          </div>
        </PageCenter>
      </div>
    </>
  );
}

const sectionData = (data: PlanningApplication) => {
  const housingData: DataPoint[] = [
    data.housing?.residentialUnits && {
      key: "new homes",
      value: data.housing.residentialUnits,
    },
    data.housing?.affordableResidentialUnits && {
      key: "affordable housing",
      value: `${data.housing.affordableResidentialUnits}%`,
    },
  ].filter((item): item is DataPoint => Boolean(item));

  const openSpacesData: DataPoint[] = [
    data?.openSpaceArea && {
      key: "square metres",
      value: `${data.openSpaceArea}`,
    },
  ].filter((item): item is DataPoint => Boolean(item));

  const jobsData: DataPoint[] = [
    (data?.jobs?.min || data?.jobs?.max) && {
      key: "new roles",
      value: `${
        data?.jobs?.min && data?.jobs?.max
          ? data?.jobs?.min + "-" + data?.jobs?.max
          : data?.jobs?.min || data?.jobs?.max
      }`,
    },
  ].filter((item): item is DataPoint => Boolean(item));

  const carbonEmissionsData: DataPoint[] = [
    data?.carbonEmissions && {
      key: "less than minimum requirements",
      value: `${data?.carbonEmissions}%`,
    },
  ].filter((item): item is DataPoint => Boolean(item));

  return {
    housingData,
    openSpacesData,
    jobsData,
    carbonEmissionsData,
  };
};

const HousingSection: React.FC<{
  housingData: DataPoint[];
}> = ({ housingData }) => {
  return (
    <div className="dsn-impact__section dsn-impact__section--housing">
      <h3 className="dsn-impact__section-heading">New homes</h3>
      <div className="dsn-impact__section-body">
        <DataPoints data={housingData} />
        <Details
          summary="How did we calculate this?"
          description={descriptionDetail["home"]}
          isInverted={true}
        />
      </div>
    </div>
  );
};

// const HealthcareSection: React.FC<{ data: PlanningApplication }> = ({
//   data,
// }) => {

//     return (
//       <div className="dsn-impact__section dsn-impact__section--healthcare">
//         <h3 className="dsn-impact__section-heading">Healthcare</h3>
//         <div className="dsn-impact__section-body">
//           {data?.healthcareDemand}
//           <Details
//             summary="How did we calculate this?"
//             description={descriptionDetail["healthcare"]}
//             isInverted={true}
//           />
//         </div>
//       </div>
//     );

// };

const OpenSpacesSection: React.FC<{
  openSpacesData: DataPoint[];
}> = ({ openSpacesData }) => {
  return (
    <div className="dsn-impact__section dsn-impact__section--open-spaces">
      <h3 className="dsn-impact__section-heading">Open spaces</h3>
      <div className="dsn-impact__section-body">
        <DataPoints data={openSpacesData} />
        <Details
          summary="How did we calculate this?"
          description={descriptionDetail["open space"]}
          isInverted={true}
        />
      </div>
    </div>
  );
};

const JobsSection: React.FC<{
  jobsData: DataPoint[];
}> = ({ jobsData }) => {
  return (
    <div className="dsn-impact__section dsn-impact__section--jobs">
      <h3 className="dsn-impact__section-heading">New jobs</h3>
      <div className="dsn-impact__section-body">
        <DataPoints data={jobsData} />
        <Details
          summary="How did we calculate this?"
          description={descriptionDetail["new jobs"]}
          isInverted={true}
        />
      </div>
    </div>
  );
};

const CarbonEmissionsSection: React.FC<{
  carbonEmissionsData: DataPoint[];
}> = ({ carbonEmissionsData }) => {
  return (
    <div className="dsn-impact__section dsn-impact__section--carbon-emissions">
      <h3 className="dsn-impact__section-heading">Carbon emissions</h3>
      <div className="dsn-impact__section-body">
        <DataPoints data={carbonEmissionsData} />
        <Details
          summary="How did we calculate this?"
          description={descriptionDetail["carbon"]}
          isInverted={true}
        />
      </div>
    </div>
  );
};

const AccessSection: React.FC<{ data: PlanningApplication }> = ({ data }) => {
  return (
    <div className="dsn-impact__section dsn-impact__section--access">
      <h3 className="dsn-impact__section-heading">
        Pedestrian and vehicle access
      </h3>
      <div className="dsn-impact__section-body">
        <p>{data?.access}</p>
      </div>
    </div>
  );
};

export default Impact;
