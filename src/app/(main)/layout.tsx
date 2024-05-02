import Header from "@/components/header";
import Banner from "@/components/banner";
import CookiesBanner from "@/components/cookies";
import GoogleAnalytics from "@/components/google-analytics";
import { urlFor } from "../actions/sanityClient";
import { getGlobalContent } from "../actions/sanityClient";
import "../../styles/app.scss";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const globalContent = await getGlobalContent();
const siteLogo = (await urlFor(globalContent?.logo))?.url();

export async function generateMetadata(): Promise<Metadata> {
  const resMetadata = globalContent?.favicon;
  return {
    title: "Digital site notice",
    icons: {
      icon: resMetadata
        ? (await urlFor(resMetadata))?.url()
        : "/favicon_default.ico",
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
        <Header globalConfig={globalContent} siteLogo={siteLogo} />
        <Banner globalConfig={globalContent} />
        <div className="layout-wrap">{children}</div>
      </body>
    </html>
  );
}
