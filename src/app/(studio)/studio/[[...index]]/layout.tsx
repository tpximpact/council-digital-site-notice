// src/app/(studio)/layout.tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <NextStudio config={config} />
        {children}
      </body>
    </html>
  );
}
