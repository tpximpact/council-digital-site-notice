import PageCenter from "../pageCenter";

function PageWrapper({
  isCentered,
  children,
}: {
  isCentered: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="govuk-main-wrapper" id="main">
      {isCentered ? <PageCenter>{children}</PageCenter> : children}
    </main>
  );
}

export default PageWrapper;
