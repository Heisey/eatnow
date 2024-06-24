

import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import Sidebar from '@/components/custom/Sidebar'

export interface ResturantProfileProps extends React.PropsWithChildren {


}


const ResturantProfile: React.FC<ResturantProfileProps> = () => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)

  return (
    <div className='flex'>
      <Sidebar>

      <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_OVERVIEW} className='max-w-[150px]'>Overview</Router.Link>
        <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_DETAILS} className='max-w-[150px]'>Info</Router.Link>
        {user.data?.resturantId && <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_MENU_ITEMS} className='max-w-[150px]'>Menu Items</Router.Link>}
        {(user.data?.resturantId && (menuItems.data || []).length > 0) && <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_MENU} className='max-w-[150px]'>Menu</Router.Link>}
      </Sidebar>
      <Router.Outlet />
    </div>
  )
}


export default ResturantProfile
// export default ProtectedRoute(ResturantProfile)