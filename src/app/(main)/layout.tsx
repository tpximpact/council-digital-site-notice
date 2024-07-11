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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const cookieStore = cookies();
  const isShowCookie = cookieStore.get("isShowCookie")?.value || true;
  const isConsentCookie = cookieStore.get("isConsentCookie")?.value || false;

  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }

  return (
    <html lang="en">
      <body>
        {isShowCookie == true && <CookiesBanner />}
        {isConsentCookie &&
          environment !== "development" &&
          globalContent?.googleAnalytics && (
            <GoogleAnalytics gaId={globalContent?.googleAnalytics} />
          )}
        <a
          href="#main"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
        <Header globalConfig={globalContent} />
        <Banner globalConfig={globalContent} />
        <main className="layout-wrap" id="main">
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
