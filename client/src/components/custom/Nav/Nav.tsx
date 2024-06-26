

import * as React from 'react'
import * as Router from 'react-router-dom'
import * as Lucide from 'lucide-react'

import { Button } from '@/components/ui/button'
import UserMenu from '@/components/custom/UserMenu'
import * as Hooks from '@/hooks'


export interface NavProps extends React.PropsWithChildren {


}


const Nav: React.FC<NavProps> = () => {
  const auth = Hooks.common.useAuth()
  
  const renderSignIn = () => (
    <Button onClick={async () => await auth.loginWithGoogle()} variant='ghost' className='font-bold hover:text-orange-500 hover:bg-white'>
      Login
    </Button>
  )

  const renderUser = () => (
    <span className='flex space-x-2 items-center'>
      <Router.Link to className='relative'>
        <Lucide.ShoppingCart className='text-orange-500' />
        <span className='absolute h-2 w-2 rounded-full bg-yellow-500 bottom-[12px] right-[-3px]'></span>
      </Router.Link>
      <UserMenu />
    </span>
  )

 return (
  <>
    {!auth.user ? renderSignIn() : renderUser()}
    
  </>
 )
}


export default Nav