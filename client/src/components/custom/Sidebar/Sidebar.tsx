

import * as React from 'react'
import * as Router from 'react-router-dom'
import * as Lucide from 'lucide-react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import { Button } from '@/components/ui/button'

export interface SidebarProps extends React.PropsWithChildren {

}


const Sidebar: React.FC<SidebarProps> = () => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)

  return (
    <div className='w-[200px] border-r min-h-screen'>
      <div className='w-fit ml-auto mb-5'>
        <Button className='' variant='ghost'><Lucide.MoveLeft /></Button>
      </div>
      <div className='flex flex-col gap-y-3'>
        <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_OVERVIEW} className='max-w-[150px]'>Overview</Router.Link>
        <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_DETAILS} className='max-w-[150px]'>Info</Router.Link>
        {user.data?.resturantId && <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_MENU_ITEMS} className='max-w-[150px]'>Menu Items</Router.Link>}
        {(user.data?.resturantId && (menuItems.data || []).length > 0) && <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_MENU} className='max-w-[150px]'>Menu</Router.Link>}
      </div>
    </div>
  )
}


export default Sidebar