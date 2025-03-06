import Link from "next/link";
import { Metadata } from "next";
import PageWrapper from "@/components/pageWrapper";

export const metadata: Metadata = {
  title: "Page Not Found | Digital Site Notice",
  description: "The page you are looking for is no longer available.",
};

export default function NotFound() {
  return (
    <PageWrapper isCentered={true}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">
            The page you are looking for is no longer available
          </h1>
          <p className="govuk-body">
            Due to a site update the planning application you are looking for
            may have moved.
          </p>
          <p className="govuk-body">
            Please try searching for the planning application in our new list.
          </p>
          <Link className="govuk-button" href="/">
            Find planning applications near you
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
