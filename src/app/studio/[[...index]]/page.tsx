"use client";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { metadata } from "next-sanity/studio/metadata";
import config from "../../../../sanity.config";
import SanityLayout from "./layout";
import type { ReactElement } from "react";

function StudioPage() {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head>
      <NextStudio config={config} />
    </>
  );
}

StudioPage.displayName = "StudioPage";

export default StudioPage;
