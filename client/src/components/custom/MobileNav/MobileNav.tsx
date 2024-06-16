
import * as React from 'react'
import * as Router from 'react-router-dom'
import * as Lucide from 'lucide-react'

import * as Hooks from '@/hooks'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export interface MobileNavProps extends React.PropsWithChildren {


}


const MobileNav: React.FC<MobileNavProps> = () => {
  const auth = Hooks.common.useAuth()

  const onSignin = async () => auth.loginWithGoogle()

  const renderWelcome = () => <span>Welcome to EatNow</span>

  const renderUser = () => (
    <span className='flex items-center font-bold gap-2'>
      <Lucide.CircleUserRound className='text-orange-500' />
      {auth.user?.email}
    </span>
  )

 return (
  <Sheet>
    <SheetTrigger>
      <Lucide.Menu className='text-orange-500' />
    </SheetTrigger>
    <SheetContent className='space-y-3 flex flex-col'>
      <SheetTitle>
        {auth.user ? renderUser() : renderWelcome()}
      </SheetTitle>
      <Separator />
      <SheetDescription className='flex flex-col flex-1 gap-4'>
        <Router.Link to='/user-profile' className='flex bg-white items-center font-bold hover:text-orange-500'>User Profile</Router.Link>
        {auth.user && <Button onClick={() => auth.logOut()} className='flex items-center px-3 font-bold hover:bg-gray-500 mt-auto'>Logout</Button>}
        {!auth.user && <Button onClick={onSignin} className='font-bold bg-orange-500 mt-auto'>Log In</Button>}
      </SheetDescription>
    </SheetContent>
  </Sheet>
 )
}


export default MobileNav