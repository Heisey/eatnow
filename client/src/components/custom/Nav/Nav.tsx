

import * as React from 'react'

import { Button } from '@/components/ui/button'
import UserMenu from '@/components/custom/UserMenu'
import * as Hooks from '@/hooks'


export interface NavProps extends React.PropsWithChildren {


}


const Nav: React.FC<NavProps> = () => {
  const auth = Hooks.common.useAuth()

  const onRedirect = async () => auth.loginWithRedirect()

  const renderSignIn = () => (
    <Button onClick={onRedirect} variant='ghost' className='font-bold hover:text-orange-500 hover:bg-white'>
      Login
    </Button>
  )

  const renderUser = () => (
    <span className='flex space-x-2 items-center'>
      <UserMenu />
    </span>
  )

 return (
  <>
    {!auth.isAuthenticated ? renderSignIn() : renderUser()}
    
  </>
 )
}


export default Nav