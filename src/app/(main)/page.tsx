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
import { Metadata } from "next";

interface HomeProps {
  params: any;
  searchParams?: SearchParams;
}

const itemsPerPage = 6;

export async function generateMetadata({
  params,
  searchParams,
}: HomeProps): Promise<Metadata> {
  let title = "Find planning applications near you | Digital Site Notice";
  if (searchParams && searchParams?.postcode) {
    title = `Planning applications near ${searchParams.postcode} | Digital Site Notice`;
  }
  const description =
    "This site allows you to find, review and leave your comments on planning applications submitted through your local council planning authority.";
  return {
    title: {
      template: "%s | Digital Site Notice",
      default: title,
    },
    description,
  };
}

async function fetchData({ params, searchParams }: HomeProps): Promise<any> {
  // site config
  const globalConfig = await getGlobalContent();

  // get applications
  let applicationsResponse;
  let totalApplications;
  const offset = searchParams?.page
    ? (searchParams.page - 1) * itemsPerPage
    : 0;

  // determine search type
  const postcode = searchParams?.postcode;
  if (postcode) {
    const locationResponse = await getLocationFromPostcode(postcode);
    if (locationResponse) {
      applicationsResponse = await getActiveApplicationsByLocation(
        offset,
        locationResponse,
        itemsPerPage,
      );
    } else {
      applicationsResponse = null;
    }
  } else {
    applicationsResponse = await getActiveApplications(offset, itemsPerPage);
  }

  const applications =
    applicationsResponse && applicationsResponse?.results
      ? applicationsResponse.results
      : [];
  totalApplications =
    applicationsResponse && applicationsResponse?.total
      ? applicationsResponse.total
      : 0;

  const pagination = {
    page: parseInt((searchParams?.page ?? "1").toString()),
    total_pages: Math.ceil(totalApplications / itemsPerPage),
  };

  return [globalConfig, applications, pagination];
}

const Home = async ({ params, searchParams }: HomeProps) => {
  const [globalConfig, applications, pagination] = await fetchData({
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
            <PostcodeSearch postcode={searchParams?.postcode} />
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
