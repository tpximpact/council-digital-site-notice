import { Metadata } from "next";
import "../styles/app.scss";

export const metadata: Metadata = {
  title: "Digital Site Notice",
};

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
