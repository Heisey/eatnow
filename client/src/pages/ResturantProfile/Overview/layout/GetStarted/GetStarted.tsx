
import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'

export interface GetStartedProps extends React.PropsWithChildren {


}


const GetStarted: React.FC<GetStartedProps> = (props) => {


 return (
   <div className='w-full'>
    <div className='h-[200px] bg-orange-500 flex justify-center items-center font-bold text-4xl tracking-widest text-transform: uppercase text-white'>
      Get Started
    </div>
    <div className='p-3'>
      <p>Once your resturant is set up this is where you will control it</p>
      <Router.Link to={Core.keys.paths.RESTURANT_PROFILE_DETAILS}>Create Resturant</Router.Link>
    </div>
   </div>
 )
}


export default GetStarted