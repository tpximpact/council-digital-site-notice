import '@/styles/app.scss'
import Layout from './app/layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend")
    govUk.initAll()
  }
  return <Layout>
            <Component {...pageProps} />
          </Layout>
}
