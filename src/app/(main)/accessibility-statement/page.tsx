import { getGlobalContent } from "@/app/actions/sanityClient";
import { PageAccessibilityStatement } from "@/components/PageAccessibilityStatement";
import PageWrapper from "@/components/pageWrapper";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Accessibility statement",
};

const AccessibilityStatement = async () => {
  const globalConfig = await getGlobalContent();
  const headersList = await headers();
  const host = headersList.get("host") ?? undefined;

  return (
    <PageWrapper isCentered={true}>
      <PageAccessibilityStatement
        host={host}
        feedbackUrl={globalConfig.feedbackUrl}
      />
    </PageWrapper>
  );
};

export default AccessibilityStatement;
