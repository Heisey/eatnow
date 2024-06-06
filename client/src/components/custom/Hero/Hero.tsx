

import * as React from 'react'

import * as Images from '@/assets/images'

export interface HeroProps extends React.PropsWithChildren {


}


const Hero: React.FC<HeroProps> = () => {


  return (
    <div>
      <img src={Images.hero} className='w-full max-h-[600px] object-cover' />
    </div>
  )
}


export default Hero