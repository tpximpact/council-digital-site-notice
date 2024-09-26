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

  useEffect(() => {
    async function initMSW() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const { default: initMocks } = await import("../../mocks");
        await initMocks();
      }
    }
    initMSW();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
