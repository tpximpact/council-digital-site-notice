import Script from "next/script";

const GoogleAnalytics = ({ gaId }: any) => {
  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                });
                `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${gaId}`}
        id="google-tag-manager"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleAnalytics;
