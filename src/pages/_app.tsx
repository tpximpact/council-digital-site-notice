import "@/styles/app.scss";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import Context from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }
  let displayComponent;

  if (Component.displayName === "StudioPage") {
    displayComponent = <Component {...pageProps} />;
  } else {
    displayComponent = (
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    );
  }

  return displayComponent;
}
