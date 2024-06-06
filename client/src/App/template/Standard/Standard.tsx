
import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Hooks from '@/hooks'
import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import Hero from '@/components/custom/Hero'

export interface StandardProps extends React.PropsWithChildren {

}

const Standard: React.FC<StandardProps> = () => {
  const location = Hooks.common.useLocation()

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {location.pathname === '/' && <Hero />}
      <div className='container mx-auto flex-1 py-10'>
        <Router.Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Standard