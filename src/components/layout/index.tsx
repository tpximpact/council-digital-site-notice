import Header from "@/components/header";
import Banner from "../banner";
import CookiesBanner from "@/components/cookies";
import { useEffect, useState } from "react";
import Head from "next/head";
import GoogleAnalytics from "../google-analytics";
import { getLocalStorage } from "../../../util/localStorageHelper";
import { urlFor, getGlobalContent } from "../../../util/client";
import { useContext } from "react";
import { ContextApplication } from "@/context";

const globalConfig = await getGlobalContent();

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setGlobalConfig } = useContext(ContextApplication);
  const [isShowCookie, setIsShowCookie] = useState<boolean>(true);
  const [isConsentCookie, setIsConsentCookie] = useState(false);

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const favicon =
    globalConfig.favicon == null || globalConfig.favicon == undefined
      ? "/favicon_default.ico"
      : urlFor(globalConfig.favicon)?.url();

  useEffect(() => {
    const getLocalStorageCookies = getLocalStorage({
      key: "cookies",
      defaultValue: isShowCookie,
    });
    setIsShowCookie(getLocalStorageCookies);

    setGlobalConfig(globalConfig);

    const getLocalStorageConsentCookies = getLocalStorage({
      key: "consentCookies",
      defaultValue: isConsentCookie,
    });
    setIsConsentCookie(getLocalStorageConsentCookies);
  }, [isConsentCookie, isShowCookie, setGlobalConfig]);

  return (
    <main>
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
        globalConfig?.googleAnalytics && (
          <GoogleAnalytics gaId={globalConfig?.googleAnalytics} />
        )}
      <Header />
      <Banner />
      <Head>
        <title>Digital site notice</title>
        <link rel="icon" href={favicon} sizes="any" />
      </Head>
      <div className="layout-wrap">{children}</div>
    </main>
  );
}
