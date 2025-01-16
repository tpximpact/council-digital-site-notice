import Header from "@/components/header";
import Banner from "@/components/banner";
import CookiesBanner from "@/components/cookies";
import GoogleAnalytics from "@/components/google-analytics";
import { urlFor } from "../actions/sanityClient";
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
  const isShowCookieValue = cookieStore.get("isShowCookie")?.value;
  const isShowCookie =
    isShowCookieValue === undefined ? true : isShowCookieValue === "true";
  const isConsentCookieValue = cookieStore.get("isConsentCookie")?.value;
  const isConsentCookie =
    isConsentCookieValue === undefined
      ? false
      : isConsentCookieValue === "true";

  console.log(typeof isShowCookie, isShowCookie);
  return (
    <>
      {isShowCookie && <CookiesBanner />}
      {isConsentCookie &&
        environment !== "development" &&
        globalContent?.googleAnalytics && (
          <>
            <GoogleAnalytics gaId={globalContent?.googleAnalytics} />
          </>
        )}
      <a href="#main" className="govuk-skip-link" data-module="govuk-skip-link">
        Skip to main content
      </a>
      <Header globalConfig={globalContent} />
      <div className="govuk-width-container">
        <Banner globalConfig={globalContent} />
      </div>
      <Suspense>{children}</Suspense>
      <Footer />
      <GovUkInitAll />
    </>
  );
}
