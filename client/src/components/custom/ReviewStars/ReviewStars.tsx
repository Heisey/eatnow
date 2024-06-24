

import * as React from 'react'
import * as Lucide from 'lucide-react'


export interface ReviewStarsProps extends React.PropsWithChildren {


}


const ReviewStars: React.FC<ReviewStarsProps> = (props) => {

  // const randcomTemp = Math.ceil(Math.random() * 100)
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
    <div className='flex'>
      {renderStars()}
    </div>
  )
}


export default ReviewStars