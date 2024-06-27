

import * as React from 'react'
import * as Router from 'react-router-dom'

export interface OutletProps extends React.PropsWithChildren {


}


const Outlet: React.FC<OutletProps> = (props) => {

  return <Router.Outlet />
}


export default Outlet