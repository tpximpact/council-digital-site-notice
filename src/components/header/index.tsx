import Link from "next/link";
import { urlFor } from "@/app/actions/sanityClient";

const Header = ({ globalConfig }: any) => {
  return (
    <header
      className={`dsn-header ${
        globalConfig?.logo ? "dsn-header--has-logo" : ""
      }`}
    >
      <div className="dsn-header__content">
        {globalConfig?.councilName && (
          <div className="dsn-header__logo">
            <Link
              href="/"
              className={`dsn-header__logo-link`}
              style={{
                backgroundImage: globalConfig?.logo
                  ? `url(${urlFor(globalConfig?.logo)
                      ?.width(100)
                      .height(35)
                      .fit("max")
                      .url()})`
                  : "none",
              }}
            >
              {globalConfig?.logo ? (
                <div className="govuk-visually-hidden">
                  {globalConfig?.councilName} Council
                </div>
              ) : (
                <>{globalConfig?.councilName} Council</>
              )}
            </Link>
          </div>
        )}
        <div className="dsn-header__title">Planning applications</div>
      </div>
    </header>
  );
};

export default Header;
