

import * as React from 'react'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

export interface CuisinesProps extends React.PropsWithChildren {
  categories: string[]

}


const Cuisines: React.FC<CuisinesProps> = (props) => {

  const goToSection = (e: React.MouseEvent<HTMLButtonElement>) => document.querySelector(`#${e.currentTarget.value}`)?.scrollIntoView({ behavior: 'smooth' })


  return (
    <Carousel className='w-[80%] m-auto'>
      <CarouselContent>
        {props.categories.map(dataSet => (
          <CarouselItem key={dataSet} className='basis-1/5 ml-4 text-center h-[35px]  shadow-[#000] select-none cursor-arrow border-orange-500 border-2 shadow-sm p-0'>
            <Button variant='ghost' value={dataSet} className={`h-full w-full rounded-none transition-all duration-300 hover:bg-orange-500 hover:text-white`} onClick={goToSection}>
              {dataSet}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}


export default Cuisines