
import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'
import * as Hooks from '@/hooks'

export interface OutletProps extends React.PropsWithChildren {


}


const Outlet: React.FC<OutletProps> = (props) => {

  const nav = Hooks.common.useNavigate()
  const location = Hooks.common.useLocation()

  // React.useEffect(() => {
  //   if (location.pathname === Core.keys.paths.RESTURANTS) nav(Core.keys.paths.RESTURANTS_SEARCH)
  // })

 return (
   <div>
    <Router.Outlet />
   </div>
 )
}


export default Outlet