import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/actions/sanityClient";

const Header = async ({ globalConfig }: any) => {
  return (
    <header className="dsn-header">
      {globalConfig?.logo && (
        <div className="dsn-header__logo">
          <Link href="/">
            <Image
              width={100}
              height={35}
              alt=""
              src={urlFor(globalConfig?.logo)?.url()}
            />
          </Link>
        </div>
      )}
      <div className="dsn-header__title">Planning applications</div>
    </header>
    // <header className="govuk-header" data-module="govuk-header">
    //   <div className="govuk-header__container govuk-width-container">
    //     <div className="govuk-header__logo">
    //       <Link
    //         href="/"
    //         style={{
    //           color: "white",
    //           textDecoration: "none",
    //           fontWeight: "bold",
    //         }}
    //       >
    //         <span
    //           className="govuk-header__logotype"
    //           style={{ display: "flex", alignItems: "center", gap: "2px" }}
    //         >
    //           {globalConfig?.logo !== undefined ? (
    //             <Image
    //               width={100}
    //               height={35}
    //               alt=""
    //               src={urlFor(globalConfig?.logo)?.url()}
    //             />
    //           ) : (
    //             ""
    //           )}
    //           <span className="govuk-header__logotype-text" role="definition">
    //             Planning applications
    //           </span>
    //         </span>
    //       </Link>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
