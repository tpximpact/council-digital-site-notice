import Link from "next/link"
import Home from "."


export default function NotFound() {
  
    return (
      <div className="error-container">
        <h1 className="govuk-heading-l">The page you are looking for is no longer available</h1>
        <p className="govuk-body">You may be able to find the planning application you were looking for bellow</p>
      <Link href="/">Here</Link>
      </div>
    )
  }