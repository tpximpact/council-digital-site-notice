import Header from "@/components/header";
import Banner from "../../components/banner";
import CookiesBanner from "@/components/cookies";
import { useEffect, useState } from "react";
import Head from "next/head";
import { urlFor } from "../../../util/client";
import Script from "next/script";
import { loadGoogleAnalytics } from "../../../util/google-analytics";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isShowCookie, setIsShowCookie] = useState(true);
  const [consentCookie, setConsentCookie] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [ga, setGa] = useState("");
  useEffect(() => {
    const getLocalStorageCookies = localStorage.getItem("cookies");
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
  }, []);
  return (
    <main>
      {isShowCookie && (
        <CookiesBanner
          onClick={(value: any) => {
            setIsShowCookie(false),
              localStorage.setItem("cookies", "false"),
              setConsentCookie(value),
              localStorage.setItem("consentCookies", value);
          }}
        />
      )}
      <Header />
      <Banner />
      <Head>
        <title>Digital site notice</title>
        <link rel="icon" href={favicon} sizes="any" />
      </Head>
      <div className="layout-wrap">{children}</div>
      {/* {consentCookie && ( */}
      <Script
        src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
        onLoad={() => loadGoogleAnalytics(null)}
        />
      {/* )} */}
    </main>
  );
}
