import PageWrapper from "@/components/pageWrapper";
import { SearchParams } from "@/types";
import {
  getActiveApplications,
  getActiveApplicationsByLocation,
  getGlobalContent,
} from "../actions/sanityClient";
import PlanningApplicationList from "@/components/planning-application-list";
import { Pagination } from "@/components/govuk/Pagination";
import Link from "next/link";
import PostcodeSearch from "@/components/postcodeSearch";
import { getLocationFromPostcode } from "../actions/actions";
import { ContentNoResult } from "@/components/ContentNoResult";

interface HomeProps {
  params: any;
  searchParams?: SearchParams;
}

const itemsPerPage = 6;

async function fetchData({ params, searchParams }: HomeProps): Promise<any> {
  // site config
  const globalConfig = await getGlobalContent();

  // get applications
  let applicationsResponse, applications, totalApplications, locationValid;
  const offset = searchParams?.page
    ? (searchParams.page - 1) * itemsPerPage
    : 0;

  // determine search type
  const postcode = searchParams?.postcode;
  if (postcode) {
    try {
      const locationResponse = await getLocationFromPostcode(postcode);
      if (locationResponse) {
        applicationsResponse = await getActiveApplicationsByLocation(
          offset,
          locationResponse,
          itemsPerPage,
        );
      } else {
        locationValid = "Postcode not found. Please enter a valid postcode.";
      }
    } catch (error) {
      locationValid =
        "Error occured while validating postcode. Please try again.";
      console.error("Error validating postcode:", error);
    }
  } else {
    applicationsResponse = await getActiveApplications(offset, itemsPerPage);
  }

  applications =
    applicationsResponse && applicationsResponse?.results
      ? applicationsResponse.results
      : {};
  totalApplications =
    applicationsResponse && applicationsResponse?.total
      ? applicationsResponse.total
      : 0;

  const pagination = {
    page: parseInt((searchParams?.page ?? "1").toString()),
    total_pages: Math.ceil(totalApplications / itemsPerPage),
  };

  return [globalConfig, applications, pagination, locationValid];
}

const Home = async ({ params, searchParams }: HomeProps) => {
  const [globalConfig, applications, pagination, locationValid] =
    await fetchData({
      params,
      searchParams,
    });

  return (
    <PageWrapper isCentered={true}>
      <h1 className="govuk-heading-xl">Find planning applications near you</h1>
      <p className="govuk-body-m">
        Find, review and leave your comments on planning applications in{" "}
        {globalConfig?.councilName}
      </p>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <form action="/" method="get">
            <PostcodeSearch
              postcode={searchParams?.postcode}
              error={locationValid}
            />
          </form>
        </div>
        <div className="govuk-grid-column-one-half">
          {globalConfig?.signUpUrl && (
            <Link
              className="govuk-button govuk-button--secondary"
              href={`${globalConfig?.signUpUrl}`}
            >
              Sign up for alerts on applications near you
            </Link>
          )}
        </div>
      </div>

      {applications && applications.length > 0 ? (
        <PlanningApplicationList data={applications} />
      ) : (
        <ContentNoResult />
      )}

      {pagination && pagination.total_pages > 1 && (
        <Pagination
          baseUrl="/"
          searchParams={searchParams}
          pagination={pagination}
        />
      )}
    </PageWrapper>
  );
};

export default Home;
