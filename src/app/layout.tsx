"use client";
import Header from "@/components/header";
import Banner from "../components/banner";
import CookiesBanner from "@/components/cookies";
import { useEffect, useState } from "react";
import Head from "next/head";
import GoogleAnalytics from "../components/google-analytics";
import { getLocalStorage } from "../../util/localStorageHelper";
import { urlFor } from "../../util/client";
import { getGlobalContent } from "../../util/actions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowCookie, setIsShowCookie] = useState<boolean>(true);
  const [isConsentCookie, setIsConsentCookie] = useState(false);
  const [favicon, setFavicon] = useState("/favicon_default.ico");
  const [googleAnalytics, setGoogleAnalytics] = useState();

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  useEffect(() => {
    const govUk = require("govuk-frontend");
    govUk.initAll();
    async function fetchGlobalContent() {
      const globalConfig = await getGlobalContent();

      const getLocalStorageCookies = getLocalStorage({
        key: "cookies",
        defaultValue: isShowCookie,
      });
      setIsShowCookie(getLocalStorageCookies);

      const getLocalStorageConsentCookies = getLocalStorage({
        key: "consentCookies",
        defaultValue: isConsentCookie,
      });
      setIsConsentCookie(getLocalStorageConsentCookies);

      const defineFavicon =
        globalConfig.favicon == null || globalConfig.favicon == undefined
          ? "/favicon_default.ico"
          : urlFor(globalConfig.favicon)?.url();
      setFavicon(defineFavicon);
      setGoogleAnalytics(globalConfig.googleAnalytics);
    }
    fetchGlobalContent();
  }, [isConsentCookie, isShowCookie]);
  return (
    <html>
      <body>
        {isShowCookie && (
          <CookiesBanner
            onClick={(value: any) => {
              setIsShowCookie(false),
                localStorage.setItem("cookies", "false"),
                setIsConsentCookie(value),
                localStorage.setItem("consentCookies", value);
            }}
          />
        )}
        {isConsentCookie &&
          environment !== "development" &&
          googleAnalytics && <GoogleAnalytics gaId={googleAnalytics} />}
        <Header />
        <Banner />
        <Head>
          <title>Digital site notice</title>
          <link rel="icon" href={favicon} sizes="any" />
        </Head>
        <div className="layout-wrap">{children}</div>
      </body>
    </html>
  );
}
