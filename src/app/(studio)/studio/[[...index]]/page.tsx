// src/app/(studio)/studio/page.tsx
"use client";
import { metadata } from "next-sanity/studio";
import Head from "next/head";

function StudioPage() {
  return (
    <Head>
      {Object.entries(metadata).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Head>
  );
}

StudioPage.displayName = "StudioPage";
export default StudioPage;
