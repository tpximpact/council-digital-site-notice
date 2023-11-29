import '@/styles/app.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend")
    govUk.initAll()
  }
  return <Component {...pageProps} />
}
