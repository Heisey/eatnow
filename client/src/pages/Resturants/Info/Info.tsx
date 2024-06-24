

import * as React from 'react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import ReviewStars from '@/components/custom/ReviewStars'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

export interface InfoProps extends React.PropsWithChildren {


}


const Info: React.FC<InfoProps> = (props) => {

  const params = Hooks.common.useParams()
  const resturant = Hooks.resturantProfile.useGetById(params.id)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)

  const categories = Object.keys(menu.data || {}).filter(dataSet => dataSet !== 'id').filter(dataSet => dataSet !== '__v')

  const goToSection = (e: React.MouseEvent<HTMLButtonElement>) => document.querySelector(`#${e.currentTarget.value}`)?.scrollIntoView({ behavior: 'smooth' })

  const renderMenuItemInfo = (args: Core.I.MenuItemRecord) => {
  const randcomTemp = Math.ceil(Math.random() * 100)
  
    return (
      <li className='mb-2 border-orange-500 border-2 flex group transition-all duration-300 hover:bg-orange-500'>
        <img className='h-[125px]' src={`https://picsum.photos/seed/food${randcomTemp}/800`} />
        <div className='flex p-2 justify-apart w-full'>
          <div className='w-full grow flex flex-col'>
            <div className='grow'>
              <h5 className='text-orange-500 font-bold text-2xl transition-all duration-300 group-hover:text-white'>{args.name}</h5>
              <span className='block text-sm italic  transition-all duration-300 group-hover:text-white'>{args.description}</span>
            </div>
            <span className='block  transition-all duration-300 group-hover:text-white'>ingredients: {args.ingredients}</span>
          </div>
          <div className='w-full max-w-[20%] flex flex-col justify-between items-end text-end'>
            <span className='text-3xl  text-orange-500 font-bold  transition-all duration-300 group-hover:text-white'>${args.price}</span>
            <ReviewStars />
          </div>
        </div>
      </li>
    )
  }

  const renderMenuItems = (args: keyof Core.I.MenuInfo) => {
    const section = menu.data![args]
    if (section?.length === 0) return <div>no items to show</div>
    return (
      <ul>
        {section?.map(dataSet => renderMenuItemInfo(dataSet))}
      </ul>
    )
  }

  return (
    <div>
      <div className='w-[80%] mx-auto flex justify-between items-center'>
        <h3 className='text-orange-500 font-bold mb-10 text-4xl'>{resturant.data?.name}</h3>
        <ReviewStars />
      </div>
      <Carousel className='w-[80%] m-auto'>
        <CarouselContent>
          {categories.map(dataSet => (
            <CarouselItem key={dataSet} className='basis-1/5 ml-4 text-center h-[35px]  shadow-[#000] select-none cursor-arrow border-orange-500 border-2 shadow-sm p-0'>
              <Button variant='ghost' value={dataSet} className={`h-full w-full rounded-none transition-all duration-300 hover:bg-orange-500 hover:text-white`} onClick={goToSection}>
                {dataSet}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ul className='my-10 w-[80%]'>
        {categories.map(dataSet => (
          <li id={dataSet} className='mb-8'>
            <h5 className='text-2xl text-orange-500 font-bold underline mb-2'>{Utils.string.capitalizeAllWords(dataSet)}</h5>
            {renderMenuItems(dataSet as keyof Core.I.MenuInfo)}
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Info