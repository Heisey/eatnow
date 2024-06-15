
import * as Lucide from 'lucide-react'
import * as React from 'react'
import * as Router from 'react-router-dom'
import Cookie from 'js-cookie'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export interface UserMenuProps extends React.PropsWithChildren {


}


const UserMenu: React.FC<UserMenuProps> = () => {

  const auth = Hooks.common.useAuth()

  const logout = () => {
    auth.logOut()
    Cookie.remove('etnw_auth')
  }

 return (
  <DropdownMenu>
    <DropdownMenuTrigger className='flex items-center px-3 font-bold hover:text-orange-500 gap-2'>
      <Lucide.CircleUserRound className='text-orange-500' />
      <span>{auth.user?.email}</span>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent>
      <DropdownMenuItem>
        <Router.Link to={Core.keys.paths.USER_PROFILE} className='font-bold hover:text-orange-500'>
          User Profile
        </Router.Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_OVERVIEW} className='font-bold hover:text-orange-500'>
          Resturant Profile
        </Router.Link>
      </DropdownMenuItem>

      <Separator />

      <DropdownMenuItem>
        <Button onClick={logout} className='flex flex-1 font-bold bg-orange-500'>
          Logout
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
 )
}


export default UserMenu