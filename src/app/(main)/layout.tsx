import Header from "@/components/header";
import Banner from "@/components/banner";
import CookiesBanner from "@/components/cookies";
import { urlFor } from "../actions/sanityClient";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getGlobalContent } from "../actions/sanityClient";
import { Suspense } from "react";
import { GovUkInitAll } from "@/components/GovUkInitAll";
import Footer from "@/components/footer";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

export const globalContent = await getGlobalContent();

export async function generateMetadata(): Promise<Metadata> {
  const resMetadata = await globalContent?.favicon;
  const title = "Find planning applications near you | Digital Site Notice";
  const description =
    "This site allows you to find, review and leave your comments on planning applications submitted through your local council planning authority.";
  return {
    title: {
      template: "%s | Digital Site Notice",
      default: title,
    },
    description,
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

  return (
    <>
      {isShowCookie && <CookiesBanner />}
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
      {isConsentCookie && environment !== "development" && (
        <>
          {globalContent?.googleTagManager && (
            <GoogleTagManager gtmId={globalContent?.googleTagManager} />
          )}
          {globalContent?.googleAnalytics && (
            <GoogleAnalytics gaId={globalContent?.googleAnalytics} />
          )}
        </>
      )}
    </>
  );
}
