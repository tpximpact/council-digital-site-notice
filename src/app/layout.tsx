import "../styles/app.scss";
import type { Metadata } from "next";
import { getGlobalContent, urlFor } from "./actions/sanityClient";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
