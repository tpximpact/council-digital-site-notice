import { getApplicationById } from "@/app/actions/sanityClient";
import { ReactNode } from "react";
import { HomeProps } from "./page";
import { PlanningApplication } from "../../../../../sanity/sanity.types";

/**
 * genertes default title for every page undeer this
 * @param param0
 * @returns
 */
export async function generateMetadata({ params }: HomeProps) {
  const { id } = params;

  const application = (await getApplicationById(
    id,
  )) as PlanningApplication | null;
  let firstHeading = "Planning application not found";
  let secondHeading = "Planning application not found";
  if (application) {
    firstHeading =
      application.name || application.address || "Planning application";
    secondHeading =
      application.name && application.address
        ? application.address
        : "Planning application";
  }
  return {
    title: {
      template: `%s | ${firstHeading} | Digital Site Notice`,
      default: firstHeading,
    },
    description: secondHeading,
  };
}

export default function ReferenceLayout({
  params,
  children,
}: {
  params: { council: string };
  children: ReactNode;
}) {
  return <>{children}</>;
}
