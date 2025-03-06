import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Page Not Found | Digital Site Notice",
  description: "The page you are looking for is no longer available.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="govuk-main-wrapper" id="main">
        <div className="govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">Page not found</h1>
              <p className="govuk-body">
                If you typed the web address, check it is correct.
              </p>
              <p className="govuk-body">
                If you pasted the web address, check you copied the entire
                address.
              </p>
              <Link className="govuk-button" href="/">
                Find planning applications near you
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
