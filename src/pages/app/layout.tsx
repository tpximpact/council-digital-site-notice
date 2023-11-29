
import Header from '@/components/header'
import Banner from '../../components/banner'
  
  export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main>
        <Header />
        <Banner />
        <div className='layout-wrap'>
            {children}
        </div>
      </main>
    )
  }
