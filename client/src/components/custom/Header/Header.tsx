

import * as React from 'react'
import * as Router from 'react-router-dom'

import MobileNav from '@/components/custom/MobileNav'
import Nav from '@/components/custom/Nav'

export interface HeaderProps extends React.PropsWithChildren {


}


const Header: React.FC<HeaderProps> = () => {


 return (
   <div className='border-b-2 border-b-orange-500 py-6'>
    <div className='container mx-auto flex justify-between items-center'>
      <Router.Link to='/' className='text-3xl font-bold tracking-tight text-orange-500'>
        EATNOW
      </Router.Link>
      <div className='md:hidden'>
        <MobileNav />
      </div>
      <div className='hidden md:block'>
        <Nav />
      </div>
    </div>
   </div>
 )
}


export default Header