import { getApplicationById } from "@/app/actions/sanityClient";
import { ReactNode } from "react";

/**
 * genertes default title for every page undeer this
 * @param param0
 * @returns
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const result = await getApplicationById(id);
  const firstHeading = result.name || result.address;
  const secondHeading =
    result.name && result.address ? result.address : undefined;
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
