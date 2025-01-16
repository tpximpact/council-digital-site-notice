import Link from "next/link";

type Breadcrumb = {
  name?: string;
  href: string;
};

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav className="govuk-breadcrumbs" aria-label="Breadcrumb">
      <ol className="govuk-breadcrumbs__list">
        {breadcrumbs.map((breadcrumb, i) => (
          <li key={i} className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href={breadcrumb.href}>
              {breadcrumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
