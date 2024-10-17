"use client";
import "../styles/app.scss";
import { useEffect } from "react";

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
