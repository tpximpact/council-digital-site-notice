
import Header from '@/components/header'
import Banner from '../../components/banner'
import CookiesBanner from '@/components/cookies'
import { useEffect, useState } from 'react'
  
  export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [isShowCookie, setIsShowCookie] = useState(true)
    useEffect(() => {
      const getLocalStorageCookies = localStorage.getItem('cookies')
      if(getLocalStorageCookies !== null) {
        setIsShowCookie(JSON.parse(getLocalStorageCookies))
      }
    }, [])
    return (
      <main>
                {
          isShowCookie && <CookiesBanner onClick={() => {setIsShowCookie(false), localStorage.setItem('cookies', 'false')}}/>
        }
        <Header />
        <Banner />
        <div className='layout-wrap'>
            {children}
        </div>
      </main>
    )
  }
