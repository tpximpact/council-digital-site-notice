"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { Suspense, useEffect, useState } from "react";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showStudio, setShowStudio] = useState(false);

  useEffect(() => {
    setShowStudio(true);
  }, []);

  return (
    <>
      {showStudio && <NextStudio config={config} />}
      <Suspense>{children}</Suspense>
    </>
  );
}
