import { ReactNode } from "react";

/**
 * genertes default title for every page undeer this
 * @param param0
 * @returns
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Comment submitted`,
    description: "Comment submitted",
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
