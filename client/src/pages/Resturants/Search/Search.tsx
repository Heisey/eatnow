

import * as React from 'react'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'
import ResturantSearch from '@/components/custom/ResturantSearch'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import ListItem from './components/ListItem'
import { Button } from '@/components/ui/button'

export interface SearchProps extends React.PropsWithChildren {


}


const Search: React.FC<SearchProps> = (props) => {
  const appCtx = App.Ctx.useContext()
  const [selectedCuisines, selectedCusisnesHandler] = React.useState<number[]>([])
  const resturants = Hooks.resturant.useSearchByCity({ city: appCtx.resturantCitySearchValue, params: { limit: 50, cuisines: selectedCuisines } })
  const cuisines = Object.keys(Core.keys.cuisine)

  const renderList = () => (
    <ul>
      {resturants.data?.records?.map(dataSet => <ListItem data={dataSet} />)}
    </ul>
  )

  const onCuisineSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = Core.keys.cuisine[e.currentTarget.value as keyof typeof Core.keys.cuisine]
    const index = selectedCuisines.findIndex(dataSet => dataSet === key)
    if (index !== -1) selectedCusisnesHandler(selectedCuisines.filter(dataSet => dataSet !== key))
    else selectedCusisnesHandler([ ...selectedCuisines, key ])
  }

  const isCuisineSelected = (args: keyof typeof Core.keys.cuisine) => selectedCuisines.includes(Core.keys.cuisine[args]) ? 'bg-orange-500 text-white': 'bg-white text-orange-500'

  return (
    <div>
      <ResturantSearch />
      <Carousel className='py-8'>
        <CarouselContent>
          {cuisines.map(dataSet => (
            <CarouselItem key={dataSet}  className={`basis-1/5 ml-4 text-center h-[75px]  shadow-[#000] select-none cursor-arrow border-orange-500 border-2 shadow-sm p-0`}>
              <Button  variant='ghost' value={dataSet} className={`h-full w-full rounded-none ${isCuisineSelected(dataSet as keyof typeof Core.keys.cuisine)} transition-all duration-300 hover:bg-orange-500 hover:text-white`} onClick={onCuisineSelect}>
                {dataSet}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {appCtx.resturantCitySearchValue.length === 0 && <div>enter a city in the search</div>}
      {appCtx.resturantCitySearchValue.length > 0 && resturants.data?.records?.length === 0 ? <div>no results</div> : renderList()} 
    </div>
  )
}


export default Search