import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/actions/sanityClient";

const Header = ({ globalConfig }: any, logo: any) => {
  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <span
              className="govuk-header__logotype"
              style={{ display: "flex", alignItems: "center", gap: "2px" }}
            >
              {logo !== undefined ? (
                <Image width={100} height={35} alt="" src={logo} />
              ) : (
                ""
              )}
              <span className="govuk-header__logotype-text" role="definition">
                Planning applications
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
