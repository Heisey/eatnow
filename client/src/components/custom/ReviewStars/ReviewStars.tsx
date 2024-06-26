

import * as React from 'react'
import * as Lucide from 'lucide-react'

import * as Lib from '@/lib/utils'

export interface ReviewStarsProps extends React.PropsWithChildren {
  className?: string

}


const ReviewStars: React.FC<ReviewStarsProps> = (props) => {

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
    <div className={Lib.cn('flex', props.className)}>
      {renderStars()}
    </div>
  )
}


export default ReviewStars