

import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'
import * as Hooks from '@/hooks'


export interface OverviewProps extends React.PropsWithChildren {


}

const Overview: React.FC<OverviewProps> = (props) => {
  
  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturant.useGetById(user.data?.resturantId)
  
  if (user.isLoading || resturant.isLoading) return <div>Loading</div>
  
  return (
    <div>
      {!user.data?.resturantId && <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_DETAILS}>Create Resturant</Router.Link>}

      {user.data?.resturantId && <div>{resturant.data?.name}</div>}
      
      {(user.data?.resturantId && !resturant.data?.menuItemsCreated) && <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_MENU_ITEMS}>Create Menu Items</Router.Link>}
    </div>
  )
}


export default Overview