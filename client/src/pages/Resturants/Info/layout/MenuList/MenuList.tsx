

import * as React from 'react'

import * as App from '@/App'
import * as Core from '@/core'
import * as Utils from '@/utils'
import ReviewStars from '@/components/custom/ReviewStars'
import { Button } from '@/components/ui/button'

export interface MenuListProps extends React.PropsWithChildren {
  menu: Core.I.MenuRecord
  categories: string[]
}


const MenuList: React.FC<MenuListProps> = (props) => {

  const appCtx = App.Ctx.useContext()

  const addToCart = (args: Core.I.MenuItemRecord) => {
    const record = appCtx.cart.find(dataSet => dataSet.id === args.id)
    if (!record) return appCtx.updateCart([ ...appCtx.cart, { ...args, quantity: 1 } ])
    appCtx.updateCart([ ...appCtx.cart.filter(dataSet => dataSet.id !== args.id), { ...record, quantity: record.quantity + 1 } ])
    
  }

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
              <span className='block  transition-all duration-300 group-hover:text-white'>ingredients: {args.ingredients}</span>
            </div>
            
            <ReviewStars />
          </div>
          <div className='w-full max-w-[20%] flex flex-col justify-between items-end text-end'>
            <span className='text-3xl  text-orange-500 font-bold  transition-all duration-300 group-hover:text-white'>${args.price}</span>
            
            <Button onClick={() => addToCart(args)} variant='ghost' className='transition-all duration-300 text-lg group-hover:text-white hover:bg-transparent hover:text-2xl'>Add</Button>
          </div>
        </div>
      </li>
    )
  }

  const renderMenuItems = (args: keyof Core.I.MenuInfo) => {
    const section = props.menu[args]
    if (section?.length === 0) return <div>no items to show</div>
    return (
      <ul>
        {section?.map(dataSet => renderMenuItemInfo(dataSet))}
      </ul>
    )
  }

  return (
    <ul className='mt-[50px] w-[80%]'>
      {props.categories.map(dataSet => (
        <li id={dataSet} className='mb-8'>
          <h5 className='text-[25px] text-orange-500 font-bold underline mb-2'>{Utils.string.capitalizeAllWords(dataSet)}</h5>
          {renderMenuItems(dataSet as keyof Core.I.MenuInfo)}
        </li>
      ))}
    </ul>
  )
}


export default MenuList