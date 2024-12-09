import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/actions/sanityClient";

const Header = ({ globalConfig }: any) => {
  return (
    <header className="dsn-header">
      <div className="dsn-header__content">
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
      </div>
    </header>
  );
};

export default Header;
