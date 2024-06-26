

import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'
import ReviewStars from '@/components/custom/ReviewStars'

export interface HeaderProps extends React.PropsWithChildren {
  resturant: Core.I.ResturantRecord

}


const Header: React.FC<HeaderProps> = (props) => {


  return (
    <div className='relative w-[80%] mx-auto mb-10 flex justify-between items-center'>
      <Router.Link to={Core.keys.paths.RESTURANTS} className='absolute left-[-5rem] top-[50%] translate-y-[-50%]'>back</Router.Link>
      <h3 className='text-orange-500 font-bold text-4xl'>{props.resturant.name}</h3>
      <ReviewStars className='' />
    </div>
  )
}


export default Header