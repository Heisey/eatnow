

import * as React from 'react'
import * as Lucide from 'lucide-react'

import * as Core from '@/core'
import * as Utils from '@/utils'
import { Button } from '@/components/ui/button'

export interface ListItemProps extends React.PropsWithChildren {
  data: Core.I.ResturantRecord

}


const ListItem: React.FC<ListItemProps> = (props) => {

  const randcomTemp = Math.ceil(Math.random() * 100)
  const stars = Math.floor(Math.random() * 5)

  const renderStars = () => {
    let result = []
    for (let i = 0; i < 5; i++) {
      if (i <= stars) result.push(<Lucide.Star className='fill-yellow-500' />)
      else result.push(<Lucide.Star className='stroke-yellow-500' />)
    }
    return result
  }

  return (
    <li className='my-4 max-h-[200px] flex items-center border-orange-500 border-2 pr-4 transition-all duration-300 hover:bg-orange-500 group'>
      <img className='mr-4 h-full max-w-[300px] w-full max-h-[200px]' src={`https://picsum.photos/seed/food${randcomTemp}/800`} />
      <div className='w-full flex h-[160px] jusify-between'>
        <div className='flex-col justify-between flex h-[160px] w-full'>
          <h5 className='text-2xl font-bold text-orange-500 transition-all duration-300 group-hover:text-white'>{props.data.name}</h5>
          <div className='flex items-center transition-all duration-300 group-hover:text-white'>
            {props.data.cuisine.map(dataSet => <span key={`cuisine-${dataSet}`} className='mr-2'>{Utils.object.getKeyByValue(Core.keys.cuisine, dataSet)}</span>)}
          </div>
          <div className='flex'>
            {renderStars()}
          </div>
        </div>

        <div className='mt-9 text-end'>
          <span className='transition-all duration-300 group-hover:text-white'>{props.data.address}</span>
          <span className='transition-all block duration-300 group-hover:text-white'>{props.data.city}, {props.data.country}</span>
        </div>
      </div>
    </li>
  )
}


export default ListItem