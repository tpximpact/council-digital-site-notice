"use client";

import React, { useEffect, useState } from "react";

export function MSWInitializer({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initMSW() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const { default: initMocks } = await import("../../../mocks");
        await initMocks();
        setIsInitialized(true);
      } else {
        setIsInitialized(true);
      }
    }
    initMSW();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return <>{children}</>;
}
