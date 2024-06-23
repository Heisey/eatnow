
import * as React from 'react'
import * as ReactTable from '@tanstack/react-table'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import AddItem from './components/AddItem'
import Table from './components/Table'

export interface MenuProps extends React.PropsWithChildren {

}

const Menu: React.FC<MenuProps> = () => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturantProfile.useGetById(user.data?.resturantId)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)
  const [addItemOpen, toggleAddItemOpen] = Hooks.common.useToggle()

  if (auth.isLoading || user.isLoading || resturant.isLoading || menu.isLoading || menuItems.isLoading) return <div>Loading</div>
  
  const columnConfig = ReactTable.createColumnHelper<Core.I.MenuItemRecord>()

  const categories = Object.values(Core.keys.menuCategories) as [keyof typeof Core.keys.menuCategories]

  const columns = [
    columnConfig.accessor('image', { header: 'image', cell: dataSet => <img src={dataSet.getValue()} className='h-[50px] w-auto max-w-[125px]' alt='image of food' />, size: 50, maxSize: 50, enableResizing: false }),
    columnConfig.accessor('name', { header: 'Name', cell: dataSet => Utils.string.capitalizeAllWords(dataSet.getValue()), }),
    columnConfig.accessor('price', { header: 'Price', cell: dataSet => `$${dataSet.getValue()}`}),
    columnConfig.accessor('id', { header: 'popularity', cell: 'N/A' })
  ]

  if (!menu.data) return <div>Something wrong happened</div>

  return (
    <div className='w-full p-3'>
      <Dialog open={addItemOpen}>
        <h1>Menu</h1>
        <div className='flex justify-end'>
          <Button onClick={toggleAddItemOpen}>Add Menu Item</Button>
        </div>
        
        <Accordion type='single' collapsible defaultValue={categories[0]} className='w-full mt-5'>
          {categories.map(category => (
            <AccordionItem value={category} className='p-3'>
              <AccordionTrigger>{Utils.string.capitalize(category)}</AccordionTrigger>
              <AccordionContent>
              <Table data={menu.data![category]} columns={columns} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* {menu.data && <Table data={menu.data.appetizers} columns={columns} />} */}
        <AddItem categories={categories} closeModal={toggleAddItemOpen} />
      </Dialog> 
    </div>
    
  )
}


export default Menu