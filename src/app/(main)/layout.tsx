import Header from "@/components/header";
import Banner from "@/components/banner";
import CookiesBanner from "@/components/cookies";
import GoogleAnalytics from "@/components/google-analytics";
import { urlFor } from "../actions/sanityClient";
import "../../styles/app.scss";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getGlobalContent } from "../actions/sanityClient";
import { Suspense } from "react";
import { GovUkInitAll } from "@/components/GovUkInitAll";
import Footer from "@/components/footer";

export const globalContent = await getGlobalContent();

export async function generateMetadata(): Promise<Metadata> {
  const resMetadata = await globalContent?.favicon;
  return {
    title: "Digital site notice",
    icons: {
      icon: resMetadata ? urlFor(resMetadata)?.url() : "/favicon_default.ico",
    },
  };
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const environment = process.env.NODE_ENV;
  const cookieStore = cookies();
  const isShowCookie = cookieStore.get("isShowCookie")?.value || true;
  const isConsentCookie = cookieStore.get("isConsentCookie")?.value || false;

  return (
    <>
      {isShowCookie && <CookiesBanner />}
      {isConsentCookie &&
        environment !== "development" &&
        globalContent?.googleAnalytics && (
          <GoogleAnalytics gaId={globalContent?.googleAnalytics} />
        )}
      <a href="#main" className="govuk-skip-link" data-module="govuk-skip-link">
        Skip to main content
      </a>
      <Header globalConfig={globalContent} />
      {/* uncomment to have banner centered */}
      {/* <div className="govuk-width-container"> */}
      <Banner globalConfig={globalContent} />
      {/* </div> */}
      <main className="govuk-main-wrapper" id="main">
        <div className="govuk-width-container">
          <Suspense>{children}</Suspense>
        </div>
      </main>
      <Footer />
      <GovUkInitAll />
    </>
  );
}
