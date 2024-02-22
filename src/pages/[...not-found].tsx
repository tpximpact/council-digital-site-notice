import Link from "next/link"
import Home from "."


export default function NotFound() {
  
    return (
      <div>
        <h1>The page you are looking for is no longer available</h1>
        <p>You may be able to find the planning application you were looking for bellow</p>
      <Link href="/">Here</Link>
      <Home/>
      </div>
    )
  }