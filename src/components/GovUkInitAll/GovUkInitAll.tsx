"use client";
import { initAll } from "govuk-frontend";

import { useState, useEffect } from "react";
import Script from "next/script";

/**
 * Initialises the GovUK components
 * We do it this way as using react methods cause them to load twice, which is actually correct its just that the gov-uk code isn't designed to be used in this way
 * https://govuk-design-system-team-docs.netlify.app/support/communicating-with-users/common-responses/#making-gov-uk-frontend-work-with-javascript-frameworks
 *
 * We can also use this pattern to just enable specific govuk Scripts instead of initAll we can do
 * import { Header, createAll } from "govuk-frontend";
 * createAll(Header);
 * This will become the pattern when we start moving to pattern libraries - or because of the above recreate any govuk interactions in react ourselves.
 * @returns
 */
export const GovUkInitAll = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // NB this will trigger everything twice but the other option will give us a permanent warning about the mismatching classes
  // I'd rather have body class="js-enabled js-enabled" than that

  // <Script id="js-detection" strategy="beforeInteractive">
  //   {`document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');`}
  // </Script>;

  if (isClient && typeof window !== "undefined") {
    // add in govuk-frontend-supported class to body if the browser supports ES6 modules
    document.body.className +=
      " js-enabled" +
      ("noModule" in HTMLScriptElement.prototype
        ? " govuk-frontend-supported"
        : "");

    // initialise all the govuk components
    // tbh might not need this unless we're using any of these components https://frontend.design-system.service.gov.uk/javascript-api-reference/
    initAll();
  }

  return null;
};
