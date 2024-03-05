import Header from "@/components/header";
import Banner from "../banner";
import CookiesBanner from "@/components/cookies";
import { useEffect, useState } from "react";
import Head from "next/head";
import { urlFor } from "../../../util/client";
import GoogleAnalytics from "../google-analytics";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isShowCookie, setIsShowCookie] = useState(true);
  const [isConsentCookie, setIsConsentCookie] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [ga, setGa] = useState("");

  const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
  useEffect(() => {
    const getLocalStorageCookies = localStorage.getItem("cookies");
    const getLocalStorageConsentCookies =
      localStorage.getItem("consentCookies") || "false";
    const consentCookies = JSON.parse(getLocalStorageConsentCookies);
    const globalContent = localStorage.getItem("globalInfo") || "{}";
    const { favicon, googleAnalytics } = JSON.parse(globalContent);
    favicon == null || favicon == undefined
      ? setFavicon("/favicon_default.ico")
      : setFavicon(urlFor(favicon)?.url());

    googleAnalytics == null || googleAnalytics == undefined
      ? setGa("")
      : setGa(googleAnalytics);
    if (getLocalStorageCookies !== null) {
      setIsShowCookie(JSON.parse(getLocalStorageCookies));
    }
    consentCookies == null || consentCookies == undefined
      ? setIsConsentCookie(false)
      : setIsConsentCookie(consentCookies);
  }, []);
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
      {isConsentCookie && enviroment !== "development" && (
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
