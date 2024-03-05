import Header from "@/components/header";
import Banner from "../banner";
import CookiesBanner from "@/components/cookies";
import { useEffect, useState } from "react";
import Head from "next/head";
import { urlFor } from "../../../util/client";
import GoogleAnalytics from "../google-analytics";
import { healpLocalStorage } from "../../../util/localStorageHelper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isShowCookie, setIsShowCookie] = useState(true);
  const [isConsentCookie, setIsConsentCookie] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [ga, setGa] = useState("");

  const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
  useEffect(() => {
    const getLocalStorageCookies = healpLocalStorage({
      key: "cookies",
      defaultValue: isShowCookie,
    });
    setIsShowCookie(getLocalStorageCookies);

    const getLocalStorageConsentCookies = healpLocalStorage({
      key: "consentCookies",
      defaultValue: isConsentCookie,
    });
    setIsConsentCookie(getLocalStorageConsentCookies);

    const globalContent = healpLocalStorage({
      key: "globalInfo",
      defaultValue: {},
    });
    const favicon = globalContent?.favicon;
    const googleAnalytics = globalContent?.googleAnalytics;
    setGa(googleAnalytics);

    favicon == null || favicon == undefined
      ? setFavicon("/favicon_default.ico")
      : setFavicon(urlFor(favicon)?.url());
  }, [isConsentCookie, isShowCookie]);

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
      {isConsentCookie && enviroment !== "development" && ga && (
        <GoogleAnalytics gaId={ga} />
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
