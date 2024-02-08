import { useEffect, useState, useContext } from "react"
import Image from "next/image";
import { ContextApplication } from "@/context";
import { urlFor } from "../../../util/client";

const Header = () => {
  const {globalInfo} = useContext(ContextApplication)
  const [logoCouncil, setLogoCouncil] = useState<any>(undefined)

  useEffect(() => {
    const initialValue = localStorage.getItem("globalInfo")
    if(initialValue !== null) {
      const image = JSON.parse(initialValue)?.logo
      setLogoCouncil(image)
    } else {
      setLogoCouncil(globalInfo?.logo)
    }
  },[globalInfo?.logo])

  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <a href="#" className="govuk-header__link govuk-header__link--homepage">
            <span className="govuk-header__logotype" style={{display: 'flex', alignItems: 'center', width: '22rem', gap:'2px'}}>
              {
                logoCouncil !== undefined ? <Image width={110} height={60} alt="" src={urlFor(logoCouncil)?.url()}/>: ''
              }
              <span className="govuk-header__logotype-text" role="definition">
                Planning applications
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header;