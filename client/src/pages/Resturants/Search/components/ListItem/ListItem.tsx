

import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'
import * as Utils from '@/utils'
import ReviewStars from '@/components/custom/ReviewStars'

export interface ListItemProps extends React.PropsWithChildren {
  data: Core.I.ResturantRecord

}


const ListItem: React.FC<ListItemProps> = (props) => {

  const randcomTemp = Math.ceil(Math.random() * 100)
  
  return (
    <li className='my-4  border-orange-500 border-2 pr-4 transition-all duration-300 hover:bg-orange-500 group'>
      <Router.Link className='max-h-[200px] flex items-center' to={Core.keys.paths.RESTURANTS_INFO.replace(':id', props.data.id)}>
        <img className='mr-4 h-full max-w-[300px] w-full max-h-[200px]' src={`https://picsum.photos/seed/food${randcomTemp}/800`} />
        <div className='w-full flex h-[160px] jusify-between'>
          <div className='flex-col justify-between flex h-[160px] w-full'>
            <h5 className='text-2xl font-bold text-orange-500 transition-all duration-300 group-hover:text-white'>{props.data.name}</h5>
            <div className='flex items-center transition-all duration-300 group-hover:text-white'>
              {props.data.cuisine.map(dataSet => <span key={`cuisine-${dataSet}`} className='mr-2'>{Utils.object.getKeyByValue(Core.keys.cuisine, dataSet)}</span>)}
            </div>
            <ReviewStars />
          </div>

          <div className='mt-9 text-end'>
            <span className='transition-all duration-300 group-hover:text-white'>{props.data.address}</span>
            <span className='transition-all block duration-300 group-hover:text-white'>{props.data.city}, {props.data.country}</span>
          </div>
        </div>
      </Router.Link>
    </li>
  )
}


export default ListItem