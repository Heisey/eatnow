

import * as React from 'react'
import * as Router from 'react-router-dom'

import Sidebar from '@/components/custom/Sidebar'

export interface ResturantProfileProps extends React.PropsWithChildren {


}


const ResturantProfile: React.FC<ResturantProfileProps> = (props) => {

  return (
    <div className='flex'>
      <Sidebar />
      <Router.Outlet />
    </div>
  )
}


export default ResturantProfile
// export default ProtectedRoute(ResturantProfile)